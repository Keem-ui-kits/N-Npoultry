import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useIsMobile } from '../use-is-mobile';

describe('useIsMobile', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initially checks mobile status', () => {
    // Current width is probably 1024 (default jsdom)
    window.innerWidth = 500;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);

    window.innerWidth = 1000;
    const { result: result2 } = renderHook(() => useIsMobile());
    expect(result2.current).toBe(false);
  });

  it('updates when window is resized', () => {
    window.innerWidth = 1000;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    // Resize to mobile
    act(() => {
      window.innerWidth = 500;
      window.dispatchEvent(new Event('resize'));
    });

    // It's debounced (100ms)
    expect(result.current).toBe(false);

    act(() => {
      vi.advanceTimersByTime(110);
    });

    expect(result.current).toBe(true);
  });
});
