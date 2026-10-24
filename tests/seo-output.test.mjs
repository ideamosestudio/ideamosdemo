import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const out = new URL("../out/", import.meta.url);

const pagePaths = [
  ["index.html", "https://ideamos.com.ar/"],
  ["diseno-web-autoadministrable/index.html", "https://ideamos.com.ar/diseno-web-autoadministrable/"],
  ["tiendas-online/index.html", "https://ideamos.com.ar/tiendas-online/"],
  ["marketing-digital/index.html", "https://ideamos.com.ar/marketing-digital/"],
  ["posicionamiento-web/index.html", "https://ideamos.com.ar/posicionamiento-web/"],
  ["casos-de-exito/index.html", "https://ideamos.com.ar/casos-de-exito/"],
  ["testimonios/index.html", "https://ideamos.com.ar/testimonios/"],
  ["portfolio/index.html", "https://ideamos.com.ar/portfolio/"],
  ["contacto/index.html", "https://ideamos.com.ar/contacto/"],
];

test("cada página pública tiene título, descripción y canonical", async () => {
  for (const [file, canonical] of pagePaths) {
    const html = await readFile(new URL(file, out), "utf8");
    assert.match(html, /<title>[^<]{20,60}<\/title>/i, file);
    assert.match(html, /<meta name="description" content="[^"]{80,170}"/i, file);
    assert.ok(html.includes(`<link rel="canonical" href="${canonical}"`), file);
  }
});

test("la portada acredita a Ideamos y expone datos estructurados", async () => {
  const html = await readFile(new URL("index.html", out), "utf8");
  assert.match(html, /name="author" content="Ideamos"/i);
  assert.match(html, /name="developed-by" content="Ideamos — https:\/\/ideamos\.com\.ar"/i);
  assert.match(html, /application\/ld\+json/i);
  assert.match(html, /https:\/\/schema\.org/i);
  assert.match(html, /rel="describedby" href="\/llms\.txt"/i);
  assert.match(html, /https:\/\/www\.linkedin\.com\/company\/64755212/);
  assert.match(html, /https:\/\/www\.facebook\.com\/ideamos\.com\.ar/);
});

test("sitemap profesional: solo páginas públicas y prioridades válidas", async () => {
  const xml = await readFile(new URL("sitemap.xml", out), "utf8");
  for (const [, canonical] of pagePaths) assert.ok(xml.includes(`<loc>${canonical}</loc>`), canonical);
  assert.doesNotMatch(xml, /\/test2?\//i);
  assert.match(xml, /<priority>1<\/priority>/);
  assert.match(xml, /<priority>0\.95<\/priority>/);
  assert.equal((xml.match(/<url>/g) ?? []).length, pagePaths.length);
});

test("las guías comerciales son HTML indexable y enlazan recursos reales", async () => {
  const titles = new Set();
  for (const [file] of pagePaths.slice(0, 5)) {
    const html = await readFile(new URL(file, out), "utf8");
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title && !titles.has(title), `Título único: ${file}`);
    titles.add(title);
    assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, file);
    assert.match(html, /aria-label="(?:Servicios y recursos relacionados|Explorar servicios de Ideamos)"/, file);
    if (file !== "index.html") {
      assert.equal((html.match(/<details\b/g) ?? []).length, 4, file);
      assert.equal((html.match(/<details\b[^>]*\bopen=""/g) ?? []).length, 1, file);
      assert.equal((html.match(/name="faq-(?:web|shop|seo|marketing)"/g) ?? []).length, 4, file);
      const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
      const faq = schemas.find((schema) => schema["@type"] === "FAQPage");
      assert.equal(faq?.mainEntity.length, 4, file);
      for (const question of faq.mainEntity) {
        assert.ok(html.includes(`<span class="service-faq__question">${question.name}</span>`), file);
        assert.ok(html.includes(`<p>${question.acceptedAnswer.text}</p>`), file);
      }
      assert.match(html, /href="[^"]*\/casos-de-exito\/"/, file);
      assert.match(html, /href="[^"]*\/testimonios\/"/, file);
      assert.match(html, /href="[^"]*\/contacto\/"/, file);
    }
  }
});

test("el directorio de servicios conserva enlaces y contenido en HTML sin scripts adicionales", async () => {
  const html = await readFile(new URL("index.html", out), "utf8");
  const section = html.match(/<section class="service-guide service-directory"[\s\S]*?<\/section>/)?.[0];
  assert.ok(section);
  assert.equal((section.match(/class="service-directory__item"/g) ?? []).length, 4);
  for (const path of ["diseno-web-autoadministrable", "tiendas-online", "posicionamiento-web", "marketing-digital", "casos-de-exito"]) {
    assert.ok(section.includes(`/${path}/`), path);
  }
  assert.doesNotMatch(section, /<script|<img|<video/);
});

