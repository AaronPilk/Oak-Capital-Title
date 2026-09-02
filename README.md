# Oak Capital Title

Marketing site for **Oak Capital Title** — an independent residential & commercial
title insurance agency based in Charlotte, NC, serving every county in North and
South Carolina.

Static HTML/CSS/JS. No framework, no build dependencies. Deployed on Cloudflare Pages.

## Structure

```
index.html  services.html  homeowners.html  contact.html  404.html   <- generated, deployed
build.js                <- regenerates the pages from src/ + shared chrome
src/*.body.html         <- page content (edit these, not the root HTML)
assets/css/style.css    <- design system
assets/js/main.js       <- nav, reveal, accordion, mailto form
assets/img/             <- web-optimised imagery + logo lockup
_source-originals/      <- full-res source art (gitignored)
```

## Editing

Page chrome (nav, footer, CTA, `<head>`, contact details) lives in `build.js`.
Page content lives in `src/*.body.html`. After any edit:

```bash
node build.js
```

Then commit the regenerated root HTML files. Bodies support these tokens:
`{{ORDER}} {{TEL}} {{PHONE}} {{PHONE_PRETTY}} {{EMAIL}} {{ADDRESS}} {{RATES}} {{ARROW}}`

Changing a phone number or email in one place (`SITE` in `build.js`) updates
every page.

## Brand

| Token | Value | Use |
|---|---|---|
| `--brand` | `#175528` | primary oak green |
| `--sage` | `#a6ba99` | accent on dark surfaces |
| `--forest` | `#0d2b16` | footer / dark bands |

Typeface: system stack (SF Pro on Apple, Segoe on Windows).

## Contact

Phone (704) 467-3031 · orders@oakcapitaltitle.com · PO Box 851, Oakboro, NC 28129

---

Website by [Pilk.ai](https://pilk.ai)
