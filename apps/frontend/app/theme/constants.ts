export const FONTS = {
  dosis: 'var(--font-dosis), sans-serif',
  nunito: 'var(--font-nunito), sans-serif',
} as const;

export type FontFamily = keyof typeof FONTS;

