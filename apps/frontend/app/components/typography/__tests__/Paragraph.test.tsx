import { render, screen } from '@testing-library/react';
import Paragraph from '../Paragraph';

describe('Paragraph Component', () => {
  it('should render children correctly', () => {
    render(<Paragraph>Test Paragraph</Paragraph>);
    expect(screen.getByText('Test Paragraph')).toBeInTheDocument();
  });

  it('should render as p by default', () => {
    const { container } = render(<Paragraph>Test</Paragraph>);
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('should render with custom as prop', () => {
    const { container } = render(<Paragraph as="span">Test</Paragraph>);
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('should apply size prop correctly', () => {
    const { container } = render(<Paragraph size="small">Test</Paragraph>);
    const element = container.querySelector('p');
    expect(element).toHaveStyle({ fontSize: expect.any(String) });
  });

  it('should apply fontWeight prop correctly', () => {
    const { container } = render(<Paragraph fontWeight="normal">Test</Paragraph>);
    const element = container.querySelector('p');
    expect(element).toHaveStyle({ fontWeight: '400' });
  });

  it('should apply textDecoration prop correctly', () => {
    const { container } = render(<Paragraph textDecoration="line-through">Test</Paragraph>);
    const element = container.querySelector('p');
    expect(element).toHaveStyle({ textDecoration: 'line-through' });
  });

  it('should apply textAlign prop correctly', () => {
    const { container } = render(<Paragraph textAlign="right">Test</Paragraph>);
    const element = container.querySelector('p');
    expect(element).toHaveStyle({ textAlign: 'right' });
  });
});

