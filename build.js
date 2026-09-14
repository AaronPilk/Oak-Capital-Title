/* Oak Capital Title — static page builder.
   Page bodies live in src/*.body.html; this wraps them in the shared
   head / nav / footer chrome and writes the root HTML files.
   Regenerate with:  node build.js                                    */
const fs = require('fs');
const path = require('path');

const SITE = {
  name: 'Oak Capital Title',
  url: 'https://www.oakcapitaltitle.com',
  phone: '704-467-3031',
  phonePretty: '(704) 467-3031',
  tel: '7044673031',
  email: 'orders@oakcapitaltitle.com',
  city: 'Charlotte, NC',
  underwriter: 'Commonwealth Land Title Insurance Company',
};
const ORDER = `mailto:${SITE.email}?subject=New%20Title%20Order%20%E2%80%94%20Oak%20Capital%20Title`;

const I = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
};

const NAV_ITEMS = [
  ['index.html', 'Home'],
  ['services.html', 'Services'],
  ['homeowners.html', 'Homeowners'],
  ['contact.html', 'Contact'],
];

/* {{PIC:base|alt|width|height|loading}} -> <picture> with WebP + JPEG fallback */
function expandPictures(html) {
  return html.replace(/\{\{PIC:([^}|]+)\|([^}|]*)\|(\d+)\|(\d+)\|(\w+)\}\}/g,
    (_, base, alt, w, h, loading) => {
      const fetchAttr = loading === 'eager' ? ' fetchpriority="high"' : '';
      const loadAttr = loading === 'eager' ? '' : ' loading="lazy" decoding="async"';
      return `<picture>
          <source srcset="assets/img/${base}.webp" type="image/webp" />
          <img src="assets/img/${base}.jpg" alt="${alt}" width="${w}" height="${h}"${loadAttr}${fetchAttr} />
        </picture>`;
    });
}

const nav = (active) => `
<a class="skip-link" href="#main">Skip to content</a>
<header class="nav">
  <div class="nav__inner">
    <a href="index.html" class="nav__logo" aria-label="Oak Capital Title — home">
      <img class="lock-mark on-dark" src="assets/img/mark-white.png" alt="" width="722" height="720" />
      <img class="lock-word on-dark" src="assets/img/wordmark-white.png" alt="" width="1017" height="208" />
      <img class="lock-mark on-light" src="assets/img/mark.png" alt="" width="722" height="720" />
      <img class="lock-word on-light" src="assets/img/wordmark.png" alt="" width="1017" height="208" />
    </a>
    <nav class="nav__links" aria-label="Primary">
${NAV_ITEMS.map(([h, l]) => `      <a href="${h}"${h === active ? ' class="active" aria-current="page"' : ''}>${l}</a>`).join('\n')}
    </nav>
    <div class="nav__cta">
      <a href="tel:${SITE.tel}" class="nav__phone">${I.phone}${SITE.phone}</a>
      <a href="${ORDER}" class="btn btn--primary btn--sm">Order Title</a>
      <button class="nav__burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>

<div class="mobile-menu">
${NAV_ITEMS.map(([h, l]) => `  <a href="${h}">${l}</a>`).join('\n')}
  <a href="tel:${SITE.tel}">Call ${SITE.phone}</a>
  <a href="${ORDER}" class="btn btn--primary">Order Title</a>
</div>
`;

const cta = (eyebrow, heading, copy) => `
<section class="section">
  <div class="wrap">
    <div class="cta-card" data-reveal>
      <span class="eyebrow eyebrow--light">${eyebrow}</span>
      <h2>${heading}</h2>
      <p>${copy}</p>
      <div class="cta-actions">
        <a href="${ORDER}" class="btn btn--light">Order Title</a>
        <a href="tel:${SITE.tel}" class="btn btn--outline-light">Call ${SITE.phone}</a>
      </div>
    </div>
  </div>
</section>
`;

const footer = () => `
<footer class="footer">
  <div class="wrap">
    <div class="footer__grid">
      <div>
        <div class="footer__logo">
          <img class="lock-mark" src="assets/img/mark-white.png" alt="" width="722" height="720" />
          <img class="lock-word" src="assets/img/wordmark-white.png" alt="Oak Capital Title" width="1017" height="208" />
        </div>
        <p>Title insurance and title services for homeowners, investors, lenders and real estate professionals throughout North and South Carolina.</p>
      </div>
      <div>
        <h4>Explore</h4>
        <div class="footer__links">
${NAV_ITEMS.map(([h, l]) => `          <a href="${h}">${l}</a>`).join('\n')}
        </div>
      </div>
      <div>
        <h4>Contact</h4>
        <div class="footer__contact">
          <a href="tel:${SITE.tel}">${I.phone}${SITE.phonePretty}</a>
          <a href="mailto:${SITE.email}">${I.mail}${SITE.email}</a>
          <span>${I.pin}${SITE.city} &middot; Serving North &amp; South Carolina</span>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <span>&copy; <span id="year">2026</span> Oak Capital Title. All rights reserved.</span>
      <span>Underwritten by ${SITE.underwriter}</span>
    </div>
  </div>
</footer>
`;

