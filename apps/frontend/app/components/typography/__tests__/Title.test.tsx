import { render, screen } from '@testing-library/react';
import Title from '../Title';

describe('Title Component', () => {
  it('should render children correctly', () => {
    render(<Title>Test Title</Title>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should render as h1 by default', () => {
    const { container } = render(<Title>Test</Title>);
    expect(container.querySelector('h1')).toBeInTheDocument();
  });

  it('should render with custom as prop', () => {
    const { container } = render(<Title as="h2">Test</Title>);
    expect(container.querySelector('h2')).toBeInTheDocument();
  });

  it('should apply size prop correctly', () => {
    const { container } = render(<Title size="small">Test</Title>);
    const element = container.querySelector('h1');
    expect(element).toHaveStyle({ fontSize: expect.any(String) });
  });

  it('should apply fontWeight prop correctly', () => {
    const { container } = render(<Title fontWeight="bold">Test</Title>);
    const element = container.querySelector('h1');
    expect(element).toHaveStyle({ fontWeight: '700' });
  });

  it('should apply color prop correctly', () => {
    const { container } = render(<Title color="primary">Test</Title>);
    const element = container.querySelector('h1');
    expect(element).toHaveStyle({ color: '#1976d2' });
  });

  it('should apply textAlign prop correctly', () => {
    const { container } = render(<Title textAlign="center">Test</Title>);
    const element = container.querySelector('h1');
    expect(element).toHaveStyle({ textAlign: 'center' });
  });

  it('should apply textDecoration prop correctly', () => {
    const { container } = render(<Title textDecoration="underline">Test</Title>);
    const element = container.querySelector('h1');
    expect(element).toHaveStyle({ textDecoration: 'underline' });
  });

  it('should apply className prop', () => {
    const { container } = render(<Title className="custom-class">Test</Title>);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('should apply sx prop', () => {
    const { container } = render(<Title sx={{ marginTop: '10px' }}>Test</Title>);
    const element = container.querySelector('h1');
    expect(element).toHaveStyle({ marginTop: '10px' });
  });
});

