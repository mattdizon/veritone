import { render, screen } from '@testing-library/react';
import Subtitle from '../Subtitle';

describe('Subtitle Component', () => {
  it('should render children correctly', () => {
    render(<Subtitle>Test Subtitle</Subtitle>);
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('should render as h2 by default', () => {
    const { container } = render(<Subtitle>Test</Subtitle>);
    expect(container.querySelector('h2')).toBeInTheDocument();
  });

  it('should render with custom as prop', () => {
    const { container } = render(<Subtitle as="h3">Test</Subtitle>);
    expect(container.querySelector('h3')).toBeInTheDocument();
  });

  it('should apply size prop correctly', () => {
    const { container } = render(<Subtitle size="large">Test</Subtitle>);
    const element = container.querySelector('h2');
    expect(element).toHaveStyle({ fontSize: expect.any(String) });
  });

  it('should apply fontWeight prop correctly', () => {
    const { container } = render(<Subtitle fontWeight="semibold">Test</Subtitle>);
    const element = container.querySelector('h2');
    expect(element).toHaveStyle({ fontWeight: '600' });
  });

  it('should apply secondary color by default', () => {
    const { container } = render(<Subtitle>Test</Subtitle>);
    const element = container.querySelector('h2');
    expect(element).toHaveStyle({ color: '#757575' });
  });

  it('should apply custom color prop', () => {
    const { container } = render(<Subtitle color="primary">Test</Subtitle>);
    const element = container.querySelector('h2');
    expect(element).toHaveStyle({ color: '#1976d2' });
  });
});

