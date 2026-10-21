// Analítica solo con consentimiento. La elección se guarda en localStorage.
(function () {
  var ID = 'G-1R96HY258L', KEY = 'wheelp-analytics';
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function load() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', ID, { anonymize_ip: true });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    document.head.appendChild(s);
  }

  function banner() {
    var b = document.createElement('div');
    b.className = 'consent';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', 'Cookies de analítica');
    b.innerHTML = '<p>Usamos Google Analytics, solo si lo aceptas, para saber cuántas personas visitan la web. ' +
      '<a href="privacidad.html#analitica">Más información</a></p>' +
      '<div><button type="button" class="pill pill-outline" data-c="no">Rechazar</button>' +
      '<button type="button" class="pill" data-c="yes">Aceptar</button></div>';
    b.addEventListener('click', function (e) {
      var c = e.target.getAttribute && e.target.getAttribute('data-c');
      if (!c) return;
      set(c); b.remove();
      if (c === 'yes') load();
    });
    document.body.appendChild(b);
  }

  var v = get();
  if (v === 'yes') load();
  else if (v !== 'no') document.addEventListener('DOMContentLoaded', banner);
})();
