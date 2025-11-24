'use client';

import { Box, Button } from '@mui/material';
import { Paragraph } from './typography';

interface EmptyStateProps {
  message?: string;
  buttonText?: string;
  onButtonClick: () => void;
}

const EmptyState = ({
  message = 'Your shopping list is empty :(',
  buttonText = 'Add your first item',
  onButtonClick,
}: EmptyStateProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 600,
        border: '1px solid #e0e0e0',
        borderRadius: 1,
        bgcolor: 'white',
        p: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 300,
        mx: 'auto',
      }}
    >
      <Paragraph
        size="large"
        fontWeight="normal"
        textAlign="center"
        letterSpacing="0px"
        sx={{ 
          mb: '16px',
          fontSize: '18px',
          lineHeight: '24px',
        }}
      >
        {message}
      </Paragraph>
      <Button
        variant="contained"
        color="primary"
        onClick={onButtonClick}
        sx={{
          width: '151px',
          height: '36px',
          borderRadius: '4px',
          padding: '8px 15px',
          textTransform: 'none',
          fontSize: '1rem',
          gap: '10px',
        }}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

export default EmptyState;

