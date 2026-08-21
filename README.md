# 🐔 N&N Poultry Palace — Web Platform & CMS

[![Next.js](https://img.shields.io/badge/Next.js-16.3.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-61dafb?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Sanity CMS](https://img.shields.io/badge/Sanity-v3-f03e2f?logo=sanity)](https://www.sanity.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Sentry](https://img.shields.io/badge/Sentry-Monitored-362d59?logo=sentry)](https://sentry.io/)
[![Upstash Redis](https://img.shields.io/badge/Upstash-Rate--Limited-00e9a3?logo=redis)](https://upstash.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Integrated-3ecf8e?logo=supabase)](https://supabase.com/)

> **Live Website**: [https://www.nnpoultrypalace.co.ke](https://www.nnpoultrypalace.co.ke)  
> **Brand Promise**: *"Fresh & Nutritious — Daily collected eggs, organic manure, and poultry excellence in Machakos County, Kenya."*

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features & User Flows](#-key-features--user-flows)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Design System & Editorial Aesthetics](#-design-system--editorial-aesthetics)
- [Sanity Studio & Content Architecture](#-sanity-studio--content-architecture)
- [API Endpoints & Server Functions](#-api-endpoints--server-functions)
- [Environment Variables Guide](#-environment-variables-guide)
- [Getting Started & Local Development](#-getting-started--local-development)
- [Scripts & Quality Assurance](#-scripts--quality-assurance)
- [Production Deployment Workflow](#-production-deployment-workflow)
- [Security & Performance Checklist](#-security--performance-checklist)

---

## 🌟 Overview

**N&N Poultry Palace** is a modern, high-performance web platform designed for a family-owned poultry enterprise located in Katoloni, Machakos County, Kenya. 

The application was built from the ground up with Next.js 16 (App Router + Turbopack), React 19, and Tailwind CSS v4. It blends an editorial design aesthetic (reminiscent of high-end agricultural journals) with seamless digital commerce features (instant WhatsApp ordering, live Kenyan time availability status, rich product dossiers, and on-demand CMS content synchronization via Sanity).

---

## 🚀 Key Features & User Flows

### 1. Editorial Homepage (`/`)
- **Full-Bleed Hero**: Video & photographic layer-house showcase with animated typographic headline stack.
- **Operations in Numbers**: Live transparency stats highlighting collection timings (2 PM collection, 5 PM pack & seal, 24–48hr farm-to-door SLA) and coverage of 6 delivery zones.
- **Process Stroke Animation (`ProcessStrokeFollow`)**: Dynamic SVG stroke and checkpoint progression visualizing the 5-step flock care & egg collection cycle.
- **Founders' Heritage Section**: Deep storytelling highlighting the family backstory from 2021 Covid backyard roots to commercial leadership.
- **Dynamic Testimonial Rotator**: Client-side circular queue promoting customer testimonials with defensive fallback mechanisms.
- **Inside the Farm Teaser**: Knowledge articles highlighting chick brooding, organic fertilization, and biosecurity protocols.

### 2. Products & Dossiers (`/products`)
- **Chapter-Based Exploration**: Rich editorial dossiers for **Fresh Table Eggs (30pc Trays)**, **Organic Poultry Manure (50kg Bags)**, **Kienyeji Birds**, and **Ex-Layer Hens**.
- **Nutritional & Technical Specs**: Shell grade metrics, yolk density ratings, nitrogen/phosphorus/potassium breakdown for manure, and batch origin dates.
- **Direct Order Triggers**: One-click routing to personalized WhatsApp purchase messages.

### 3. Smart Ordering Wizard (`/order`)
- **Frictionless Pre-Fill Engine**: Dynamically constructs pre-formatted WhatsApp order requests based on product selection, tray quantities, delivery zone, and fulfillment notes.
- **Nairobi Time Calculator**: Live detection of farm operating hours (`Mon–Fri 8–5 · Sat 8–12 EAT`) to advise customers on dispatch windows.

### 4. Farm Knowledge Hub (`/inside-the-farm`)
- **Rich Technical Guides**: In-depth articles covering poultry nutrition, biosecurity access controls, vaccination schedules, and regenerative soil science.
- **Dynamic Reading Progress Bar**: Real-time scroll indicator for long-form educational reads.

### 5. Contact & Inquiries (`/contact`)
- **Live Status Badge**: Instant indication if customer care lines are open.
- **Interactive Form**: Zod-validated input submission.
- **Automated Routing**: Double-layer persistence: sends structured HTML notification emails via **Resend** and archives leads to **Supabase**.

### 6. Interactive FAQ Explorer (`/faq`)
- **Categorized Inquiries**: Delivery times, payment terms, minimum order thresholds, and farm visits.
- **Text-Reveal Bubbles**: Smooth interactive accordion expansion with micro-animations.

### 7. Embedded Sanity Studio (`/studio`)
- Integrated CMS administrative dashboard mounted at `/studio` for real-time document editing, photo uploads, article publication, and headline management.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 16.3.1 (App Router, Turbopack) | Server Components, dynamic streaming, static generation |
| **UI Library** | React 19.2.8 | Latest concurrent rendering & server actions |
| **Styling** | Tailwind CSS v4 + Vanilla CSS Tokens | Zero-runtime CSS variables & responsive layout utilities |
| **Motion** | Framer Motion + GSAP | Smooth scroll animations, text reveals, SVG stroke effects |
| **CMS** | Sanity.io Studio v3 & `@sanity/client` | Structured content authoring & asset pipeline |
| **Type Safety** | TypeScript 5 & Zod 4 | End-to-end schema validation |
| **Email Delivery** | Resend API | Transactional lead notifications |
| **Database** | Supabase (PostgreSQL) | Lead archiving & infrastructure keep-alive |
| **Rate Limiting**| Upstash Redis (Serverless) | Sliding window protection on contact APIs |
| **Observability**| Sentry (`@sentry/nextjs`) | Client, server, and edge exception tracking |
| **Hosting** | Vercel | Global Edge Network + Cron triggers |

---

## 📂 Project Directory Structure

```
nn-poultry-fresh/
├── .env.local                    # Local environment variables (gitignored)
├── .env.example                  # Template of environment variables
├── eslint.config.mjs             # Flat ESLint configuration
├── next.config.ts                # Next.js config with Sentry & Sanity CDN image domains
├── package.json                  # Root dependencies & package overrides
├── postcss.config.mjs            # PostCSS configuration for Tailwind v4
├── tsconfig.json                 # TypeScript compiler configuration
├── vercel.json                   # Vercel configuration & keep-alive cron job
│
├── public/                       # Static media assets
│   ├── assets/                   # Farm imagery & icons
│   ├── farm-loop.mp4             # High-resolution layer house background video
│   ├── farm-sign.jpeg            # Farm entrance banner
│   ├── favicon.ico               # Brand favicon
│   └── norm/                     # Product catalog photography
│
├── src/                          # Application source code
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Global layout with SiteHeader & SiteFooter
│   │   ├── page.tsx              # Homepage
│   │   ├── globals.css           # Design tokens, typography & CSS variables
│   │   ├── robots.ts             # Search engine crawling rules
│   │   ├── sitemap.ts            # Dynamic XML sitemap generator
│   │   ├── about/page.tsx        # Farm backstory & values
│   │   ├── inside-the-farm/      # Educational articles & knowledge hub
│   │   ├── products/page.tsx     # Full product dossiers
│   │   ├── order/page.tsx        # Order wizard & WhatsApp router
│   │   ├── contact/page.tsx      # Contact form with live status
│   │   ├── faq/page.tsx          # FAQ explorer
│   │   └── api/                  # Serverless API routes
│   │       ├── contact/route.ts  # Rate-limited Resend + Supabase contact handler
│   │       ├── keep-alive/       # Supabase database warm-up cron
│   │       └── revalidate/       # On-demand Sanity webhook cache revalidation
│   │
│   ├── components/               # React UI Components
│   │   ├── contact/              # Contact form & live availability badge
│   │   ├── education/            # Reading progress bar & article layout
│   │   ├── faq/                  # Interactive accordion & text reveal items
│   │   ├── home/                 # Hero, process stroke, testimonial rotator
│   │   ├── motion/               # Chapter transitions & reveal wrappers
│   │   ├── order/                # Order wizard calculator
│   │   ├── products/             # Product dossiers & hero status chips
│   │   ├── site-header.tsx       # Responsive navigation with mobile menu
│   │   ├── site-footer.tsx       # Footer navigation & compliance info
│   │   └── ui/                   # Reusable atomic UI elements
│   │
│   ├── lib/                      # Core business logic & data helpers
│   │   ├── motion.ts             # Motion easing tokens & reduced-motion checks
│   │   ├── rate-limit.ts         # Upstash Redis sliding window limiter
│   │   ├── server-utils.ts       # HTML escaping & Supabase persistence
│   │   ├── site-data.ts          # Static fallbacks, delivery zones & schedule
│   │   └── whatsapp.ts           # WhatsApp URI generation engine
│   │
│   └── sanity/                   # Sanity CMS Client & Queries
│       ├── env.ts                # Project ID & dataset environment reader
│       └── lib/                  # Client initialization, queries & image builder
│
└── studio/                       # Embedded Sanity Studio
    ├── sanity.config.ts          # Studio workspace setup
    ├── sanity.cli.ts             # Sanity CLI configuration
    ├── package.json              # Studio-isolated dependencies
    └── schemaTypes/              # Sanity document & object schemas
        ├── index.ts              # Schema index export
        ├── product.ts            # Product document schema
        ├── testimonial.ts        # Testimonial document schema
        ├── educationArticle.ts   # Educational article schema
        ├── siteConfig.ts         # Global site configuration
        ├── homeConfig.ts         # Homepage dynamic headline schema
        ├── founderConfig.ts      # Founder section schema
        └── farmPhoto.ts          # Photo gallery document schema
```

---

## 🎨 Design System & Editorial Aesthetics

The platform implements an **Editorial Farm Journal** design language:

### Color Palette

| Token | Hex / HSL | Usage |
|---|---|---|
| `--color-dark` | `#111111` | Primary text, high-contrast dark sections |
| `--color-cream` | `#F5F0E8` | Warm background canvas, natural paper feel |
| `--color-gold` | `#D4AF37` / `#C5A059` | Trust accents, testimonial section, badges |
| `--color-terracotta`| `#C0613B` | Educational category tags, link highlights |
| `--color-orange` | `#E07A2F` | Primary action buttons and focus states |

### Typography
- **Headings**: Editorial sans-serif with tight negative tracking (`-0.035em`) and responsive fluid scaling (`clamp()`).
- **Data & Eyebrows**: Monospaced uppercase labels (`letterSpacing: .18em to .22em`) for operational authenticity.
- **Body Copy**: High-readability proportional serif/sans-serif with comfortable `1.7` line-height.

---

## 📝 Sanity Studio & Content Architecture

The CMS enables complete editorial control without modifying code:

| Schema Document | Description | Key Fields |
|---|---|---|
| `product` | Catalog items | `title`, `titleAccent`, `category`, `price`, `description`, `specs`, `image` |
| `testimonial` | Client quotes | `name`, `place`, `role`, `quote`, `featured`, `order` |
| `educationArticle` | Knowledge articles | `title`, `slug`, `category`, `readTime`, `coverImage`, `body` |
| `siteConfig` | Global settings | `title`, `phone`, `email`, `address`, `businessHours`, `deliveryZones` |
| `homeConfig` | Homepage hero copy | `headline`, `subheadline`, `stats` |
| `founderConfig` | Founder story | `founderNames`, `tenure`, `quote`, `storyParagraphs`, `portrait` |
| `farmPhoto` | Photo gallery | `title`, `caption`, `location`, `image` |

---

## 🌐 API Endpoints & Server Functions

### 1. `/api/contact` (POST)
- **Rate Limit**: Max 5 requests per 10 minutes per IP (via Upstash Redis).
- **Validation**: Zod schema verifying `name`, `phone`, `email`, `subject`, and `message`.
- **Side Effects**:
  1. Sends structured HTML notification to the farm management via **Resend**.
  2. Persists lead submission into **Supabase** `leads` table.

### 2. `/api/revalidate` (POST)
- **Purpose**: Webhook listener from Sanity CMS.
- **Security**: Validates `SANITY_REVALIDATE_SECRET` header.
- **Action**: Triggers Next.js `revalidateTag` / `revalidatePath` for instantaneous cache updates without redeploying.

### 3. `/api/keep-alive` (GET)
- **Purpose**: Cron trigger configured in `vercel.json` (runs every 3 days at 06:00 UTC).
- **Action**: Executes a lightweight read query to Supabase to prevent free-tier project dormancy.

---

## 🔐 Environment Variables Guide

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

| Variable | Description | Required? |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL of the site (`https://www.nnpoultrypalace.co.ke`) | **Yes** |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project identifier (`ik167lhg`) | **Yes** |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset environment (`production`) | **Yes** |
| `NEXT_PUBLIC_SANITY_API_VERSION`| Sanity GROQ API version (`2026-04-11`) | **Yes** |
| `SANITY_REVALIDATE_SECRET` | Secret key for `/api/revalidate` webhooks | Optional (Production) |
| `RESEND_API_KEY` | API key from Resend for transactional email dispatch | **Yes** |
| `SUPABASE_URL` | Supabase project URL | **Yes** |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role secret for secure server writes | **Yes** |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL for serverless rate limiting | **Yes** |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token | **Yes** |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry DSN for performance & crash monitoring | Optional |

---

## 💻 Getting Started & Local Development

### Prerequisites
- **Node.js**: `v20.0.0` or higher
- **npm**: `v10.0.0` or higher

### Installation

```bash
# 1. Clone repository
git clone https://github.com/Keem-ui-kits/N-Npoultry.git
cd N-Npoultry

# 2. Install root dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# (Fill in your API keys in .env.local)

# 4. Start Next.js development server
npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)** in your browser.

### Running Sanity Studio Locally

```bash
cd studio
npm install
npm run dev
```

Visit **[http://localhost:3333](http://localhost:3333)** or access the embedded studio at **[http://localhost:3000/studio](http://localhost:3000/studio)**.

---

## 🧪 Scripts & Quality Assurance

Run the quality check suite:

```bash
# Typecheck TypeScript files
npm run typecheck    # or: npx tsc --noEmit

# Run ESLint linter
npm run lint         # or: npx eslint src

# Dependency vulnerability audit
npm audit

# Create optimized production build
npm run build

# Run production server locally
npm run start
```

---

## 🚢 Production Deployment Workflow

The production repository is linked to **Vercel** via GitHub:

1. Changes committed and pushed to `main` on `https://github.com/Keem-ui-kits/N-Npoultry.git` automatically trigger a Vercel build.
2. Vercel executes `npm run build` using Next.js Turbopack compiler.
3. Edge caches are automatically populated and updated upon Sanity CMS webhook pings.

---

## 🛡️ Security & Performance Checklist

- [x] **0 npm vulnerabilities** across root and studio packages.
- [x] **Strict TypeScript compilation** with zero `any` leaks.
- [x] **Zero ESLint warnings** with React 19 hook safety.
- [x] **API Rate Limiting** with sliding window protection on all public mutations.
- [x] **HTML sanitization & escaping** on contact email inputs.
- [x] **Responsive fluid typography** using pure CSS `clamp()` and zero layout shift (CLS < 0.01).
- [x] **SEO metadata**, OpenGraph tags, JSON-LD structured data, dynamic `sitemap.xml`, and `robots.txt`.

---

## 👥 Credits & Contact

- **Enterprise**: N&N Poultry Palace Ltd.
- **Location**: Katoloni, Machakos County, Kenya
- **Contact**: `0113 377 623` · `0714 246 534`
- **Email**: `orders@nnpoultrypalace.co.ke`
