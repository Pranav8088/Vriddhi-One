# Content to verify or supply before launch

Everything here was written by Claude during the November 2026 rebuild. The
design, code and structure are finished; **the words are not ratified.**

Three different kinds of problem are mixed together on the site right now, and
they are not equally urgent:

| Tier | What it is | Risk if shipped as-is |
|------|------------|-----------------------|
| **1** | Operational commitments invented to sound credible | **A visitor holds you to a promise you never made** |
| **2** | Capability and product claims that may overstate reality | Overclaiming; a client discovers it in week one |
| **3** | Empty image boxes | Looks unfinished, but harms nobody |

Tier 1 is the one to deal with first. Empty image boxes are honest. Invented
promises are not.

---

## Tier 1 — Promises the site makes on your behalf

Each of these is phrased on the live site as settled company policy. **None of
it came from you.** For each: confirm, change the number, or tell me to cut it.

### Response and availability
- [ ] **"Every enquiry answered within one working day"** — appears on the home
      page figures row and at the foot of every page's closing CTA.
      `content/home.content.ts:54`, `components/cta-band/cta-band.component.ts:56`
- [ ] **"We read everything that arrives and reply within one working day"** —
      closing CTA on every page.

### Engagement terms
- [ ] **Discovery sprint: "one to two weeks, fixed scope and fixed price"** —
      offered as a product on /services and /approach, including *"you keep the
      document either way, and you are under no obligation to continue with us."*
      `content/services.content.ts:186`, `pages/services/services.component.html:136`
- [ ] **Phase durations on /approach** — Understand 1–2 wks, Prove 2–4 wks,
      Build "6–12 weeks, typically", Harden 2–3 wks. `content/approach.content.ts`
- [ ] **"Working software demonstrated every two weeks, on a real environment"**
      — listed as a commitment. `content/approach.content.ts:152`
- [ ] **"Thirty days notice either way, no lock-in"** — on /services and
      /approach. `content/services.content.ts:215`
- [ ] **"Monthly retainer, a named team, fixed capacity"** and
      **"capacity reserved monthly rather than billed by the hour"**
- [ ] **"Change requests priced before they are picked up"**
- [ ] **"100% client-owned — code, infrastructure and model accounts, in your
      name"** — a home page headline figure, repeated on /approach and in the
      terms. Is this actually how you intend to contract?
- [ ] **"A named engineer who knows your project, reachable directly"**
- [ ] **"Incident response against an agreed commitment"** (run-and-improve model)

### Hiring process on /careers
- [ ] **"A paid exercise"** — *"scoped to a few hours and paid for. No unpaid
      take-homes."* Do you intend to pay candidates? `content/careers.content.ts:115`
- [ ] **"Decision within a week, with actual reasons"** `careers.content.ts:129`
- [ ] **"Time and budget for courses, books and conferences"** `:145`
- [ ] **"Remote across India. Asynchronous by default"** `:150`
- [ ] **"Three to six months [internship] with a named mentor"**
- [ ] The whole five-step process exists because a careers page needs one. If
      you have no hiring process yet, this page should say less.

### Legal pages
- [ ] **Privacy: "we respond within thirty days"** to data requests — a DPDP Act
      timeframe, but still a commitment you are making.
- [ ] **Privacy: retention periods** — enquiries 24 months, applications 12
      months. Invented. Set them to whatever you actually do.
- [ ] **Privacy: "multi-factor authentication... credentials in a password
      manager"** — stated as fact about your security practice. True?
- [ ] **Terms: liability capped at "fees paid in the twelve months preceding"**
- [ ] **Terms: "acknowledge within three working days"** on security reports
- [ ] **Terms: jurisdiction "courts at Amravati, Maharashtra"** — confirm with
      whoever drafts your contracts.

> These legal pages have not been reviewed by a lawyer. They are a careful
> starting point, not advice. Have them checked before you rely on them.

---

## Tier 2 — Claims about what you can do

