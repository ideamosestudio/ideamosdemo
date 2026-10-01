const projects = window.PROJECTS;
const grid = document.querySelector('#projects');
const dialog = document.querySelector('#project-dialog');
const {cover, card, escape} = window.PortfolioUI;
let active = 'todos';
let search = '';
let lastFocus;
let visibleProjects = [];
let currentProjectId;


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
  link.innerHTML = `Visitar sitio <span>↗</span>`;
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
