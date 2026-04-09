export const PRETEXT_DEFAULTS = {
  splitType: 'chars,words' as const,
  duration: 0.8,
  ease: 'power3.out',
  stagger: { amount: 0.4, from: 'start' as const },
};

export const REVEAL_VARIANTS = {
  fadeUp: { y: '120%', opacity: 0 },
  fadeIn: { opacity: 0 },
  maskReveal: { clipPath: 'inset(0 100% 0 0)' },
} as const;

/** Parse a stat string like '10k+' into its numeric value and suffix. */
export function parseStatValue(stat: string): { value: number; suffix: string } {
  const match = stat.match(/^(\d+(?:\.\d+)?)(.*)/);
  if (!match) return { value: 0, suffix: stat };
  return { value: parseFloat(match[1] ?? '0'), suffix: match[2] ?? '' };
}
