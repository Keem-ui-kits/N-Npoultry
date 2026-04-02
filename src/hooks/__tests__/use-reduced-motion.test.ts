import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { usePrefersReducedMotion } from '../use-reduced-motion';

describe('usePrefersReducedMotion', () => {
  it('detects reduced motion preference', () => {
    const mockMatchMedia = (matches: boolean) => {
      window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));
    };

    mockMatchMedia(true);
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(true);

    mockMatchMedia(false);
    const { result: result2 } = renderHook(() => usePrefersReducedMotion());
    expect(result2.current).toBe(false);
  });
});
