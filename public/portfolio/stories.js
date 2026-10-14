'use strict';
(() => {
  const section = document.querySelector('.client-stories');
  if (!section) return;
  const track = section.querySelector('.story-track');
  const panels = [...section.querySelectorAll('[data-story]')];
  const dots = [...section.querySelectorAll('[data-story-index]')];
  let active = 0;
  function update() {
    active = panels.reduce((best,p,i) => Math.abs(p.getBoundingClientRect().left-track.getBoundingClientRect().left) < Math.abs(panels[best].getBoundingClientRect().left-track.getBoundingClientRect().left) ? i : best, 0);
    dots.forEach((dot,i) => {if(i===active)dot.setAttribute('aria-current','true');else dot.removeAttribute('aria-current')});
    section.querySelector('.story-position').textContent = String(active+1).padStart(2,'0')+' / '+String(panels.length).padStart(2,'0');
    panels.forEach((panel,i) => {panel.inert = i!==active});
  }
  function select(index) {
    index = (index+panels.length)%panels.length;
    track.scrollTo({left:panels[index].offsetLeft-panels[0].offsetLeft,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  }
  section.querySelectorAll('[data-story-step]').forEach(button=>button.addEventListener('click',()=>select(active+Number(button.dataset.storyStep))));
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>select(i)));
  track.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();select(event.key==='Home'?0:event.key==='End'?panels.length-1:active+(event.key==='ArrowRight'?1:-1));});
  let frame;
  track.addEventListener('scroll',()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(update)},{passive:true});
  const observer = new ResizeObserver(()=>{track.scrollTo({left:panels[active].offsetLeft-panels[0].offsetLeft,behavior:'instant'});update()});
  observer.observe(track);
  update();
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
