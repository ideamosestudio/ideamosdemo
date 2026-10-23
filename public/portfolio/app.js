const projects = window.PROJECTS;
document.querySelector('.client-stories')?.remove();
const grid = document.querySelector('#projects');
const dialog = document.querySelector('#project-dialog');
const {cover, card, escape, inlineArrowIcon} = window.PortfolioUI;
let active = 'todos';
let search = '';
let lastFocus;
let visibleProjects = [];
let currentProjectId;

const siteNav = document.querySelector('.nav');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu-overlay');
function updateCoverScroll() {
  const scrollY = window.scrollY;
  document.documentElement.style.setProperty('--scroll', String(scrollY));
  document.documentElement.style.setProperty('--scroll-vh', String(scrollY / window.innerHeight));
  siteNav?.classList.toggle('nav-scrolled', scrollY > 24);
}
updateCoverScroll();
window.addEventListener('scroll', updateCoverScroll, {passive: true});

function setMobileMenu(open) {
  if (!mobileMenuToggle || !mobileMenu) return;
  mobileMenuToggle.classList.toggle('is-open', open);
  mobileMenuToggle.setAttribute('aria-expanded', String(open));
  mobileMenuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  mobileMenu.classList.toggle('is-open', open);
  mobileMenu.classList.toggle('is-closed', !open);
  mobileMenu.setAttribute('aria-hidden', String(!open));
  document.documentElement.classList.toggle('mobile-menu-locked', open);
  if (open) mobileMenu.focus({preventScroll: true});
}
mobileMenuToggle?.addEventListener('click', () => setMobileMenu(!mobileMenu.classList.contains('is-open')));
mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMobileMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobileMenu?.classList.contains('is-open')) {
    setMobileMenu(false);
    mobileMenuToggle.focus();
  }
});

