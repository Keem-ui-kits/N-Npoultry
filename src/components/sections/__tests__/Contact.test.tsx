import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Contact } from '../Contact';

describe('Contact section', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<Contact />);
    expect(screen.getByText(/Bulk & business orders/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Website \(optional\)/i)).toBeInTheDocument();
  });

  it('updates input values on change', () => {
    render(<Contact />);
    const nameInput = screen.getByLabelText(/Name \*/i);
    fireEvent.change(nameInput, { target: { value: 'John Doe', name: 'name' } });
    expect((nameInput as HTMLInputElement).value).toBe('John Doe');
  });

  it('submits the form successfully', async () => {
    const mockFetch = vi.mocked(global.fetch);
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    } as Response);

    render(<Contact />);
    
    // Fill the form
    fireEvent.change(screen.getByLabelText(/Name \*/i), { target: { value: 'John Doe', name: 'name' } });
    fireEvent.change(screen.getByLabelText(/Email \*/i), { target: { value: 'john@example.com', name: 'email' } });
    fireEvent.change(screen.getByLabelText(/Website \(optional\)/i), { target: { value: 'https://example.com', name: 'website' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello!', name: 'message' } });

    // Submit
    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    expect(screen.getByRole('button', { name: /Sending\.\.\./i })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Got it! We typically reply/i)).toBeInTheDocument();
    });

    expect(mockFetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        website: 'https://example.com',
        message: 'Hello!',
      }),
    }));
  });

  it('shows error message on submission failure', async () => {
    const mockFetch = vi.mocked(global.fetch);
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<Contact />);
    
    // Fill minimal required
    fireEvent.change(screen.getByLabelText(/Name \*/i), { target: { value: 'John Doe', name: 'name' } });
    fireEvent.change(screen.getByLabelText(/Email \*/i), { target: { value: 'john@example.com', name: 'email' } });
    fireEvent.change(screen.getByLabelText(/Website \(optional\)/i), { target: { value: 'https://example.com', name: 'website' } });

    // Submit
    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });
  });
});
