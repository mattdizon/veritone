'use client';

import {
  Dialog,
  DialogContent,
  Box,
  Button,
} from '@mui/material';
import { Title, Paragraph } from './typography';

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

const DeleteConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title = 'Delete Item?',
  message = 'Are you sure you want to delete this item? This can not be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
}: DeleteConfirmationModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
      <DialogContent sx={{ p: 4, bgcolor: 'white' }}>
        <Title
          as="h2"
          size="large"
          fontWeight="semibold"
          color="default"
          sx={{ mb: 2 }}
        >
          {title}
        </Title>

        <Paragraph
          size="medium"
          color="secondary"
          sx={{ mb: 4, lineHeight: 1.6 }}
        >
          {message}
        </Paragraph>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            onClick={onClose}
            sx={{
              color: '#424242',
              textTransform: 'none',
              '&:hover': {
                bgcolor: 'transparent',
              },
            }}
          >
            {cancelText}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirm}
            sx={{
              textTransform: 'none',
              px: 3,
            }}
          >
            {confirmText}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationModal;

