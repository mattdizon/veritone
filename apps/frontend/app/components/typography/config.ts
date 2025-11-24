import { TypographySize } from './types';

export type ComponentType = 'title' | 'subtitle' | 'paragraph';

export interface TypographySizeConfig {
  fontSize: string;
  lineHeight: string;
}

export type TypographyConfig = Record<
  ComponentType,
  Record<TypographySize, TypographySizeConfig>
>;

export const typographyConfig: TypographyConfig = {
  title: {
    small: {
      fontSize: '1.125rem', // 18px
      lineHeight: '1.125rem', // 18px (100%)
    },
    medium: {
      fontSize: '1.5rem', // 24px
      lineHeight: '2rem', // 32px
    },
    large: {
      fontSize: '2rem', // 32px
      lineHeight: '2.5rem', // 40px
    },
  },
  subtitle: {
    small: {
      fontSize: '1rem', // 16px
      lineHeight: '1.5rem', // 24px
    },
    medium: {
      fontSize: '1.25rem', // 20px
      lineHeight: '1.75rem', // 28px
    },
    large: {
      fontSize: '1.5rem', // 24px
      lineHeight: '2rem', // 32px
    },
  },
  paragraph: {
    small: {
      fontSize: '0.875rem', // 14px
      lineHeight: '1.25rem', // 20px
    },
    medium: {
      fontSize: '1rem', // 16px
      lineHeight: '1.5rem', // 24px
    },
    large: {
      fontSize: '1.125rem', // 18px
      lineHeight: '1.75rem', // 28px
    },
  },
};

