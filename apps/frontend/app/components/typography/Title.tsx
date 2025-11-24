'use client';

import { Typography, SxProps, Theme } from '@mui/material';
import { BaseTypographyProps } from './types';
import { getSizeStyles, getFontWeight, getTextColor, getFontFamily } from './utils';

interface TitleProps extends BaseTypographyProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  sx?: SxProps<Theme>;
}

const Title = ({
  as = 'h1',
  size = 'large',
  fontWeight = 'bold',
  textDecoration = 'none',
  textAlign = 'left',
  color = 'default',
  fontFamily = 'nunito',
  letterSpacing,
  className,
  sx,
  children,
}: TitleProps) => {
  const sizeStyles = getSizeStyles(size, 'title');
  const weight = getFontWeight(fontWeight);
  const textColor = getTextColor(color);
  const font = getFontFamily(fontFamily);

  return (
    <Typography
      component={as}
      className={className}
      sx={{
        fontSize: sizeStyles.fontSize,
        lineHeight: sizeStyles.lineHeight,
        fontWeight: weight,
        textDecoration,
        textAlign,
        color: textColor,
        fontFamily: font,
        letterSpacing,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

export default Title;

