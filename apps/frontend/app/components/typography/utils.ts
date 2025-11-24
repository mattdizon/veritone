import { TypographySize, TypographyWeight } from './types';
import { typographyConfig, ComponentType } from './config';

export type { ComponentType } from './config';

export const getSizeStyles = (
  size: TypographySize = 'medium',
  componentType: ComponentType = 'paragraph'
): { fontSize: string; lineHeight: string } => {
  return typographyConfig[componentType][size];
};

export const getFontWeight = (weight: TypographyWeight = 'normal') => {
  const weightMap: Record<TypographyWeight, number> = {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  };
  return weightMap[weight];
};

export const getTextColor = (color: string = 'default') => {
  const colorMap: Record<string, string> = {
    primary: '#1976d2',
    secondary: '#757575',
    error: '#d32f2f',
    success: '#2e7d32',
    warning: '#ed6c02',
    default: '#424242',
  };
  return colorMap[color] || colorMap.default;
};

