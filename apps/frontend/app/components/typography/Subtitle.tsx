'use client';

import { Typography, SxProps, Theme } from '@mui/material';
import { BaseTypographyProps } from './types';
import { getSizeStyles, getFontWeight, getTextColor } from './utils';

interface SubtitleProps extends BaseTypographyProps {
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  sx?: SxProps<Theme>;
}

const Subtitle = ({
  as = 'h2',
  size = 'medium',
  fontWeight = 'semibold',
  textDecoration = 'none',
  textAlign = 'left',
  color = 'secondary',
  className,
  sx,
  children,
}: SubtitleProps) => {
  const sizeStyles = getSizeStyles(size, 'subtitle');
  const weight = getFontWeight(fontWeight);
  const textColor = getTextColor(color);

  return (
    <Typography
      component={as}
      variant="subtitle1"
      className={className}
      sx={{
        fontSize: sizeStyles.fontSize,
        lineHeight: sizeStyles.lineHeight,
        fontWeight: weight,
        textDecoration,
        textAlign,
        color: textColor,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

export default Subtitle;

