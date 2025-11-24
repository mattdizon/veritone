import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShoppingItemCard from '../ShoppingItemCard';
import { ShoppingItem } from '../../types/shopping-item';

const mockItem: ShoppingItem = {
  id: '1',
  itemName: 'Test Item',
  description: 'Test Description',
  quantity: '5',
  purchased: false,
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
};

describe('ShoppingItemCard Component', () => {
  const mockOnTogglePurchased = jest.fn();
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render item name and description', () => {
    render(
      <ShoppingItemCard
        item={mockItem}
        onTogglePurchased={mockOnTogglePurchased}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('should show unchecked checkbox when item is not purchased', () => {
    render(
      <ShoppingItemCard
        item={mockItem}
        onTogglePurchased={mockOnTogglePurchased}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('should show checked checkbox when item is purchased', () => {
    const purchasedItem = { ...mockItem, purchased: true };
    render(
      <ShoppingItemCard
        item={purchasedItem}
        onTogglePurchased={mockOnTogglePurchased}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('should apply strikethrough when item is purchased', () => {
    const purchasedItem = { ...mockItem, purchased: true };
    render(
      <ShoppingItemCard
        item={purchasedItem}
        onTogglePurchased={mockOnTogglePurchased}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const itemName = screen.getByText('Test Item');
    expect(itemName).toHaveStyle({ textDecoration: 'line-through' });
  });

  it('should call onTogglePurchased when checkbox is clicked', async () => {
    const user = userEvent.setup();
    render(
      <ShoppingItemCard
        item={mockItem}
        onTogglePurchased={mockOnTogglePurchased}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(mockOnTogglePurchased).toHaveBeenCalledWith('1');
    expect(mockOnTogglePurchased).toHaveBeenCalledTimes(1);
  });

  it('should call onEdit when edit button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <ShoppingItemCard
        item={mockItem}
        onTogglePurchased={mockOnTogglePurchased}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const editButton = screen.getByLabelText('Edit item');
    await user.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockItem);
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it('should call onDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <ShoppingItemCard
        item={mockItem}
        onTogglePurchased={mockOnTogglePurchased}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByLabelText('Delete item');
    await user.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith('1');
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});

