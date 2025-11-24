import { typographyConfig } from '../config';
import { TypographySize } from '../types';
import { ComponentType } from '../config';

describe('Typography Config', () => {
  const componentTypes: ComponentType[] = ['title', 'subtitle', 'paragraph'];
  const sizes: TypographySize[] = ['small', 'medium', 'large'];

  it('should have config for all component types', () => {
    componentTypes.forEach((type) => {
      expect(typographyConfig[type]).toBeDefined();
    });
  });

  it('should have config for all sizes for each component', () => {
    componentTypes.forEach((type) => {
      sizes.forEach((size) => {
        expect(typographyConfig[type][size]).toBeDefined();
        expect(typographyConfig[type][size]).toHaveProperty('fontSize');
        expect(typographyConfig[type][size]).toHaveProperty('lineHeight');
      });
    });
  });

  it('should have fontSize and lineHeight as strings', () => {
    componentTypes.forEach((type) => {
      sizes.forEach((size) => {
        const config = typographyConfig[type][size];
        expect(typeof config.fontSize).toBe('string');
        expect(typeof config.lineHeight).toBe('string');
      });
    });
  });

  it('should have fontSize in rem units', () => {
    componentTypes.forEach((type) => {
      sizes.forEach((size) => {
        const fontSize = typographyConfig[type][size].fontSize;
        expect(fontSize).toMatch(/^\d+(\.\d+)?rem$/);
      });
    });
  });

  it('should have lineHeight in rem units', () => {
    componentTypes.forEach((type) => {
      sizes.forEach((size) => {
        const lineHeight = typographyConfig[type][size].lineHeight;
        expect(lineHeight).toMatch(/^\d+(\.\d+)?rem$/);
      });
    });
  });

  it('should have title larger than subtitle for same size', () => {
    sizes.forEach((size) => {
      const titleFontSize = parseFloat(typographyConfig.title[size].fontSize);
      const subtitleFontSize = parseFloat(typographyConfig.subtitle[size].fontSize);
      expect(titleFontSize).toBeGreaterThan(subtitleFontSize);
    });
  });

  it('should have subtitle larger than paragraph for same size', () => {
    sizes.forEach((size) => {
      const subtitleFontSize = parseFloat(typographyConfig.subtitle[size].fontSize);
      const paragraphFontSize = parseFloat(typographyConfig.paragraph[size].fontSize);
      expect(subtitleFontSize).toBeGreaterThan(paragraphFontSize);
    });
  });

  it('should have increasing sizes for each component', () => {
    componentTypes.forEach((type) => {
      const smallSize = parseFloat(typographyConfig[type].small.fontSize);
      const mediumSize = parseFloat(typographyConfig[type].medium.fontSize);
      const largeSize = parseFloat(typographyConfig[type].large.fontSize);

      expect(mediumSize).toBeGreaterThan(smallSize);
      expect(largeSize).toBeGreaterThan(mediumSize);
    });
  });
});

