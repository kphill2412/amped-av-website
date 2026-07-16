/**
 * Amped AV — Google Analytics 4 + contact click tracking
 *
 * Replace MEASUREMENT_ID after creating a GA4 property:
 * https://analytics.google.com → Admin → Data streams → Web
 */
(function () {
  var MEASUREMENT_ID = 'G-BPVYEWDEKY';
  var PLACEHOLDER = /X{4,}/i;
  var ALLOWED_HOSTS = {
    'amped-av.com': true,
    'www.amped-av.com': true,
  };

  if (!MEASUREMENT_ID || PLACEHOLDER.test(MEASUREMENT_ID)) {
    return;
  }

  // Skip GA on staging (pages.dev) and any other non-production host
  if (!ALLOWED_HOSTS[location.hostname]) {
    return;
  }

  var script = document.createElement('script');
  script.async = true;
  script.src =
    'https://www.googletagmanager.com/gtag/js?id=' +
    encodeURIComponent(MEASUREMENT_ID);
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID);

  function track(eventName, params) {
    var payload = params || {};
    payload.page_path = location.pathname;
    gtag('event', eventName, payload);
  }

  function linkLabel(el) {
    var text = (el.textContent || '').trim().replace(/\s+/g, ' ');
    if (text) return text.slice(0, 80);
    return el.getAttribute('href') || '';
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('a, button');
    if (!el) return;

    var href = el.getAttribute('href') || '';

    if (href.indexOf('tel:') === 0) {
      track('contact_call_click', {
        link_url: href,
        link_text: linkLabel(el),
      });
      return;
    }

    if (href.indexOf('sms:') === 0) {
      track('contact_text_click', {
        link_url: href,
        link_text: linkLabel(el),
      });
      return;
    }

    if (href.indexOf('mailto:') === 0) {
      track('contact_email_click', {
        link_url: href,
        link_text: linkLabel(el),
      });
      return;
    }

    if (el.classList.contains('nav-cta') || el.classList.contains('btn-primary')) {
      track('cta_click', {
        link_url: href || undefined,
        link_text: linkLabel(el),
        cta_type: el.classList.contains('nav-cta') ? 'nav' : 'primary',
      });
      return;
    }

    if (href.indexOf('contact.html') !== -1) {
      track('cta_click', {
        link_url: href,
        link_text: linkLabel(el),
        cta_type: 'contact_link',
      });
    }
  });

  /* contact_form_submit / generate_lead fire from contact.html after a successful Formspree response */
})();
