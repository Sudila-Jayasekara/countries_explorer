import { render, screen } from '@testing-library/react';
import CountryList from '../CountryList';
import { useCountries } from '../../context/CountryContext'; // Ensure this is the correct import
import '@testing-library/jest-dom';

// Mock the useCountries hook with vitest's vi.mock
vi.mock('../../context/CountryContext', () => ({
  useCountries: vi.fn(),
}));

describe('CountryList', () => {
  it('shows loading spinner when loading is true', () => {
    useCountries.mockReturnValue({ filteredCountries: [], loading: true, error: null });

    render(<CountryList />); // No need for AuthProvider here

  });

  it('shows "No countries found" message when filteredCountries is empty', () => {
    useCountries.mockReturnValue({ filteredCountries: [], loading: false, error: null });

    render(<CountryList />); // No need for AuthProvider here

    expect(screen.getByText('No countries found')).toBeInTheDocument();
  });
});
