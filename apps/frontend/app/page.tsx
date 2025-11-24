'use client';

import { useState } from 'react';
import { Button, Box, CircularProgress, Container, Snackbar, Alert } from '@mui/material';
import { Title, Paragraph } from './components/typography';
import ItemModal from './components/ItemModal';
import { ItemFormData } from './types/item-form-data';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import ShoppingItemCard from './components/ShoppingItemCard';
import EmptyState from './components/EmptyState';
import {
  useShoppingItems,
  useCreateItem,
  useUpdateItem,
  useDeleteItem,
  useTogglePurchased,
} from './hooks';
import { useModalStore } from './stores';
import { ShoppingItem } from './types/shopping-item';

const Home = () => {
  const {
    isItemModalOpen,
    isDeleteModalOpen,
    editingItem,
    itemToDelete,
    openItemModal,
    closeItemModal,
    openDeleteModal,
    closeDeleteModal,
  } = useModalStore();

  const { data: items, isLoading, error, isSuccess } = useShoppingItems();
  const createMutation = useCreateItem();
  const updateMutation = useUpdateItem();
  const deleteMutation = useDeleteItem();
  const toggleMutation = useTogglePurchased();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleAddItem = () => {
    openItemModal();
  };

  const handleSubmit = (data: ItemFormData) => {
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data }, {
        onSuccess: () => {
          closeItemModal();
          setSnackbar({
            open: true,
            message: 'Item updated successfully!',
            severity: 'success',
          });
        },
        onError: () => {
          setSnackbar({
            open: true,
            message: 'Failed to update item. Please try again.',
            severity: 'error',
          });
        },
      });
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          closeItemModal();
          setSnackbar({
            open: true,
            message: 'Item added successfully!',
            severity: 'success',
          });
        },
        onError: () => {
          setSnackbar({
            open: true,
            message: 'Failed to add item. Please try again.',
            severity: 'error',
          });
        },
      });
    }
  };

  const handleEdit = (item: ShoppingItem) => {
    openItemModal(item);
  };

  const handleTogglePurchased = (id: string) => {
    toggleMutation.mutate(id);
  };

  const handleDeleteClick = (id: string) => {
    openDeleteModal(id);
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      deleteMutation.mutate(itemToDelete, {
        onSuccess: () => {
          closeDeleteModal();
          setSnackbar({
            open: true,
            message: 'Item deleted successfully!',
            severity: 'success',
          });
        },
        onError: () => {
          setSnackbar({
            open: true,
            message: 'Failed to delete item. Please try again.',
            severity: 'error',
          });
        },
      });
    }
  };

  const isItemModalLoading = createMutation.isPending || updateMutation.isPending || false;

  return (
    <div className="min-h-screen bg-white">
      <header className="w-full py-4 px-6" style={{ background: '#4D81B7' }}>
        <Title
          as="h1"
          size="small"
          fontWeight="semibold"
          letterSpacing="0.25px"
          className="uppercase"
          sx={{ 
            color: 'white',
            lineHeight: '100%',
          }}
        >
          SHOPPING LIST
        </Title>
      </header>

      <main className="min-h-[calc(100vh-80px)] bg-white">
        <Container maxWidth="md" sx={{ py: 4 }}>
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Paragraph color="error" textAlign="center">
                Error loading items. Please try again.
              </Paragraph>
            </Box>
          )}

          {!isLoading && !error && isSuccess && items && items.length === 0 && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 200px)',
              }}
            >
              <EmptyState onButtonClick={handleAddItem} />
            </Box>
          )}

          {!isLoading && !error && items && items.length > 0 && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Title as="h2" size="large" fontWeight="semibold" color="default">
                  Your Items
                </Title>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddItem}
                  sx={{
                    textTransform: 'none',
                    px: 3,
                  }}
                >
                  Add Item
                </Button>
              </Box>

              <Box>
                {items.map((item) => (
                  <ShoppingItemCard
                    key={item.id}
                    item={item}
                    onTogglePurchased={handleTogglePurchased}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </Box>
            </>
          )}
        </Container>
      </main>

      <ItemModal
        open={isItemModalOpen}
        mode={editingItem ? 'edit' : 'add'}
        onClose={closeItemModal}
        onSubmit={handleSubmit}
        isLoading={isItemModalLoading}
        initialData={editingItem ? {
          itemName: editingItem.itemName,
          description: editingItem.description,
          quantity: editingItem.quantity,
          purchased: editingItem.purchased,
        } : undefined}
      />

      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
