# N&N Poultry Palace - Business Operations Manager

A premium, interactive, and fully responsive landing page for N&N Poultry, built with a modern tech stack focusing on performance, smooth animations, and luxury aesthetics. This tool helps showcase farm-fresh poultry products with a high-end digital presence.

## 🚀 Key Features

- **Premium Visual Experience**: Smooth GSAP-powered scroll animations and Framer Motion interactions.
- **Fully Responsive**: Meticulously tuned for all screen sizes from mobile to desktop.
- **Dark Mode Support**: Seamless theme switching with system detection and persistence.
- **Dynamic Product Showcase**: Animated stacking cards and bento grids for clear product visualization.
- **Optimized Scrolling**: Lenis integration for butter-smooth scrolling experience.
- **Robust Forms**: Server-side contact form implementation with rate limiting and security headers.
- **Accessible UI**: Adheres to accessibility best practices (Aria labels, semantic HTML, keyboard navigation).
- **Performance Optimized**: Fine-tuned Next.js image optimization and caching strategies.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16+](https://nextjs.org/) (App Router)
- **Core**: React 19, TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [GSAP](https://gsap.com/) & [Framer Motion](https://framer.com/motion)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Testing**: [Vitest](https://vitest.dev/) with JSDOM
- **Validation**: [Zod](https://zod.dev/)

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

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🧪 Testing

Run unit tests with Vitest:

```bash
npm run test:run
```

## 🧹 Code Quality

The project includes standard linting and formatting tools:

- **Linting**: `npm run lint` (ESLint)
- **Formatting**: `npm run format` (Prettier)
- **Type Checking**: `npm run typecheck` (TypeScript)

## 📁 Project Structure

- **src/app**: Next.js App Router routes, API segments, and root layout.
- **src/components/layout**: Global layout components (Navbar, Footer, Providers).
- **src/components/sections**: Home page content sections (Hero, About, Products, Contact).
- **src/components/ui**: Reusable atomic UI components.
- **src/content**: Static configuration (navigation links, site metadata).
- **src/hooks**: Custom React hooks for cross-component logic.
- **src/lib**: Shared utility functions and math helpers.
- **src/styles**: Global styles and Tailwind 4 theme definitions.
- **src/test**: Vitest setup and testing utilities.

## 📜 License

This project is proprietary. Please contact N&N Poultry for licensing information.