test("las FAQ compactas mantienen contenido temático y contacto contextual", async () => {
  const topics = {
    "diseno-web-autoadministrable/index.html": /diseño web para empresas/,
    "tiendas-online/index.html": /tiendas online/,
    "marketing-digital/index.html": /marketing digital/,
    "posicionamiento-web/index.html": /posicionamiento web/,
  };
  const headings = new Set();
  for (const [file, topic] of Object.entries(topics)) {
    const html = await readFile(new URL(file, out), "utf8");
    const section = html.match(/<section class="service-guide service-faq"[\s\S]*?<\/section>/)?.[0];
    assert.ok(section, file);
    const heading = section.match(/<h2[^>]*>([^<]+)<\/h2>/)?.[1];
    const intro = section.match(/<p class="service-faq__description">([^<]+)<\/p>/)?.[1];
    assert.ok(heading && heading.length <= 40 && !headings.has(heading), file);
    headings.add(heading);
    assert.ok(intro && intro.length <= 160, file);
    assert.match(intro, topic, file);
    assert.doesNotMatch(section, /service-faq__number|aria-hidden="true">[^<]*\?/, file);
    assert.match(section, /¿Tenés otra pregunta\?/, file);
    assert.match(section, /class="service-faq__contact"[^>]*>Hablemos /, file);
    assert.equal((section.match(/<script\b/g) ?? []).length, 1, file);
    assert.match(section, /<script type="application\/ld\+json">/, file);
  }
});

