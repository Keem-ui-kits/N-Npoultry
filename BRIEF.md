# N&N Poultry Palace — Project Brief & Architecture Specification

**Status: Production-Ready & Migrated.** The redesign (`nn-poultry-fresh`) has been fully developed, audited, and migrated directly into the production repository (`C:\Users\fredd\Projects\nn-poultry-palace\N-Npoultry`). It is ready to be pushed to GitHub (`Keem-ui-kits/N-Npoultry`) for automated deployment to **[https://www.nnpoultrypalace.co.ke](https://www.nnpoultrypalace.co.ke)**.

---

## 📌 Executive Summary & Brand Identity

- **Brand Name**: N&N Poultry Palace Ltd.
- **Tagline**: *"Fresh and Nutritious — your trusted source for farm-fresh eggs in Machakos."*
- **Origin & Story**: Founded in 2021 by the Kyalo family in Katoloni, Machakos County. Started as a backyard broiler setup during Covid-19 lockdowns, pivoted to layers in 2022, and registered commercially. The name "N&N" represents the initials of the founders' two daughters.
- **Core Values**: Integrity, teamwork, consistency, and animal welfare.
- **Location**: Katoloni, Machakos County, Kenya.
- **Contact Channels**:
  - **Phone 1**: `0113 377 623`
  - **Phone 2**: `0714 246 534`
  - **WhatsApp Direct**: `+254 113 377 623`
  - **Official Email**: `palacepoultryn.n@gmail.com` / `orders@nnpoultrypalace.co.ke`
- **Operating Hours**: Monday–Friday 8:00 AM – 5:00 PM, Saturday 8:00 AM – 12:00 PM (EAT / Nairobi Time).
- **Delivery Zones (6 county zones)**: Machakos Town, Syokimau, Athi River, Mlolongo, Katoloni, Mwala.
- **Freshness Protocol**: *"Collected at 2 PM. Packed by 5 PM. On your doorstep before noon."*

---

## 🏗️ Architecture & Technology Stack

| Layer | Technology | Specification & Purpose |
|---|---|---|
| **Framework** | Next.js 16.3.1 | App Router, Turbopack, React Server Components (RSC), On-demand ISR |
| **UI Library** | React 19.2.8 | Concurrent features, Server Actions, Zero hydration mismatches |
| **Type Safety** | TypeScript 5.0 | Strict type checking with 0 `any` leaks |
| **Styling** | Tailwind CSS v4 | `@theme` CSS tokens, zero-runtime overhead, pure CSS `clamp()` fluid layouts |
| **Typography** | `next/font/google` | **Outfit** (300–800) for editorial headlines, **IBM Plex Mono** (400–600) for operational data |
| **Motion** | CSS Variables + IntersectionObserver | Hand-rolled lightweight motion hooks (`EASE_EDITORIAL`, `EASE_MICRO`) — No heavy runtime libraries |
| **Headless CMS** | Sanity.io Studio v3 | Embedded at `/studio` with custom schemas (`product`, `testimonial`, `educationArticle`, `siteConfig`, `homeConfig`, `founderConfig`, `farmPhoto`) |
| **Database & Auth** | Supabase (PostgreSQL) | Lead archiving and automated ping keep-alive (`/api/keep-alive`) |
| **Rate Limiting** | Upstash Redis | Serverless sliding-window limiter (5 requests / 10 min) on `/api/contact` |
| **Transactional Email** | Resend API | HTML email notifications sent immediately upon contact form submission |
| **Error Monitoring** | Sentry (`@sentry/nextjs`) | Full client, edge, and server-side crash/error reporting |
| **Hosting & CI/CD** | Vercel | Connected to `Keem-ui-kits/N-Npoultry` GitHub repository on branch `main` |

---

## 🎨 Design System & Visual Tokens

The aesthetic is tailored to feel like a high-end agricultural journal:

### Brand Color Tokens (`src/app/globals.css`)
- **`--color-dark` (`#111111`)**: High-contrast black for deep backgrounds and primary typography.
- **`--color-dark-deep` (`#000000`)**: Deepest black for media overlays and video backdrops.
- **`--color-cream` (`#F5F0E8`)**: Warm paper background canvas for editorial sections.
- **`--color-gold` (`#D4AF37` / `#ECCC74`)**: Trust highlights, testimonial background, and operational metrics.
- **`--color-terracotta` (`#C0613B`)**: Accent rule lines, educational category tags, and link highlights.
- **`--color-orange` (`#E07A2F` / `#F59268`)**: CTA gradients, status indicator dots, and micro-accents.
- **`--color-sage` (`#7A9E7E`)**: Organic manure accents.
- **`--container-site` (`1600px`)**: Standard desktop container width with consistent responsive padding.

### Motion Easing & Timing Tokens (`src/lib/motion.ts`)
- **`--ease-editorial`**: `cubic-bezier(0.16, 1, 0.3, 1)` (Smooth luxury settle).
- **`--ease-micro`**: `cubic-bezier(0.2, 0, 0, 1)` (Snappy UI feedback).
- **Durations**: Micro (200ms), UI (340ms), Editorial (650ms), Hero (1100ms/2400ms settle), Sequence (1600ms).

---

## 📱 Page & Feature Specifications

### 1. Homepage (`/`)
- **Hero**: Full-bleed background video (`farm-loop.mp4`) with typography stack. On mobile, farm status is streamlined for single-screen hero visibility.
- **Operations in Numbers**: 2 PM collection start, 5 PM pack & seal, 24–48hr delivery SLA, and 6 active delivery zones.
- **Process Follow Animation (`ProcessStrokeFollow` & `MobileProcessDNA`)**: Interactive SVG stroke that traces the 5 daily farm operations steps: *01 Care → 02 Collect → 03 Grade → 04 Pack → 05 Deliver*.
- **Founders' Heritage Section**: High-resolution photography, Kyalo family story, and guiding principles.
- **Testimonial Rotator (`TestimonialRotator`)**: Automatic circular rotating quote queue with instant fallback data resilience and defensive index guards.
- **Inside the Farm Teaser**: Visual cards for educational articles.
- **Conversion CTA**: High-contrast order card with phone lines and WhatsApp CTA.

### 2. Products & Chapters (`/products`)
- Chapter-based deep dives for all four farm products:
  1. **Table Eggs** (30pc Trays, Mixed Grade, Daily Collection, Minimum 1 Tray).
  2. **Organic Poultry Manure** (50kg / 70kg Bags, Sun-dried, N-P-K Rich, High Nitrogen).
  3. **Kienyeji Birds** (Indigenous Poultry, Free-range vitality).
  4. **Ex-Layer Hens** (72–80 weeks, Vet-inspected, Fully vaccinated, Live birds for meat).
- Direct WhatsApp ordering integration with custom pre-filled product parameters.

### 3. Smart Ordering Concierge (`/order`)
- Step-by-step interactive wizard calculating trays, manure quantities, delivery location, and custom requests.
- Converts state into an instant encoded WhatsApp link directed to the sales desk.

### 4. Knowledge & Education Hub (`/inside-the-farm`)
- Long-form farm management articles across 3 core categories:
  - *The Chick Journey* (Brooding, feeding science)
  - *Growth & Care* (Flock biosecurity, access controls)
  - *Product Excellence* (Organic manure composting, shell integrity)
- Includes dynamic reading progress indicator and author voice callouts (`authorNote`, `farmerTip`).

### 5. Contact & Support (`/contact`)
- Live Nairobi time detector indicating whether farm lines are currently OPEN or CLOSED.
- Interactive contact form protected by Upstash Redis rate limiting, Resend email dispatch, and Supabase lead persistence.

### 6. FAQ Explorer (`/faq`)
- Comprehensive searchable accordion covering logistics, wholesale requirements, payments, and biosecurity protocols.
- Scroll-triggered interactive peek bubbles on mobile headers.

### 7. Embedded Sanity Studio (`/studio`)
- Accessible at `/studio` in both development and production.
- Custom schemas enabling non-technical staff to update product descriptions, add testimonials, publish new articles, and update site contact info.

---

## 🛠️ Deliberate Design & Implementation Decisions

1. **Brand Black over Navy**: The color system uses genuine black (`#111111` / `#000000`) and warm cream (`#F5F0E8`) rather than prototype navy blue.
2. **Gold→Orange Gradient CTAs**: Primary action buttons utilize `linear-gradient(to right, var(--color-gold), var(--color-orange))` with dark text for maximum visual pop and tactile feel.
3. **No Public Price Tags**: In line with local market realities and wholesale volume tiers, pricing is facilitated dynamically via WhatsApp concierge to protect margins and provide bespoke quotes.
4. **Defensive CMS Fallbacks**: If Sanity documents contain null fields or if the CMS is unreachable, full static fallbacks in `src/lib/*-data.ts` render seamlessly with zero UI breakdown.
5. **Mobile Navigation**: Collapsible full-screen drawer with smooth transitions, prominent contact shortcuts, and quick links.

---

## 🔒 Security, Compliance & Quality Standards

- **Zero Vulnerabilities**: Both root and studio dependency trees pass `npm audit` with 0 issues.
- **Strict Typing**: TypeScript `tsc --noEmit` compiles cleanly with zero type assertions or `any` compromises.
- **ESLint Clean**: Full adherence to React 19 rules of hooks and modern flat ESLint config (`eslint.config.mjs`).
- **SEO Ready**: Semantic HTML5 hierarchy (`h1` per page), OpenGraph metadata, Twitter Cards, dynamic `sitemap.xml`, and `robots.txt`.
- **Infrastructure Keep-Alive**: Configured cron job in `vercel.json` hitting `/api/keep-alive` every 3 days to keep backend storage warmed up.

---

## 🚀 Repository & Deployment Reference

- **Redesign Source Repo**: `c:\Users\fredd\Projects\Websites\nn-poultry-fresh`
- **Production Target Repo**: `C:\Users\fredd\Projects\nn-poultry-palace\N-Npoultry`
- **GitHub Remote**: `https://github.com/Keem-ui-kits/N-Npoultry.git` (`main` branch)
- **Live URL**: `https://www.nnpoultrypalace.co.ke`
