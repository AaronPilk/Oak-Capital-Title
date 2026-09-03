/* Oak Capital Title — static page builder.
   Page bodies live in src/*.body.html; this wraps them in the shared
   head / nav / footer chrome and writes the four root HTML files.
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
  address: 'PO Box 851, Oakboro, NC 28129',
  rates: 'https://rates.wfgnationaltitle.com/',
};
const ORDER = `mailto:${SITE.email}?subject=New%20Title%20Request%20%E2%80%94%20Oak%20Capital%20Title`;

const I = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
};

const NAV_ITEMS = [
  ['index.html', 'Home'],
  ['services.html', 'Services'],
  ['homeowners.html', 'Homeowners'],
  ['contact.html', 'Contact'],
];

const logoLockup = (cls) => `
      <img class="lock-mark on-dark" src="assets/img/mark-white.png" alt="" width="722" height="720" />
      <img class="lock-word on-dark" src="assets/img/wordmark-white.png" alt="" width="1017" height="208" />
      <img class="lock-mark on-light" src="assets/img/mark.png" alt="" width="722" height="720" />
      <img class="lock-word on-light" src="assets/img/wordmark.png" alt="" width="1017" height="208" />`;

const nav = (active) => `
<header class="nav">
  <div class="nav__inner">
    <a href="index.html" class="nav__logo" aria-label="Oak Capital Title — home">${logoLockup()}
    </a>
    <nav class="nav__links" aria-label="Primary">
${NAV_ITEMS.map(([h, l]) => `      <a href="${h}"${h === active ? ' class="active" aria-current="page"' : ''}>${l}</a>`).join('\n')}
    </nav>
    <div class="nav__cta">
      <a href="tel:${SITE.tel}" class="nav__phone">${I.phone}${SITE.phone}</a>
      <a href="${ORDER}" class="btn btn--primary btn--sm">Order Title ${I.arrow}</a>
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
<section class="section section--tight">
  <div class="wrap">
    <div class="cta-card" data-reveal>
      <span class="eyebrow eyebrow--light">${eyebrow}</span>
      <h2>${heading}</h2>
      <p>${copy}</p>
      <div class="cta-actions">
        <a href="${ORDER}" class="btn btn--light">Order Title ${I.arrow}</a>
        <a href="tel:${SITE.tel}" class="btn btn--outline-light">Call ${SITE.phone}</a>
      </div>
    </div>
  </div>
</section>
`;

const footer = () => `
<footer class="footer">
  <div class="blob blob--b" style="bottom:-50%;right:-5%;opacity:.14;"></div>
  <div class="wrap">
    <div class="footer__grid">
      <div>
        <div class="footer__logo">
          <img class="lock-mark" src="assets/img/mark-white.png" alt="" width="722" height="720" />
          <img class="lock-word" src="assets/img/wordmark-white.png" alt="Oak Capital Title" width="1017" height="208" />
        </div>
        <p>An independent title agency in Charlotte, North Carolina. We search, insure and close residential and commercial property in every county in both Carolinas — and we answer the phone.</p>
      </div>
      <div>
        <h4>Explore</h4>
        <div class="footer__links">
${NAV_ITEMS.map(([h, l]) => `          <a href="${h}">${l}</a>`).join('\n')}
          <a href="${SITE.rates}" target="_blank" rel="noopener">Rate Calculator</a>
        </div>
      </div>
      <div>
        <h4>Contact</h4>
        <div class="footer__contact">
          <a href="tel:${SITE.tel}">${I.phone}${SITE.phonePretty}</a>
          <a href="mailto:${SITE.email}">${I.mail}${SITE.email}</a>
          <span>${I.pin}${SITE.address}</span>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <span>&copy; <span id="year">2026</span> Oak Capital Title. All rights reserved.</span>
      <span>Title searches &middot; Title insurance &middot; Closings &middot; Charlotte, NC</span>
    </div>
  </div>
</footer>
`;

const PAGES = [
  { file: 'index.html', title: 'Oak Capital Title — Title Insurance in Charlotte, NC | Residential &amp; Commercial',
    desc: 'Oak Capital Title is an independent title agency in Charlotte, NC. Title searches, title insurance and closings for residential, land and commercial property in every county in North and South Carolina. Phones on nights and weekends.',
    cta: ['Phones on, seven days', 'Send us the file', 'Email the contract and we open it the same day. Not sure what you need yet? Call — you will get a person who works title, not a switchboard.'] },
  { file: 'services.html', title: 'Services — Oak Capital Title | Residential, Land, Commercial &amp; Closings',
    desc: 'Title searches and title insurance for homes, land and commercial property across North and South Carolina, plus closing attorney and notary coordination — in person or remote. Charlotte, NC.',
    cta: ['Ready when you are', 'Put a file in front of us', 'House, hundred-acre tract or a shopping center — same desk, same day it lands. Tell us the closing date and we will work backwards from it.'] },
  { file: 'homeowners.html', title: 'Title Insurance Explained — Oak Capital Title | For Carolina Buyers &amp; Sellers',
    desc: "What title insurance is, what it covers, what it doesn't, who pays for it and what it costs — explained plainly for buyers and sellers in North and South Carolina by Oak Capital Title.",
    cta: ['One premium, one time', 'Protect the biggest check you will write', "Buying or selling in the Carolinas? We will keep the title clean and the closing boring — which is exactly what you want it to be."] },
  { file: '404.html', title: 'Page not found — Oak Capital Title', desc: "That page doesn't exist. Find title services, homeowner resources, or contact Oak Capital Title in Charlotte, NC.", cta: null, noindex: true },
  { file: 'contact.html', title: 'Contact Oak Capital Title — Order Title in NC &amp; SC | Charlotte',
    desc: `Order title, request a quote or ask a question. Oak Capital Title, Charlotte NC, covering every county in North and South Carolina. Call ${SITE.phonePretty} or email ${SITE.email}.`,
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
<link rel="preconnect" href="https://rates.wfgnationaltitle.com" />
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
  "description": "Independent Charlotte, NC title agency. Title searches, title insurance and closing coordination for residential, land and commercial property throughout North and South Carolina.",
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

fs.mkdirSync(path.join(__dirname, 'src'), { recursive: true });
for (const p of PAGES) {
  const bodyFile = path.join(__dirname, 'src', p.file.replace('.html', '.body.html'));
  if (!fs.existsSync(bodyFile)) { console.error('missing ' + bodyFile); process.exit(1); }
  let body = fs.readFileSync(bodyFile, 'utf8')
    .replaceAll('{{ORDER}}', ORDER)
    .replaceAll('{{TEL}}', SITE.tel)
    .replaceAll('{{PHONE}}', SITE.phone)
    .replaceAll('{{PHONE_PRETTY}}', SITE.phonePretty)
    .replaceAll('{{EMAIL}}', SITE.email)
    .replaceAll('{{ADDRESS}}', SITE.address)
    .replaceAll('{{RATES}}', SITE.rates)
    .replaceAll('{{ARROW}}', I.arrow);
  const out = head(p) + nav(p.file) + body +
    (p.cta ? cta(p.cta[0], p.cta[1], p.cta[2]) : '') +
    footer() +
    (p.file === 'index.html' ? '\n' + SCHEMA + '\n' : '') +
    '\n<script src="assets/js/main.js"></script>\n</body>\n</html>\n';
  fs.writeFileSync(path.join(__dirname, p.file), out);
  console.log('built', p.file, (out.length / 1024).toFixed(1) + 'kb');
}