const PAGES = [
  { file: 'index.html',
    title: 'Oak Capital Title — Title Insurance &amp; Title Services in North &amp; South Carolina',
    desc: 'Oak Capital Title provides dependable title insurance and experienced title services for homeowners, investors, lenders and real estate professionals throughout North and South Carolina.',
    cta: ['Start a transaction', 'Ready when you are', 'Send us the contract and we will open the file. Questions first? Call and you will reach someone who works title every day.'] },
  { file: 'services.html',
    title: 'Services — Oak Capital Title | Residential, Land, Commercial &amp; Closing Coordination',
    desc: 'Residential and land title insurance, closing coordination, and commercial title services across North and South Carolina — backed by more than 20 years of title and real estate experience.',
    cta: ['Every property type', 'Put a transaction in front of us', 'Residential, land or commercial — tell us the closing date and we will work backwards from it.'] },
  { file: 'homeowners.html',
    title: 'Title Insurance Explained — Oak Capital Title | Buyers &amp; Sellers in the Carolinas',
    desc: "What title insurance is, what it covers, what it does not, who pays for it and what it costs — explained plainly for buyers and sellers in North and South Carolina.",
    cta: ['One premium, one time', 'Protect your ownership', 'Buying or selling in the Carolinas? We will keep the title clear and the closing straightforward.'] },
  { file: '404.html', title: 'Page not found — Oak Capital Title',
    desc: 'That page does not exist. Find title services, homeowner resources, or contact Oak Capital Title.',
    cta: null, noindex: true },
  { file: 'contact.html',
    title: 'Contact Oak Capital Title — Order Title in North &amp; South Carolina',
    desc: `Order title, request a quote or ask a question. Oak Capital Title serves every county in North and South Carolina. Call ${SITE.phonePretty} or email ${SITE.email}.`,
    cta: null },
];

const head = (p) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${p.title}</title>
<meta name="description" content="${p.desc}" />${p.noindex ? '\n<meta name="robots" content="noindex" />' : ''}
<link rel="canonical" href="${SITE.url}/${p.file === 'index.html' ? '' : p.file}" />
<meta name="theme-color" content="#175528" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Oak Capital Title" />
<meta property="og:title" content="${p.title}" />
<meta property="og:description" content="${p.desc}" />
<meta property="og:url" content="${SITE.url}/${p.file === 'index.html' ? '' : p.file}" />
<meta property="og:image" content="${SITE.url}/assets/img/og-image.jpg" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="icon" href="assets/img/favicon.ico" sizes="any" />
<link rel="icon" type="image/png" href="assets/img/icon-32.png" sizes="32x32" />
<link rel="apple-touch-icon" href="assets/img/icon-180.png" />
<link rel="stylesheet" href="assets/css/style.css" />
</head>
<body>
`;

const SCHEMA = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Oak Capital Title",
  "description": "Title insurance and title services for homeowners, investors, lenders and real estate professionals throughout North and South Carolina.",
  "url": "${SITE.url}",
  "telephone": "+1-704-467-3031",
  "email": "${SITE.email}",
  "image": "${SITE.url}/assets/img/og-image.jpg",
  "address": { "@type": "PostalAddress", "addressLocality": "Charlotte", "addressRegion": "NC", "addressCountry": "US" },
  "areaServed": [
    { "@type": "State", "name": "North Carolina" },
    { "@type": "State", "name": "South Carolina" }
  ],
  "priceRange": "$$"
}
</script>`;

for (const p of PAGES) {
  const bodyFile = path.join(__dirname, 'src', p.file.replace('.html', '.body.html'));
  if (!fs.existsSync(bodyFile)) { console.error('missing ' + bodyFile); process.exit(1); }
  let body = fs.readFileSync(bodyFile, 'utf8')
    .replaceAll('{{ORDER}}', ORDER)
    .replaceAll('{{TEL}}', SITE.tel)
    .replaceAll('{{PHONE}}', SITE.phone)
    .replaceAll('{{PHONE_PRETTY}}', SITE.phonePretty)
    .replaceAll('{{EMAIL}}', SITE.email)
    .replaceAll('{{CITY}}', SITE.city)
    .replaceAll('{{UNDERWRITER}}', SITE.underwriter)
    .replaceAll('{{ARROW}}', I.arrow);
  body = expandPictures(body);
  const out = head(p) + nav(p.file) + '<main id="main">\n' + body +
    (p.cta ? cta(p.cta[0], p.cta[1], p.cta[2]) : '') + '</main>\n' +
    footer() +
    (p.file === 'index.html' ? '\n' + SCHEMA + '\n' : '') +
    '\n<script src="assets/js/main.js"></script>\n</body>\n</html>\n';
  fs.writeFileSync(path.join(__dirname, p.file), out);
  console.log('built', p.file, (out.length / 1024).toFixed(1) + 'kb');
}
