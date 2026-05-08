# N&N Poultry Palace - Digital Experience

A premium, interactive, and fully responsive web platform for N&N Poultry Palace, built with a modern frontend stack focusing on high-performance, smooth animations, and a community-rooted "lived-in" aesthetic. This platform is designed to convert local traffic into direct WhatsApp orders by building trust and transparency.

## 🐓 Product Vision & Brand Identity

N&N Poultry Palace is a farm-to-doorstep egg delivery brand serving households, restaurants, and retailers around Machakos, Kenya.

**Our Core Promise:**
- **Urgency without pressure**: Eggs collected at 2 PM, packed by 5 PM, delivered before noon the next day. The freshness timeline is a feature, not a marketing trick.
- **Farm Credibility**: Real place, real process, real people. A focus on authenticity over generic corporate aesthetics.
- **Frictionless Ordering**: A WhatsApp-first conversion strategy designed for fast decision-making and direct customer connection.

## 🚀 Key Technical Features

- **Premium Visual Experience**: Smooth GSAP-powered scroll animations and Framer Motion micro-interactions to create a dynamic, premium feel.
- **Mobile-First UX**: Meticulously tuned for mobile screens, replacing complex tables and dense text with swipeable cards, expanding accordions, and high-impact visual layouts.
- **Optimized Scrolling**: Lenis integration for a butter-smooth scroll experience.
- **Dynamic Content**: Integrated with Sanity CMS for managing site configuration, testimonials, product details, and the "Education Hub".
- **Accessible & SEO Ready**: Adheres to accessibility best practices (Aria labels, semantic HTML) and features a globally updated FAQ schema for optimized search presence.
- **Production Ready**: Optimized for Vercel deployment with strict Next.js image caching, robust error boundary handling, and a zero-tolerance policy for client-side rendering blockages.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16+](https://nextjs.org/) (App Router)
- **Core**: React 19, TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [GSAP](https://gsap.com/) & [Framer Motion](https://framer.com/motion)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **CMS**: [Sanity.io](https://sanity.io/)
- **Testing**: [Vitest](https://vitest.dev/) with JSDOM

## 📦 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd nnpoultry
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setup environment variables (add Sanity credentials):

   ```bash
   cp .env.local.example .env.local
   ```

4. Run the development server (uses Turbopack):

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🧪 Testing & Code Quality

The project enforces strict type checking and linting to maintain a clean architecture:

- **Linting**: `npm run lint` (ESLint)
- **Formatting**: `npm run format` (Prettier)
- **Type Checking**: `npm run typecheck` (TypeScript)
- **Unit Tests**: `npm run test` (Vitest)

## 📁 Project Structure

- **`src/app`**: Next.js App Router definitions and global layouts.
- **`src/components/sections`**: Feature-level page sections (Hero, FarmPulse, ProductsTeaser, etc.).
- **`src/components/ui`**: Atomic UI components, interactive cards, and badges.
- **`src/content`**: Static fallback content (navigation, default products) used alongside Sanity data.
- **`src/sanity`**: CMS schema definitions and GROQ queries.
- **`src/hooks`**: Custom React hooks for responsive logic and animations.
- **`src/styles`**: Global CSS and styling overrides.

## 📜 License

This project is proprietary. Please contact N&N Poultry for licensing information.
