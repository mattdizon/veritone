'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Stack,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Title, Paragraph } from './typography';
import { ItemFormData } from '../types/item-form-data';
import { itemFormSchema } from '../schemas/item-form.schema';
import { FONTS } from '../theme/constants';

export type { ItemFormData };

interface ItemModalProps {
  open: boolean;
  mode: 'add' | 'edit';
  onClose: () => void;
  onSubmit: (data: ItemFormData) => void;
  initialData?: Partial<ItemFormData>;
  isLoading?: boolean;
}

const ItemModal = ({
  open,
  mode,
  onClose,
  onSubmit,
  initialData = {},
  isLoading = false,
}: ItemModalProps) => {

  const initialFormData = useMemo<ItemFormData>(() => ({
    itemName: initialData?.itemName || '',
    description: initialData?.description || '',
    quantity: initialData?.quantity || '',
    purchased: initialData?.purchased || false,
  }), [initialData?.itemName, initialData?.description, initialData?.quantity, initialData?.purchased]);

  const dialogKey = useMemo(() => {
    if (!open) return undefined;
    return `${mode}-${initialData?.itemName || 'new'}`;
  }, [open, mode, initialData?.itemName]);

  const prevDialogKeyRef = useRef<string | undefined>(undefined);
  const [formData, setFormData] = useState<ItemFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});


  useEffect(() => {
    if (open && dialogKey && dialogKey !== prevDialogKeyRef.current) {
      prevDialogKeyRef.current = dialogKey;
      setTimeout(() => {
        setFormData(initialFormData);
        setErrors({});
      }, 0);
    } else if (!open) {
      prevDialogKeyRef.current = undefined;
    }
  }, [open, dialogKey, initialFormData]);

  const handleChange = (field: keyof ItemFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: string | boolean } }
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      purchased: e.target.checked,
    }));
  };

  const handleSubmit = () => {
    const result = itemFormSchema.safeParse({
      itemName: formData.itemName,
      description: formData.description || '',
      quantity: formData.quantity,
      purchased: formData.purchased || false,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onSubmit(result.data);
  };

  const title = mode === 'add' ? 'Add an Item' : 'Edit an Item';
  const subtitle = mode === 'add' ? 'Add your new item below' : 'Edit your item below';
  const buttonText = mode === 'add' ? 'Add Task' : 'Save Item';

  return (
    <Dialog
      key={dialogKey || undefined}
      open={open}
      onClose={isLoading ? undefined : onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2,
            boxShadow: 'none',
          },
        },
      }}
    >
      <Box
        sx={{
          bgcolor: '#f5f5f5',
          px: 3,
          py: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Title
          as="h2"
          size="small"
          fontWeight="semibold"
          letterSpacing="0.25px"
          className="uppercase"
          fontFamily="dosis"
          sx={{
            lineHeight: '100%',
          }}
        >
          SHOPPING LIST
        </Title>
        <IconButton onClick={onClose} size="small" sx={{ color: '#424242' }}>
          <Close />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 4, bgcolor: 'white' }}>
        <Title
          as="h2"
          size="small"
          fontWeight="normal"
          letterSpacing="0px"
          sx={{
            mb: 1,
            fontSize: '18px',
            lineHeight: '24px',
          }}
        >
          {title}
        </Title>

        <Paragraph
          as="p"
          size="medium"
          fontWeight="normal"
          letterSpacing="0px"
          sx={{
            mb: 4,
            fontSize: '16px',
            lineHeight: '22px',
          }}
        >
          {subtitle}
        </Paragraph>

        <Stack spacing={3}>
          <TextField
            fullWidth
            placeholder="Item Name"
            value={formData.itemName}
            onChange={handleChange('itemName')}
            variant="outlined"
            error={!!errors.itemName}
            helperText={errors.itemName}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
                '& fieldset': {
                  borderColor: errors.itemName ? '#d32f2f' : '#e0e0e0',
                },
              },
            }}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Description"
            value={formData.description}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 100) {
                handleChange('description')(e);
              }
            }}
            variant="outlined"
            error={!!errors.description}
            helperText={errors.description || `${formData.description.length}/100`}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
                '& fieldset': {
                  borderColor: errors.description ? '#d32f2f' : '#e0e0e0',
                },
              },
              '& .MuiFormHelperText-root': {
                textAlign: 'right',
                color: errors.description ? '#d32f2f' : '#9e9e9e',
              },
            }}
          />

          <FormControl fullWidth error={!!errors.quantity} required>
            <InputLabel id="quantity-label" sx={{ color: errors.quantity ? '#d32f2f' : '#9e9e9e' }}>
              How many?
            </InputLabel>
            <Select
              labelId="quantity-label"
              value={formData.quantity}
              onChange={(e) => handleChange('quantity')({ target: { value: e.target.value } })}
              label="How many?"
              sx={{
                borderRadius: 1,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: errors.quantity ? '#d32f2f' : '#e0e0e0',
                },
              }}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <MenuItem key={num} value={String(num)}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {mode === 'edit' && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.purchased || false}
                  onChange={handleCheckboxChange}
                  sx={{
                    color: '#1976d2',
                    '&.Mui-checked': {
                      color: '#1976d2',
                    },
                  }}
                />
              }
              label="Purchased"
              sx={{
                color: '#424242',
              }}
            />
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            <Button
              onClick={onClose}
              disabled={isLoading}
              sx={{
                color: '#424242',
                textTransform: 'none',
                fontFamily: FONTS.nunito,
                fontWeight: 600,
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '0px',
                '&:hover': {
                  bgcolor: 'transparent',
                },
                '&:disabled': {
                  opacity: 0.5,
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={isLoading}
              sx={{
                textTransform: 'none',
                px: 3,
                fontFamily: FONTS.nunito,
                fontWeight: 600,
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '0px',
                textAlign: 'center',
              }}
            >
              {isLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={16} sx={{ color: 'white' }} />
                  {mode === 'add' ? 'Adding...' : 'Saving...'}
                </Box>
              ) : (
                buttonText
              )}
            </Button>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ItemModal;

