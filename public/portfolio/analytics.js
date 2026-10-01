'use strict';
(() => {
  // Use the same GA4 property as the main Ideamos site, without loading duplicate GTM tags.
  if (navigator.globalPrivacyControl || navigator.doNotTrack === '1') return;
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-PZH5K8NS3P');
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-PZH5K8NS3P';
  document.head.append(script);
  document.addEventListener('click', event => {
    const link = event.target.closest('a[data-contact-position]');
    if (!link) return;
    const position = link.dataset.contactPosition;
    gtag('event', position === 'contact_form' ? 'click_contact_form' : 'click_whatsapp', {
      position,
      project_id: link.dataset.projectId || '',
      project_name: link.dataset.projectName || '',
      transport_type: 'beacon'
    });
  });
  document.addEventListener('portfolio:testimonial-play', event => {
    gtag('event', 'testimonial_video_play', {project_id: event.detail.project_id, testimonial_person: event.detail.person, transport_type: 'beacon'});
  });
})();
