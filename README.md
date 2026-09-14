# Oak Capital Title

Marketing site for **Oak Capital Title** — title insurance and title services for
homeowners, investors, lenders and real estate professionals throughout North and
South Carolina.

Static HTML/CSS/JS. No framework, no build dependencies. Deployed on Cloudflare Pages.

## Brand direction

> **Strong roots. Secure ownership.**

Strength, roots, stability, protection, growth and experience — kept subtle. No
literal oak leaves, acorns or tree icons. Coverage is described as "North & South
Carolina" or "the Carolinas"; Charlotte appears only in contact/location lines.

**Underwriter: Commonwealth Land Title Insurance Company.** Not WFG. There is no
rate calculator on the site.

## Structure

```
index.html  services.html  homeowners.html  contact.html  404.html   <- generated, deployed
build.js                <- regenerates the pages from src/ + shared chrome
src/*.body.html         <- page content (edit these, not the root HTML)
assets/css/style.css    <- design system
assets/js/main.js       <- nav, scroll reveal, accordion
assets/img/             <- WebP + JPEG pairs, logo lockup, favicons
_source-originals/      <- full-res source art and retired images (gitignored)
```

## Editing

Page chrome (nav, footer, CTA, `<head>`, contact details, underwriter name) lives
in `build.js`. Page content lives in `src/*.body.html`. After any edit:

```bash
node build.js
```

Then commit the regenerated root HTML. Bodies support these tokens:

`{{ORDER}} {{TEL}} {{PHONE}} {{PHONE_PRETTY}} {{EMAIL}} {{CITY}} {{UNDERWRITER}} {{ARROW}}`

and `{{PIC:basename|alt text|width|height|lazy|eager}}`, which expands to a
`<picture>` with a WebP source and a JPEG fallback.

Changing a phone number, the email, or the underwriter in one place (`SITE` in
`build.js`) updates every page.

## Conventions

- **No contact form.** The contact page offers a `mailto:` and a `tel:` link only.
- **One primary button style and one secondary.** No gradient fills, no heavy
  shadows, no button animations.
- Gradients in the CSS are image scrims for text legibility, nothing else.
- Imagery: refined residential architecture, established homes, land, commercial
  exteriors, natural Carolina scenery. No keys-in-hands, handshakes, signing
  scenes or staged closing tables.
- Every image ships as WebP plus a JPEG fallback.

## Brand tokens

| Token | Value | Use |
|---|---|---|
| `--brand` | `#175528` | primary oak green |
| `--sage` | `#a6ba99` | accent on dark surfaces |
| `--forest` | `#12301a` | footer, dark bands |
| `--bg` | `#fcfbf7` | ivory ground |
| `--bg-2` | `#f4f2ea` | stone ground |

Typeface: system stack (SF Pro on Apple, Segoe on Windows).

## Contact

(704) 467-3031 · orders@oakcapitaltitle.com · Charlotte, NC · Serving North & South Carolina

---

Website by [Pilk.ai](https://pilk.ai)
