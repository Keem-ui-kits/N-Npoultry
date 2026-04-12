import { renderHook, act } from '@testing-library/react';
import type { Mock } from 'vitest';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useIsMobile } from '../use-is-mobile';

describe('useIsMobile', () => {
  let matchMediaMock: Mock;
  let listeners: Record<string, Function[]> = {};

  beforeEach(() => {
    listeners = {};
    matchMediaMock = vi.fn().mockImplementation((query) => ({
      matches: query.includes('767'),
      media: query,
      addEventListener: vi.fn((event, handler) => {
        if (!listeners[event]) listeners[event] = [];
        listeners[event].push(handler);
      }),
      removeEventListener: vi.fn((event, handler) => {
        if (listeners[event]) {
          listeners[event] = listeners[event].filter((h) => h !== handler);
        }
      }),
    }));
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initially checks mobile status', () => {
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('updates when media query changes', () => {
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);

    act(() => {
      if (listeners.change) {
        listeners.change.forEach((handler) => handler({ matches: false }));
      }
    });

    expect(result.current).toBe(false);
  });
});
