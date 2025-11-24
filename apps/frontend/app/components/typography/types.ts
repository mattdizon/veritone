export type TypographySize = 'small' | 'medium' | 'large';
export type TypographyWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
export type TextDecoration = 'none' | 'underline' | 'line-through';
export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type TextColor = 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'default';
export type FontFamily = 'dosis' | 'nunito';

export interface BaseTypographyProps {
  size?: TypographySize;
  fontWeight?: TypographyWeight;
  textDecoration?: TextDecoration;
  textAlign?: TextAlign;
  color?: TextColor;
  fontFamily?: FontFamily;
  letterSpacing?: string | number;
  className?: string;
  children: React.ReactNode;
}

