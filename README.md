# Ideamos — sitio institucional

Sitio oficial de [Ideamos](https://ideamos.com.ar), desarrollado con Next.js y publicado como exportación estática en GitHub Pages.

## Stack

- Next.js 16 con App Router
- React 19 y TypeScript
- Exportación estática (`output: "export"`)
- GitHub Actions + GitHub Pages
- Dominio canónico: `https://ideamos.com.ar`

## Desarrollo local

Requiere Node.js 22 o superior.

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Validación

```bash
npm run typecheck
npm run lint
npm test
```

`npm test` genera el sitio estático y valida títulos, URLs canónicas, sitemap, robots y archivos para asistentes de IA.

## Estructura principal

- `app/`: páginas, metadatos, sitemap y robots.
- `components/`: componentes visuales compartidos.
- `lib/`: configuración común de SEO, analítica y contacto.
- `public/`: imágenes, videos, favicon, verificación y archivos públicos.
- `.github/workflows/deploy-pages.yml`: publicación automática.

Las rutas públicas de prueba no deben agregarse a `app/`. Para experimentar, usar una rama o un entorno local.

## SEO y descubrimiento

- Sitemap: `https://ideamos.com.ar/sitemap.xml`
- Robots: `https://ideamos.com.ar/robots.txt`
- Resumen para agentes: `https://ideamos.com.ar/llms.txt`
- Información ampliada: `https://ideamos.com.ar/llms-full.txt`
- Contacto de seguridad: `https://ideamos.com.ar/security.txt`

Los títulos, descripciones, datos sociales y URLs canónicas se generan desde `lib/seo.ts`. Toda página pública nueva debe usar `createPageMetadata` y agregarse a `app/sitemap.ts`.

## Publicación

Cada push a `main` ejecuta el workflow **Deploy to GitHub Pages**. El workflow detecta si está publicando con el dominio personalizado o con la URL de proyecto y ajusta automáticamente las rutas de recursos.

No se deben subir manualmente `.next/`, `out/`, `node_modules/` ni archivos de variables de entorno.

## Autoría

Diseño, estrategia y desarrollo por [Ideamos](https://ideamos.com.ar).
