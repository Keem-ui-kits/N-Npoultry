import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from '../Navbar';

describe('Navbar', () => {
  it('renders logo and desktop links', () => {
    render(<Navbar />);
    expect(screen.getByText(/N&N POULTRY/i)).toBeInTheDocument();
    expect(screen.getByText(/PALACE/i)).toBeInTheDocument();
    
    expect(screen.getAllByText(/About/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Products/i)[0]).toBeInTheDocument();
  });

  it('toggles mobile menu when hamburger is clicked', () => {
    render(<Navbar />);
    const toggleButton = screen.getByLabelText(/Toggle mobile menu/i);
    
    // Initially menu should be hidden (check aria-expanded or style)
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    
    // Click to open
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    
    // In mobile menu, we should see links (there are two sets, desktop and mobile)
    // Mobile menu links are 3xl/4xl text
    const mobileLinks = screen.getAllByRole('link', { name: /About/i });
    expect(mobileLinks.length).toBeGreaterThan(1);
    
    // Click to close
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('scrolls to top when logo is clicked', () => {
    const scrollToSpy = vi.fn();
    window.scrollTo = scrollToSpy;
    
    render(<Navbar />);
    const logo = screen.getByLabelText(/Home/i);
    fireEvent.click(logo);
    
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

});
