(() => {
  const projects = window.PROJECTS;
  const ui = window.PortfolioUI;
  const grid = document.querySelector("#projects");
  const dialog = document.querySelector("#project-dialog");
  if (!projects || !ui || !grid || !dialog) return;

  let active = "todos";
  let search = "";
  let lastFocus;
  let visibleProjects = [];
  let currentProjectId;
  const searchIndex = new Map();
  const normalize = value => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  for (const project of projects) {
    searchIndex.set(project.id, normalize(`${project.name} ${project.sector} ${project.description} ${(project.technologies || []).join(" ")}`));
  }

  function openProject(id) {
    const project = projects.find(item => item.id === id);
    if (!project) return;
    const opening = !dialog.open;
    if (opening) lastFocus = document.activeElement;
    currentProjectId = id;
    document.querySelector("#dialog-title").textContent = project.name;
    document.querySelector("#dialog-category").textContent = project.sector;
    document.querySelector("#dialog-description").textContent = project.description;
    document.querySelector("#dialog-features").innerHTML = (project.features || []).map(feature => `<span>${ui.escape(feature)}</span>`).join("");
    const stack = document.querySelector(".project-stack");
    stack.hidden = !project.technologies?.length;
    document.querySelector("#dialog-tech").innerHTML = (project.technologies || []).map(technology => `<span>${ui.escape(technology)}</span>`).join("");
    const preview = document.querySelector("#dialog-image");
    preview.className = `detail-mockup cover-theme-${project.theme || "slate"}`;
    preview.innerHTML = ui.cover(project);
    preview.querySelectorAll("img").forEach(image => {
      const phone = Boolean(image.closest(".cover-phone"));
      image.loading = "eager";
      image.removeAttribute("srcset");
      image.removeAttribute("sizes");
      image.src = phone ? (project.mobile || project.phoneThumbLarge) : (project.cover || project.thumbLarge);
    });
    const contact = document.querySelector("#dialog-contact");
    contact.href = `https://wa.me/5491168758285?text=${encodeURIComponent(`Hola Ideamos, vi el trabajo de ${project.name} en su portfolio y quiero consultar por un proyecto similar.`)}`;
    const link = document.querySelector("#dialog-link");
    link.hidden = !project.url;
    if (project.url) link.href = project.url;
    document.body.classList.add("modal-open");
    const index = visibleProjects.findIndex(item => item.id === id);
    document.querySelector("#project-position").textContent = `${index + 1} / ${visibleProjects.length}`;
    if (opening) dialog.showModal();
    document.querySelector(".dialog-scroll").scrollTop = 0;
    if (opening) document.querySelector(".close").focus();
  }

  function render() {
    const query = normalize(search);
    visibleProjects = projects.filter(project => (active === "todos" || project.category === active) && searchIndex.get(project.id).includes(query));
    const shown = new Set(visibleProjects.map(project => project.id));
    grid.querySelectorAll("[data-card]").forEach(card => { card.hidden = !shown.has(card.dataset.card); });
    document.querySelector(".result-count").textContent = `${visibleProjects.length} proyecto${visibleProjects.length === 1 ? "" : "s"} para descubrir`;
    document.querySelector(".empty").hidden = visibleProjects.length !== 0;
    document.querySelectorAll("[data-filter]").forEach(button => {
      button.querySelector("sup").textContent = button.dataset.filter === "todos" ? projects.length : projects.filter(project => project.category === button.dataset.filter).length;
    });
  }

  document.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => {
    active = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach(item => {
      item.classList.toggle("active", item === button);
      item.setAttribute("aria-pressed", item === button ? "true" : "false");
    });
    render();
  }));
  document.querySelector("input[type=search]")?.addEventListener("input", event => { search = event.target.value; render(); });
  grid.addEventListener("click", event => {
    const link = event.target.closest("[data-project]");
    if (link && !event.ctrlKey && !event.metaKey && !event.shiftKey && event.button === 0) {
      event.preventDefault();
      openProject(link.dataset.project);
    }
  });
  function navigate(step) {
    if (visibleProjects.length < 2) return;
    const index = visibleProjects.findIndex(project => project.id === currentProjectId);
    openProject(visibleProjects[(index + step + visibleProjects.length) % visibleProjects.length].id);
  }
  document.querySelectorAll("[data-project-step]").forEach(button => button.addEventListener("click", () => navigate(Number(button.dataset.projectStep))));
  document.querySelector(".close")?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => { document.body.classList.remove("modal-open"); lastFocus?.focus(); });
  document.querySelector(".toolbar").hidden = false;
  render();
})();
