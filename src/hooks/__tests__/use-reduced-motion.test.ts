import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useReducedMotion } from '../use-reduced-motion';

describe('useReducedMotion', () => {
  it('detects reduced motion preference', () => {
    const mockMatchMedia = (matches: boolean) => {
      window.matchMedia = vi.fn().mockImplementation((query: string) => ({
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
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);

    mockMatchMedia(false);
    const { result: result2 } = renderHook(() => useReducedMotion());
    expect(result2.current).toBe(false);
  });
});