test("el sitemap enlaza archivos publicados y usa fechas de contenido", async () => {
  const xml = await readFile(new URL("sitemap.xml", out), "utf8");
  for (const [, url] of xml.matchAll(/<loc>(.*?)<\/loc>/g)) {
    const path = new URL(url).pathname.replace(/^\//, "");
    await access(new URL(`${path}index.html`, out));
  }
  assert.equal((xml.match(/<lastmod>/g) ?? []).length, 5);
  assert.doesNotMatch(xml, /2026-10-01|portfoliotest/);
});

test("robots y archivos para agentes están publicados", async () => {
  const robots = await readFile(new URL("robots.txt", out), "utf8");
  const llms = await readFile(new URL("llms.txt", out), "utf8");
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/ideamos\.com\.ar\/sitemap\.xml/);
  assert.match(robots, /OAI-SearchBot/);
  assert.match(robots, /ClaudeBot/);
  assert.match(robots, /PerplexityBot/);
  assert.match(llms, /^# Ideamos/m);
  assert.match(llms, /https:\/\/ideamos\.com\.ar\/llms-full\.txt/);
  assert.match(llms, /https:\/\/www\.linkedin\.com\/company\/64755212/);
  assert.match(llms, /https:\/\/www\.facebook\.com\/ideamos\.com\.ar/);
  await access(new URL("security.txt", out));
  await access(new URL(".well-known/security.txt", out));
  await access(new URL(".nojekyll", out));
  const deployWorkflow = await readFile(
    new URL("../.github/workflows/deploy-pages.yml", import.meta.url),
    "utf8",
  );
  assert.match(deployWorkflow, /include-hidden-files:\s*true/);
  await access(new URL("public/googlecac1ad33023af32c.html", root));
});

test("la portada conserva las optimizaciones críticas de rendimiento", async () => {
  const html = await readFile(new URL("index.html", out), "utf8");
  const stylesheets = html.match(/<link rel="stylesheet"/g) ?? [];

  assert.ok(!html.includes("fonts.googleapis.com"));
  assert.ok(!html.includes('<script src="https://www.googletagmanager.com/gtag'));
  for (const prefix of ["", "shop-", "frosz-"]) {
    for (const number of [1, 2, 3]) {
      assert.ok(!html.includes(`/media/${prefix}screen-${number}.png`));
    }
  }
  assert.ok(html.includes("/media/screen-1.webp"));
  assert.ok(html.includes('rel="preload" href="/fonts/Gilroy-ExtraBold.woff2"'));
  assert.ok(html.includes('rel="preload" href="/media/hero-poster.webp"'));
  assert.ok(html.includes('poster="/media/hero-poster.webp"'));
  assert.ok(html.includes("/media/client-001.webp"));
  for (const image of html.match(/<img\b[^>]*>/g) ?? []) {
    assert.match(image, /\bwidth=/, image);
    assert.match(image, /\bheight=/, image);
  }
  assert.ok(stylesheets.length <= 2, `La portada carga ${stylesheets.length} hojas de estilo`);
});

test("el contacto publica las redes oficiales con iconos accesibles", async () => {
  const html = await readFile(new URL("contacto/index.html", out), "utf8");

  assert.match(html, /aria-label="Ideamos en LinkedIn"/);
  assert.match(html, /aria-label="Ideamos en Instagram"/);
  assert.match(html, /aria-label="Contactar a Ideamos por WhatsApp"/);
  assert.match(html, /aria-label="Ideamos en Facebook"/);
  assert.match(html, /https:\/\/www\.linkedin\.com\/company\/64755212/);
  assert.match(html, /https:\/\/www\.facebook\.com\/ideamos\.com\.ar/);
});

test("el presupuesto de rendimiento evita regresiones pesadas", async () => {
  const homeSource = await readFile(new URL("app/page.tsx", root), "utf8");
  const rootLayout = await readFile(new URL("app/layout.tsx", root), "utf8");
  const packageJson = JSON.parse(await readFile(new URL("package.json", root), "utf8"));
  const videoLimits = {
    "public/media/video-wall-background-2026.webm": 1_500_000,
    "public/media/tablet-animated-final.webm": 700_000,
    "public/media/videollamada-final.webm": 400_000,
    "public/media/marketing-wilde.webm": 450_000,
    "public/media/posicionamiento-video-ads.mp4": 900_000,
  };

  assert.doesNotMatch(homeSource, /^"use client"/);
  assert.equal(packageJson.dependencies?.tailwindcss, undefined);
  assert.equal(packageJson.devDependencies?.tailwindcss, undefined);
  assert.equal(packageJson.devDependencies?.["@tailwindcss/postcss"], undefined);
  assert.match(rootLayout, /casos-de-exito\/casos\.css/);
  assert.match(rootLayout, /DriftWall\.css/);

  for (const [file, maximumBytes] of Object.entries(videoLimits)) {
    const details = await stat(new URL(file, root));
    assert.ok(details.size <= maximumBytes, `${file} pesa ${details.size} bytes`);
  }
});

test("las páginas internas publican schema específico y breadcrumbs", async () => {
  const servicePages = pagePaths.slice(1, 5);
  for (const [file] of pagePaths.slice(1)) {
    const html = await readFile(new URL(file, out), "utf8");
    assert.match(html, /"@type":"BreadcrumbList"/, file);
  }
  for (const [file] of servicePages) {
    const html = await readFile(new URL(file, out), "utf8");
    assert.match(html, /"@type":"Service"/, file);
  }
});

test("los recursos visuales críticos usan formatos livianos y dimensiones", async () => {
  const sourceFiles = [
    "app/page.tsx",
    "components/ShopPage.tsx",
    "components/TestimonialCard.tsx",
    "components/PosicionamientoWebPage.tsx",
    "components/MarketingDigitalPage.tsx",
  ];
  const source = (await Promise.all(sourceFiles.map((file) => readFile(new URL(file, root), "utf8")))).join("\n");

  assert.doesNotMatch(source, /client-.*\.png/);
  assert.doesNotMatch(source, /marketing-google-00[01]\.jpg/);
  assert.doesNotMatch(source, /posicionamiento-(phone|tablet|maps)\.png/);
  assert.match(source, /width=/);
  assert.match(source, /loading="lazy"/);
});

test("el formulario conserva las defensas antispam", async () => {
  const source = await readFile(new URL("components/ContactLeadForm.tsx", root), "utf8");

  assert.match(source, /name="_gotcha"/);
  assert.match(source, /MIN_COMPLETION_TIME_MS/);
  assert.match(source, /SUBMISSION_COOLDOWN_MS/);
  assert.match(source, /DUPLICATE_WINDOW_MS/);
  assert.match(source, /AbortController/);
  assert.match(source, /maxLength=\{2000\}/);
  assert.match(source, /formData\.set\("g-recaptcha-response", await getRecaptchaToken\(\)\)/);
});

test("reCAPTCHA no superpone el badge y conserva su aviso visible y protección", async () => {
  const css = await readFile(new URL("app/revision.css", root), "utf8");
  assert.match(css, /\.grecaptcha-badge\s*\{\s*visibility:\s*hidden\s*!important\s*\}/);
  assert.doesNotMatch(css, /\.grecaptcha-badge[^}]*display:\s*none/);
  const captcha = await readFile(new URL("lib/recaptcha.ts", root), "utf8");
  assert.match(captcha, /captcha\.execute\(SITE_KEY, \{ action: "contact_submit" \}\)/);
  for (const [file] of pagePaths) {
    const html = await readFile(new URL(file, out), "utf8");
    if (!html.includes('action="https://mailer.ideamos.com.ar/send.php"')) continue;
    assert.match(html, /class="contact-recaptcha-notice">Este sitio está protegido por reCAPTCHA\./, file);
    assert.match(html, /href="https:\/\/policies.google.com\/privacy"/, file);
    assert.match(html, /href="https:\/\/policies.google.com\/terms"/, file);
  }
});
