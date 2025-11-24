import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmptyState from '../EmptyState';

describe('EmptyState Component', () => {
  const mockOnButtonClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with default message and button text', () => {
    render(<EmptyState onButtonClick={mockOnButtonClick} />);
    
    expect(screen.getByText('Your shopping list is empty :(')).toBeInTheDocument();
    expect(screen.getByText('Add your first item')).toBeInTheDocument();
  });

  it('should render with custom message', () => {
    render(
      <EmptyState
        message="No items found"
        onButtonClick={mockOnButtonClick}
      />
    );
    
    expect(screen.getByText('No items found')).toBeInTheDocument();
  });

  it('should render with custom button text', () => {
    render(
      <EmptyState
        buttonText="Create New Item"
        onButtonClick={mockOnButtonClick}
      />
    );
    
    expect(screen.getByText('Create New Item')).toBeInTheDocument();
  });

  it('should call onButtonClick when button is clicked', async () => {
    const user = userEvent.setup();
    render(<EmptyState onButtonClick={mockOnButtonClick} />);
    
    const button = screen.getByText('Add your first item');
    await user.click(button);
    
    expect(mockOnButtonClick).toHaveBeenCalledTimes(1);
  });
});

