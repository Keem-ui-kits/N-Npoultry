import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import React from 'react';

class IntersectionObserverMock {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: readonly number[] = [];
  disconnect() {
    /* noop */
  }
  observe() {
    /* noop */
  }
  unobserve() {
    /* noop */
  }
  takeRecords() {
    return [];
  }
}

window.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver;
global.IntersectionObserver = window.IntersectionObserver;

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock next/image
vi.mock('next/image', () => ({
  __esModule: true,
  default: ({
    priority,
    fill,
    quality,
    loading,
    onLoadingComplete,
    unoptimized,
    ...props
  }: any) => {
     
    return React.createElement('img', {
      ...props,
      'data-priority': priority ? 'true' : undefined,
    });
  },
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
    prefetch: vi.fn(),
    replace: vi.fn(),
  }),
}));

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn(), resolvedTheme: 'light' }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock GSAP
vi.mock('gsap', () => ({
  gsap: {
    registerPlugin: vi.fn(),
    to: vi.fn(),
    fromTo: vi.fn(),
    set: vi.fn(),
    context: vi.fn(() => ({ revert: vi.fn(), add: vi.fn() })),
    timeline: vi.fn(() => ({ to: vi.fn() })),
  },
}));

vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn(),
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn(),
    refresh: vi.fn(),
  },
}));

// Mock framer-motion
vi.mock('framer-motion', () => {
  const mockComponent = (tag: string) => {
    return ({
      children,
      whileHover,
      whileTap,
      initial,
      animate,
      exit,
      variants,
      transition,
      viewport,
      ...props
    }: any) => React.createElement(tag, props, children);
  };

  return {
    motion: {
      div: mockComponent('div'),
      section: mockComponent('section'),
      form: mockComponent('form'),
      button: mockComponent('button'),
      h2: mockComponent('h2'),
      p: mockComponent('p'),
      span: mockComponent('span'),
    },
    useInView: () => true,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  };
});

// Mock global fetch
global.fetch = vi.fn();
