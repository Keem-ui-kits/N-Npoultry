export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  return outMin + ((outMax - outMin) * (value - inMin)) / (inMax - inMin);
}

export function getValueFromRanges(value: number, stops: number[], values: number[]): number {
  if (!stops.length || !values.length) return 0;
  if (value <= stops[0]!) return values[0]!;
  if (value >= stops[stops.length - 1]!) return values[values.length - 1]!;

  for (let i = 1; i < stops.length; i++) {
    if (value <= stops[i]!) {
      const p = (value - stops[i - 1]!) / (stops[i]! - stops[i - 1]!);
      return lerp(values[i - 1]!, values[i]!, p);
    }
  }

  return values[values.length - 1]!;
}
