import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeleteConfirmationModal from '../DeleteConfirmationModal';

describe('DeleteConfirmationModal Component', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render when closed', () => {
    render(
      <DeleteConfirmationModal
        open={false}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );

    expect(screen.queryByText('Delete Item?')).not.toBeInTheDocument();
  });

  it('should render when open', () => {
    render(
      <DeleteConfirmationModal
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );

    expect(screen.getByText('Delete Item?')).toBeInTheDocument();
    expect(screen.getByText(/Are you sure you want to delete this item/)).toBeInTheDocument();
  });

  it('should render with custom title and message', () => {
    render(
      <DeleteConfirmationModal
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title="Custom Title"
        message="Custom message"
      />
    );

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom message')).toBeInTheDocument();
  });

  it('should call onClose when cancel is clicked', async () => {
    const user = userEvent.setup();
    render(
      <DeleteConfirmationModal
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );

    const cancelButton = screen.getByText('Cancel');
    await user.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  it('should call onConfirm and onClose when delete is clicked', async () => {
    const user = userEvent.setup();
    render(
      <DeleteConfirmationModal
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );

    const deleteButton = screen.getByText('Delete');
    await user.click(deleteButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should render with custom button texts', () => {
    render(
      <DeleteConfirmationModal
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        confirmText="Yes, Delete"
        cancelText="No, Keep"
      />
    );

    expect(screen.getByText('Yes, Delete')).toBeInTheDocument();
    expect(screen.getByText('No, Keep')).toBeInTheDocument();
  });
});

