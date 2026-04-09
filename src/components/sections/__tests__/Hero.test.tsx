import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Hero } from '@/components/sections/Hero';

describe('Hero section', () => {
  it('renders the hero heading', () => {
    render(<Hero />);
    expect(screen.getByText(/Farm-Fresh/i)).toBeInTheDocument();
  });
});
