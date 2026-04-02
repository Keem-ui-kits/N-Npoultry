import { describe, it, expect } from 'vitest';
import { lerp, mapRange, getValueFromRanges } from './math';

describe('math utils', () => {
  describe('lerp', () => {
    it('interpolates correctly', () => {
      expect(lerp(0, 10, 0.5)).toBe(5);
      expect(lerp(0, 10, 0)).toBe(0);
      expect(lerp(0, 10, 1)).toBe(10);
      expect(lerp(10, 0, 0.2)).toBe(8);
    });
  });

  describe('mapRange', () => {
    it('maps and clamps correctly', () => {
      expect(mapRange(5, 0, 10, 0, 100)).toBe(50);
      expect(mapRange(-1, 0, 10, 0, 100)).toBe(0);
      expect(mapRange(11, 0, 10, 0, 100)).toBe(100);
      expect(mapRange(2, 2, 4, 10, 20)).toBe(10);
      expect(mapRange(4, 2, 4, 10, 20)).toBe(20);
    });
  });

  describe('getValueFromRanges', () => {
    it('returns 0 for empty or invalid ranges', () => {
      expect(getValueFromRanges(0.5, [], [])).toBe(0);
    });

    it('returns first value below range', () => {
      const ranges = [100, 200];
      const values = [10, 20];
      expect(getValueFromRanges(50, ranges, values)).toBe(10);
    });

    it('returns last value above range', () => {
      const ranges = [100, 200];
      const values = [10, 20];
      expect(getValueFromRanges(250, ranges, values)).toBe(20);
    });

    it('interpolates between ranges', () => {
      const ranges = [100, 200, 300];
      const values = [10, 20, 40];
      expect(getValueFromRanges(150, ranges, values)).toBe(15);
      expect(getValueFromRanges(250, ranges, values)).toBe(30);
    });
  });
});
