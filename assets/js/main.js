/* Oak Capital Title — interactions */
(function () {
  'use strict';
  var ORDERS = 'orders@oakcapitaltitle.com';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Nav scroll state --- */
  var nav = document.querySelector('.nav');
  var scrollCue = document.querySelector('.hero__scroll');
  function onScroll() {
    var y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 12);
    if (scrollCue) scrollCue.classList.toggle('hide', y > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Mobile menu --- */
  var burger = document.querySelector('.nav__burger');
  var menu = document.querySelector('.mobile-menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      nav.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Scroll reveal --- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* --- Accordion --- */
  document.querySelectorAll('.acc__q').forEach(function (q) {
    q.addEventListener('click', function () {
      var acc = q.closest('.acc');
      var body = acc.querySelector('.acc__a');
      var open = acc.classList.toggle('open');
      q.setAttribute('aria-expanded', open ? 'true' : 'false');
      body.style.maxHeight = open ? body.scrollHeight + 'px' : '0px';
    });
  });
  window.addEventListener('resize', function () {
    document.querySelectorAll('.acc.open .acc__a').forEach(function (b) {
      b.style.maxHeight = b.scrollHeight + 'px';
    });
  });

  /* --- Contact form -> mailto --- */
  var cf = document.getElementById('contactForm');
  if (cf) {
    cf.addEventListener('submit', function (e) {
      e.preventDefault();
      var g = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
      var note = document.getElementById('formNote');
      var name = g('name'), email = g('email'), phone = g('phone'), topic = g('topic'), msg = g('message');
      if (!name || !email) {
        if (note) { note.textContent = 'Please add your name and email so we can reply.'; note.style.color = '#b56a4a'; }
        return;
      }
      var subject = 'Oak Capital Title — ' + (topic || 'Inquiry') + ' from ' + name;
      var body =
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Phone: ' + phone + '\n' +
        'Topic: ' + topic + '\n\n' +
        'Details:\n' + msg + '\n';
      if (note) { note.textContent = 'Opening your email app…'; note.style.color = ''; }
      window.location.href = 'mailto:' + ORDERS + '?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }

  /* --- Current year --- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
