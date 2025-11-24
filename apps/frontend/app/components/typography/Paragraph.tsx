'use client';

import { Typography, SxProps, Theme } from '@mui/material';
import { BaseTypographyProps } from './types';
import { getSizeStyles, getFontWeight, getTextColor, getFontFamily } from './utils';

interface ParagraphProps extends BaseTypographyProps {
  as?: 'p' | 'span' | 'div';
  sx?: SxProps<Theme>;
}

const Paragraph = ({
  as = 'p',
  size = 'medium',
  fontWeight = 'normal',
  textDecoration = 'none',
  textAlign = 'left',
  color = 'default',
  fontFamily = 'nunito',
  className,
  sx,
  children,
}: ParagraphProps) => {
  const sizeStyles = getSizeStyles(size, 'paragraph');
  const weight = getFontWeight(fontWeight);
  const textColor = getTextColor(color);
  const font = getFontFamily(fontFamily);

  return (
    <Typography
      component={as}
      variant="body1"
      className={className}
      sx={{
        fontSize: sizeStyles.fontSize,
        lineHeight: sizeStyles.lineHeight,
        fontWeight: weight,
        textDecoration,
        textAlign,
        color: textColor,
        fontFamily: font,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

export default Paragraph;

