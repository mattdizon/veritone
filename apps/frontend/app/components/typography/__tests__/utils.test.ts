import { getSizeStyles, getFontWeight, getTextColor } from '../utils';
import { TypographySize, TypographyWeight } from '../types';
import { ComponentType } from '../config';

describe('Typography Utils', () => {
  describe('getSizeStyles', () => {
    it('should return correct styles for title component', () => {
      const styles = getSizeStyles('medium', 'title');
      expect(styles).toHaveProperty('fontSize');
      expect(styles).toHaveProperty('lineHeight');
      expect(typeof styles.fontSize).toBe('string');
      expect(typeof styles.lineHeight).toBe('string');
    });

    it('should return correct styles for subtitle component', () => {
      const styles = getSizeStyles('medium', 'subtitle');
      expect(styles).toHaveProperty('fontSize');
      expect(styles).toHaveProperty('lineHeight');
    });

    it('should return correct styles for paragraph component', () => {
      const styles = getSizeStyles('medium', 'paragraph');
      expect(styles).toHaveProperty('fontSize');
      expect(styles).toHaveProperty('lineHeight');
    });

    it('should return different sizes for different component types with same size prop', () => {
      const titleStyles = getSizeStyles('medium', 'title');
      const subtitleStyles = getSizeStyles('medium', 'subtitle');
      const paragraphStyles = getSizeStyles('medium', 'paragraph');

      expect(titleStyles.fontSize).not.toBe(subtitleStyles.fontSize);
      expect(subtitleStyles.fontSize).not.toBe(paragraphStyles.fontSize);
      expect(titleStyles.fontSize).not.toBe(paragraphStyles.fontSize);
    });

    it('should handle all size variants', () => {
      const sizes: TypographySize[] = ['small', 'medium', 'large'];
      const components: ComponentType[] = ['title', 'subtitle', 'paragraph'];

      sizes.forEach((size) => {
        components.forEach((component) => {
          const styles = getSizeStyles(size, component);
          expect(styles.fontSize).toBeDefined();
          expect(styles.lineHeight).toBeDefined();
        });
      });
    });

    it('should default to medium size and paragraph component', () => {
      const styles = getSizeStyles();
      expect(styles).toHaveProperty('fontSize');
      expect(styles).toHaveProperty('lineHeight');
    });
  });

  describe('getFontWeight', () => {
    it('should return correct font weight for light', () => {
      expect(getFontWeight('light')).toBe(300);
    });

    it('should return correct font weight for normal', () => {
      expect(getFontWeight('normal')).toBe(400);
    });

    it('should return correct font weight for medium', () => {
      expect(getFontWeight('medium')).toBe(500);
    });

    it('should return correct font weight for semibold', () => {
      expect(getFontWeight('semibold')).toBe(600);
    });

    it('should return correct font weight for bold', () => {
      expect(getFontWeight('bold')).toBe(700);
    });

    it('should default to normal weight', () => {
      expect(getFontWeight()).toBe(400);
    });

    it('should handle all weight variants', () => {
      const weights: TypographyWeight[] = ['light', 'normal', 'medium', 'semibold', 'bold'];
      weights.forEach((weight) => {
        const result = getFontWeight(weight);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
      });
    });
  });

  describe('getTextColor', () => {
    it('should return correct color for primary', () => {
      expect(getTextColor('primary')).toBe('#1976d2');
    });

    it('should return correct color for secondary', () => {
      expect(getTextColor('secondary')).toBe('#757575');
    });

    it('should return correct color for error', () => {
      expect(getTextColor('error')).toBe('#d32f2f');
    });

    it('should return correct color for success', () => {
      expect(getTextColor('success')).toBe('#2e7d32');
    });

    it('should return correct color for warning', () => {
      expect(getTextColor('warning')).toBe('#ed6c02');
    });

    it('should return default color for unknown color', () => {
      expect(getTextColor('unknown')).toBe('#424242');
    });

    it('should default to default color', () => {
      expect(getTextColor()).toBe('#424242');
    });

    it('should return hex color format', () => {
      const colors = ['primary', 'secondary', 'error', 'success', 'warning', 'default'];
      colors.forEach((color) => {
        const result = getTextColor(color);
        expect(result).toMatch(/^#[0-9A-Fa-f]{6}$/);
      });
    });
  });
});