const homeTestimonials = [
  {quote:'Notamos un cambio real: Más consultas, más movimiento y sobretodo, más ventas',lines:['Notamos un cambio real:','Más consultas, más movimiento','y sobretodo, más ventas'],name:'Pablo Avila',role:'Coordinador de CYL S.A.',image:'../media/testimonials/cylsa-image.webp',avatar:'../media/testimonials/cylsa-avatar.webp',video:'../media/testimonials/cylsa.mp4',site:'https://www.cylneumaticos.com.ar/',alt:'Pablo Avila en las oficinas de CYL S.A.'},
  {quote:'Hicieron un trabajo excepcional y súper rápido. 100% recomendados',lines:['Hicieron un trabajo','excepcional y súper rápido.','100% recomendados'],name:'Vanesa Vila',role:'Fundadora de Sphere Design',image:'../media/testimonials/sphere-design-image.jpg',avatar:'../media/testimonials/sphere-design-avatar.png',video:'../media/testimonials/sphere-design.mp4',site:'https://studiospheredesign.com/',alt:'Vanesa Vila, fundadora de Sphere Design'},
  {quote:'Entienden tu negocio y lo transforman en una web que te ayuda a potenciarte',lines:['Entienden tu negocio y lo','transforman en una web','que te ayuda a potenciarte'],name:'Helvio Frieiro',role:'Fundador de STROMA',image:'../media/testimonials/helvio-frieiro-image.webp',avatar:'../media/testimonials/helvio-frieiro-avatar.webp',video:'../media/testimonials/helvio-frieiro.mp4',site:'https://stromaservices.com/',alt:'Helvio Frieiro, fundador de STROMA'},
  {quote:'En Estudio Ideamos desde el primer momento entendieron que estaba buscando',lines:['En Estudio Ideamos desde el','primer momento entendieron','que estaba buscando'],name:'Rodolfo Merino',role:'Gerente de MR Ingeniería',image:'../media/testimonials/mr-image.webp',avatar:'../media/testimonials/mr-avatar.webp',video:'../media/testimonials/mr.mp4',site:'https://mringenieriaestructural.com.ar/',alt:'Rodolfo Merino de MR Ingeniería'},
  {quote:'Nos acompañaron e hicieron un trabajo muy profesional. Les recomiendo a Ideamos',lines:['Nos acompañaron e hicieron','un trabajo muy profesional.','Les recomiendo a Ideamos'],name:'Berenice Cura',role:'Presidente Comunidad Sorda e Hipoacúsica Tandilense',image:'../media/testimonials/berenice-cura-image.webp',avatar:'../media/testimonials/berenice-cura-avatar.webp',video:'../media/testimonials/berenice-cura.mp4',site:'https://estudioideamos.github.io/berenice-cura/',alt:'Berenice Cura, Presidente de la Comunidad Sorda e Hipoacúsica Tandilense'}
];
let activeHomeTestimonial = 0;
const homeTestimonialSection = document.querySelector('.home-testimonials');
const homeTestimonialModal = document.querySelector('.home-testimonials__modal');
function renderHomeTestimonial(index) {
  if (!homeTestimonialSection) return;
  activeHomeTestimonial = (index + homeTestimonials.length) % homeTestimonials.length;
  const item = homeTestimonials[activeHomeTestimonial];
  const heading = homeTestimonialSection.querySelector('h2');
  heading.setAttribute('aria-label', item.quote);
  heading.querySelector('.home-testimonials__title-desktop').innerHTML = item.lines.map((line, lineIndex) => `<span>${lineIndex === 0 ? '“' : ''}${escape(line)}${lineIndex === item.lines.length - 1 ? '”' : ''}</span>`).join('');
  heading.querySelector('.home-testimonials__title-mobile').textContent = `“${item.quote}”`;
  const avatar = homeTestimonialSection.querySelector('.home-testimonials__person img');
  avatar.src = item.avatar;
  homeTestimonialSection.querySelector('.home-testimonials__person strong').textContent = item.name;
  homeTestimonialSection.querySelector('.home-testimonials__person span').textContent = item.role;
  const siteLink = homeTestimonialSection.querySelector('.home-testimonials__site');
  siteLink.href = item.site;
  const image = homeTestimonialSection.querySelector('.home-testimonials__media img');
  image.src = item.image; image.alt = item.alt;
  homeTestimonialSection.querySelector('.home-testimonials__media').setAttribute('aria-label', `Ver video testimonial de ${item.name}`);
  homeTestimonialSection.querySelectorAll('[data-home-testimonial-index]').forEach((button, dotIndex) => button.classList.toggle('is-active', dotIndex === activeHomeTestimonial));
}
homeTestimonialSection?.querySelectorAll('[data-home-testimonial-index]').forEach(button => button.addEventListener('click', () => renderHomeTestimonial(Number(button.dataset.homeTestimonialIndex))));
homeTestimonialSection?.querySelectorAll('[data-home-testimonial-step]').forEach(button => button.addEventListener('click', () => renderHomeTestimonial(activeHomeTestimonial + Number(button.dataset.homeTestimonialStep))));
homeTestimonialSection?.querySelector('.home-testimonials__media')?.addEventListener('click', () => {
  const item = homeTestimonials[activeHomeTestimonial];
  const video = homeTestimonialModal.querySelector('video');
  video.src = item.video;
  homeTestimonialModal.hidden = false;
  document.body.style.overflow = 'hidden';
  video.play().catch(() => {});
});
function closeHomeTestimonialVideo() {
  if (!homeTestimonialModal || homeTestimonialModal.hidden) return;
  const video = homeTestimonialModal.querySelector('video');
  video.pause(); video.removeAttribute('src'); video.load();
  homeTestimonialModal.hidden = true;
  document.body.style.overflow = '';
}
homeTestimonialModal?.querySelector('.home-testimonials__close')?.addEventListener('click', closeHomeTestimonialVideo);
homeTestimonialModal?.addEventListener('click', event => { if (event.target === homeTestimonialModal) closeHomeTestimonialVideo(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeHomeTestimonialVideo(); });
if (homeTestimonialSection) window.setInterval(() => { if (homeTestimonialModal?.hidden !== false) renderHomeTestimonial(activeHomeTestimonial + 1); }, 3000);

const portfolioContactForm = document.querySelector('.contact-main form');
const portfolioContactStartedAt = Date.now();
portfolioContactForm?.addEventListener('submit', async event => {
  event.preventDefault();
  if (!portfolioContactForm.checkValidity()) {
    portfolioContactForm.reportValidity();
    return;
  }
  const formData = new FormData(portfolioContactForm);
  if (String(formData.get('_gotcha') || '').trim()) return;
  if (Date.now() - portfolioContactStartedAt < 2500) return;
  const button = portfolioContactForm.querySelector('.contact-submit');
  let status = portfolioContactForm.querySelector('.contact-form-status');
  if (!status) {
    status = document.createElement('p');
    status.className = 'contact-form-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    portfolioContactForm.append(status);
  }
  button.disabled = true;
  button.textContent = 'Enviando...';
  status.textContent = '';
  try {
    const response = await fetch('https://mailer.ideamos.com.ar/send.php', {method:'POST',body:formData,headers:{Accept:'application/json'}});
    const result = await response.json();
    if (!response.ok || result?.ok !== true) throw new Error('Submission failed');
    portfolioContactForm.reset();
    status.textContent = 'Recibimos tu mensaje y te responderemos a la brevedad.';
  } catch {
    status.textContent = 'No pudimos enviar la consulta. Intentá nuevamente o escribinos por WhatsApp.';
  } finally {
    button.disabled = false;
    button.textContent = 'Enviar consulta';
  }
});


const searchIndex = new Map();
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
function openProject(id) {
  const project = projects.find(p => p.id === id);
  if (!project) return;
  const opening = !dialog.open;
  if (opening) lastFocus = document.activeElement;
  currentProjectId = id;
  document.querySelector('#dialog-title').textContent = project.name;
  document.querySelector('#dialog-category').textContent = project.sector;
  document.querySelector('#dialog-description').textContent = project.description;
  document.querySelector('#dialog-features').innerHTML = (project.features || []).map(f => `<span>${escape(f)}</span>`).join('');
  const stack = document.querySelector('.project-stack');
  stack.hidden = !project.technologies?.length;
  document.querySelector('#dialog-tech').innerHTML = (project.technologies || []).map(t => `<span>${escape(t)}</span>`).join('');
  const preview = document.querySelector('#dialog-image');
  preview.className = 'detail-mockup cover-theme-' + (project.theme || 'slate');
  preview.innerHTML = cover(project);
  preview.querySelectorAll('img').forEach(img => {
    const phone = Boolean(img.closest('.cover-phone'));
    img.loading = 'eager';
    img.removeAttribute('srcset');
    img.removeAttribute('sizes');
    img.src = phone ? (project.mobile || project.phoneThumbLarge) : (project.cover || project.thumbLarge);
    delete img.dataset.src;
    delete img.dataset.srcset;
  });
  const contact = document.querySelector('#dialog-contact');
  contact.href = 'https://wa.me/5491168758285?text=' + encodeURIComponent('Hola Ideamos, vi el trabajo de ' + project.name + ' en su portfolio y quiero consultar por un proyecto similar.');
  contact.dataset.projectId = project.id;
  contact.dataset.projectName = project.name;
  const link = document.querySelector('#dialog-link');
  link.hidden = !project.url;
  link.innerHTML = `Visitar sitio <span>${inlineArrowIcon}</span>`;
  if (project.url) link.href = project.url; else link.removeAttribute('href');
  document.body.classList.add('modal-open');
  const index = visibleProjects.findIndex(p => p.id === id);
  document.querySelector('#project-position').textContent = (index + 1) + ' / ' + visibleProjects.length;
  document.querySelectorAll('[data-project-step]').forEach(button => { button.disabled = visibleProjects.length < 2; });
  if (opening) dialog.showModal();
  document.querySelector('.dialog-scroll').scrollTop = 0;
  if (opening) document.querySelector('.close').focus();
}
for (const p of projects) searchIndex.set(p.id, normalize(p.name + ' ' + p.sector + ' ' + p.description + ' ' + (p.technologies || []).join(' ')));
function render() {
  const query = normalize(search);
  const visible = projects.filter(p => (active === 'todos' || p.category === active) && searchIndex.get(p.id).includes(query));
  visibleProjects = visible;
  if (!grid.children.length) grid.innerHTML = projects.map(card).join('');
  const shown = new Set(visible.map(p => p.id));
  grid.querySelectorAll('[data-card]').forEach(el => { el.hidden = !shown.has(el.dataset.card); });
  document.querySelector('.result-count').textContent = `${visible.length} proyecto${visible.length === 1 ? '' : 's'} para descubrir`;
  document.querySelector('.empty').hidden = visible.length !== 0;
  document.querySelectorAll('[data-filter]').forEach(button => {
    button.querySelector('sup').textContent = button.dataset.filter === 'todos' ? projects.length : projects.filter(p => p.category === button.dataset.filter).length;
  });
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  active = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', b === button ? 'true' : 'false'); });
  render();
}));
document.querySelector('input[type="search"]').addEventListener('input', event => { search = event.target.value; render(); });
grid.addEventListener('click', event => { const button = event.target.closest('[data-project]'); if (button && !event.ctrlKey && !event.metaKey && !event.shiftKey && event.button === 0) { event.preventDefault(); openProject(button.dataset.project); } });
function navigateProject(step) {
  if (visibleProjects.length < 2) return;
  const index = visibleProjects.findIndex(p => p.id === currentProjectId);
  openProject(visibleProjects[(index + step + visibleProjects.length) % visibleProjects.length].id);
}
document.querySelectorAll('[data-project-step]').forEach(button => button.addEventListener('click', () => navigateProject(Number(button.dataset.projectStep))));
dialog.addEventListener('keydown', event => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.target.closest('input, textarea, select, [contenteditable]')) return;
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    navigateProject(event.key === 'ArrowRight' ? 1 : -1);
  }
});
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); lastFocus?.focus(); });
render();

document.querySelector('.toolbar').hidden = false;
