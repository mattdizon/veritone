'use client';

import { Box, Checkbox, IconButton, Paper } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Paragraph } from './typography';
import { ShoppingItem } from '../types/shopping-item';

interface ShoppingItemCardProps {
  item: ShoppingItem;
  onTogglePurchased: (id: string) => void;
  onEdit: (item: ShoppingItem) => void;
  onDelete: (id: string) => void;
}

const ShoppingItemCard = ({
  item,
  onTogglePurchased,
  onEdit,
  onDelete,
}: ShoppingItemCardProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: 1,
        p: 2,
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        bgcolor: 'white',
      }}
    >
      <Checkbox
        checked={item.purchased}
        onChange={() => onTogglePurchased(item.id)}
        sx={{
          color: '#1976d2',
          '&.Mui-checked': {
            color: '#1976d2',
          },
        }}
      />
      <Box sx={{ flex: 1 }}>
        <Paragraph
          textDecoration={item.purchased ? 'line-through' : 'none'}
          sx={{ 
            mb: 0.5,
            fontFamily: 'var(--font-nunito), sans-serif',
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '20px',
            letterSpacing: '0px',
            textAlign: 'center',
            color: item.purchased ? '#9e9e9e' : undefined,
          }}
        >
          {item.itemName}
        </Paragraph>
        <Paragraph
          textDecoration={item.purchased ? 'line-through' : 'none'}
          sx={{
            fontFamily: 'var(--font-nunito), sans-serif',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0px',
            textAlign: 'center',
            color: item.purchased ? '#9e9e9e' : undefined,
          }}
        >
          {item.description}
        </Paragraph>
      </Box>
      <IconButton
        onClick={() => onEdit(item)}
        size="small"
        sx={{ color: '#424242' }}
        aria-label="Edit item"
      >
        <Edit fontSize="small" />
      </IconButton>
      <IconButton
        onClick={() => onDelete(item.id)}
        size="small"
        sx={{ color: '#424242' }}
        aria-label="Delete item"
      >
        <Delete fontSize="small" />
      </IconButton>
    </Paper>
  );
};

export default ShoppingItemCard;

