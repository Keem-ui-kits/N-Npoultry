/**
 * Linear interpolation between two values.
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Map a value from one range to another, clamped.
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  if (value <= inMin) return outMin;
  if (value >= inMax) return outMax;
  const t = (value - inMin) / (inMax - inMin);
  return lerp(outMin, outMax, t);
}

/**
 * Get interpolated value from a series of range/value pairs.
 */
export function getValueFromRanges(progress: number, ranges: number[], values: number[]): number {
  const firstRange = ranges[0];
  const firstValue = values[0];
  if (firstRange === undefined || firstValue === undefined) return 0;
  if (progress <= firstRange) return firstValue;

  const lastRange = ranges[ranges.length - 1];
  const lastValue = values[values.length - 1];
  if (lastRange === undefined || lastValue === undefined) return firstValue;
  if (progress >= lastRange) return lastValue;

  for (let i = 0; i < ranges.length - 1; i++) {
    const min = ranges[i];
    const max = ranges[i + 1];
    const outMin = values[i];
    const outMax = values[i + 1];

    if (
      min !== undefined &&
      max !== undefined &&
      outMin !== undefined &&
      outMax !== undefined &&
      progress >= min &&
      progress <= max
    ) {
      return mapRange(progress, min, max, outMin, outMax);
    }
  }
  return firstValue;
}