- [ ] **Roomie Hunt is marked "Live"** with four specific features described as
      shipped: compatibility matching, *verified listings with identity checks*,
      explained matches, and in-app chat that hides contact details. Does the
      product actually do all four? `content/products.content.ts`
- [ ] **CA Hunt described as verifying credentials "against the professional
      register"** and agreeing scope in writing before work starts. Built, or
      intended?
- [ ] **16 technologies** listed under "What we build with" on the home page:
      Angular, TypeScript, Python, Node.js, Claude, RAG, Vector search,
      PostgreSQL, pgvector, Redis, Docker, OpenTelemetry, Playwright, MCP,
      React Native, Vercel. Cut anything you have not actually shipped with.
      `content/home.content.ts` → `STACK`
- [ ] **18 itemised capabilities on /about**, introduced as *"areas where we
      have shipped something and can be questioned in detail."* That framing
      makes each line a claim. `content/about.content.ts` → `CAPABILITIES`
- [ ] **Six service lines** with detailed deliverables each. Are all six things
      you want to sell today? `content/services.content.ts`
- [ ] **"Two products in market"** and **"6 capability areas"** — home page
      figures. True as stated, but confirm.
- [ ] **The origin story on /about** — three paragraphs about why the company
      exists. Plausible and on-message, but it is my narrative, not yours.
      Rewrite in your own words if it does not ring true. `about.content.ts` → `STORY`
- [ ] **Timeline on /about** — "2026 incorporated", "2026 Roomie Hunt goes
      live", "CA Hunt in development", "Next: client engineering practice".
      Check the sequence and dates.

---

## Tier 3 — Empty image boxes (6 remaining)

> **Three are done.** The engagement process diagram, the product architecture
> illustration and the office location map are now drawn as real SVG artwork,
> not placeholders — they needed no assets from you. Only photography and
> product screenshots remain.

Each renders a labelled placeholder at the right size. Drop the file in and the
layout does not change. Filenames are listed in `src/assets/README.md`.

| Slot | Page | Size | How to fill |
|------|------|------|-------------|
| Roomie Hunt interface | home, products | 1600×1000 | `shot:` in `products.content.ts` |
| CA Hunt interface | home, products | 1600×1000 | `shot:` in `products.content.ts` |
| Director portrait (Ravindra Tambe) | about | 800×800 square | `portrait:` in `site.config.ts` |
| Second director portrait | about | 800×800 square | fills when the seat is filled |
| Team or workspace photo | about | 1200×1500 portrait | edit the template |
| Team at work photo | careers | 1200×900 | edit the template |

Also missing, and more visible than any of the above:

- [ ] **Favicon** — `src/assets/brand/favicon.svg` (browser tab is blank)
- [ ] **Apple touch icon** — `src/assets/brand/apple-touch-icon.png`, 180×180
- [ ] **Link preview image** — `src/assets/og/og-default.jpg`, 1200×630. Without
      it, every link you share on WhatsApp, LinkedIn or X shows no image.

---

## Tier 4 — Known blanks

- [ ] **Roomie Hunt public URL** — `url: null`, so the card has no link.
      `products.content.ts:73`
- [ ] **CA Hunt URL** (when there is one) — `products.content.ts:115`
- [ ] **Second director** — name, role, bio, LinkedIn. `site.config.ts` → `DIRECTORS`
- [ ] **Two reserved mailbox aliases** — add to `EMAILS` in `site.config.ts`
- [ ] **Phone number** — `+91 83293 84913` carried over from the old site.
      Still correct?
- [ ] **`BREVO_API_KEY`** in the host environment, and a verified sender
      identity on vriddhione.com, or the contact form cannot deliver.
- [ ] **GSTIN** — currently renders as "Not registered". Update when registered.

---

## How to work through this

Answer in whatever form is easiest — a voice note, a list, replies inline. For
Tier 1 the fastest useful answer is usually one of three words per item:
**keep**, **change** (and the new value), or **cut**.

Anything you cut, I remove rather than soften. A shorter page that is true beats
a fuller one that is not.
