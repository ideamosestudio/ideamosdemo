'use strict';
(() => {
  const section = document.querySelector('.client-stories');
  if (!section) return;
  const mobile = window.matchMedia('(max-width: 760px)');
  const caseDetails = [...section.querySelectorAll('.story-case-details')];
  const adaptDetails = () => caseDetails.forEach(detail => { detail.open = !mobile.matches; });
  adaptDetails();
  mobile.addEventListener('change', adaptDetails);
  const tabs = [...section.querySelectorAll('[data-story-tab]')];
  const panels = [...section.querySelectorAll('[data-story]')];
  section.querySelector('.story-tabs').setAttribute('role', 'tablist');
  tabs.forEach(tab => {tab.setAttribute('role', 'tab');tab.setAttribute('aria-controls', 'caso-' + tab.dataset.storyTab);});
  panels.forEach(panel => {panel.setAttribute('role', 'tabpanel');panel.setAttribute('aria-labelledby', 'story-tab-' + panel.dataset.story);panel.tabIndex = 0;});
  function select(id, focus = false) {
    tabs.forEach(tab => {const active = tab.dataset.storyTab === id;tab.setAttribute('aria-selected', String(active));tab.tabIndex = active ? 0 : -1;if (active && focus) tab.focus();});
    panels.forEach(panel => {panel.hidden = panel.dataset.story !== id;});
  }
  const requested = location.hash.replace('#caso-', '');
  select(panels.some(p => p.dataset.story === requested) ? requested : panels[0].dataset.story);
  section.classList.add('stories-ready');
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', event => {event.preventDefault();select(tab.dataset.storyTab);});
    tab.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') target = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = tabs.length - 1;
      if (event.key === ' ') {event.preventDefault();select(tab.dataset.storyTab);return;}
      if (target !== undefined) {event.preventDefault();select(tabs[target].dataset.storyTab, true);}
    });
  });
  window.addEventListener('hashchange', () => {const id = location.hash.replace('#caso-', '');if (panels.some(p => p.dataset.story === id)) select(id);});
  const dialog = document.querySelector('#story-video-dialog');
  const video = dialog.querySelector('video');
  const error = dialog.querySelector('.story-video-error');
  let trigger;
  let tracked = false;
  section.querySelectorAll('[data-story-video]').forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0 || typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    trigger = link;tracked = false;error.hidden = true;
    dialog.querySelector('#story-video-title').textContent = 'Testimonio de ' + link.dataset.person;
    dialog.querySelector('.story-video-fallback').href = link.href;
    video.poster = link.querySelector('img').src;
    video.src = link.href;
    document.body.classList.add('story-video-open');
    dialog.showModal();
    void video.play().catch(() => { /* Native controls remain available if autoplay is restricted. */ });
  }));
  video.addEventListener('play', () => {if (!tracked && trigger) {tracked = true;document.dispatchEvent(new CustomEvent('portfolio:testimonial-play', {detail:{project_id:trigger.dataset.storyVideo,person:trigger.dataset.person}}));}});
  video.addEventListener('error', () => {error.hidden = false;});
  dialog.querySelector('.story-video-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {if (event.target !== dialog) return;const r = dialog.getBoundingClientRect();if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();});
  dialog.addEventListener('close', () => {video.pause();video.removeAttribute('src');video.removeAttribute('poster');video.load();document.body.classList.remove('story-video-open');trigger?.focus();});
})();
