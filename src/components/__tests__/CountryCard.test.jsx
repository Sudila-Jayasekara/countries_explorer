import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import CountryCard from '../CountryCard';
import { useAuth } from 'src/context/AuthContext';

// Mock useAuth hook
vi.mock('../../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

// Mock LazyLoadImage
vi.mock('react-lazy-load-image-component', () => ({
  LazyLoadImage: ({ src, alt, className }) => <img src={src} alt={alt} className={className} />,
}));

describe('CountryCard', () => {
  const mockCountry = {
    cca3: 'USA',
    name: { common: 'United States' },
    flags: { svg: 'https://flagcdn.com/usa.svg', png: 'https://flagcdn.com/usa.png', alt: 'Flag of United States' },
    population: 331000000,
    region: 'Americas',
    capital: ['Washington, D.C.'],
  };

  const mockUser = { id: 'user1', name: 'Test User' };
  const mockIsFavorite = vi.fn();
  const mockAddFavorite = vi.fn();
  const mockRemoveFavorite = vi.fn();

  const renderWithMockAuth = (user = null, isFavorite = false) => {
    mockIsFavorite.mockReturnValue(isFavorite);
    useAuth.mockReturnValue({ user, isFavorite: mockIsFavorite, addFavorite: mockAddFavorite, removeFavorite: mockRemoveFavorite });
    return render(
      <MemoryRouter>
        <CountryCard country={mockCountry} />
      </MemoryRouter>
    );
  };


  test('renders flag image with correct alt text', () => {
    renderWithMockAuth();
    const flagImage = screen.getByAltText('Flag of United States');
    expect(flagImage).toBeInTheDocument();
    expect(flagImage).toHaveAttribute('src', mockCountry.flags.svg);
  });

  test('links to correct country details page', () => {
    renderWithMockAuth();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/country/USA');
  });

  test('does not show favorite button when user is not logged in', () => {
    renderWithMockAuth(null);
    expect(screen.queryByLabelText(/add .* to favorites/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/remove .* to favorites/i)).not.toBeInTheDocument();
  });

  test('shows favorite button when user is logged in', () => {
    renderWithMockAuth(mockUser, false);
    expect(screen.getByLabelText('Add United States to favorites')).toBeInTheDocument();
  });

  test('toggles favorite status when button is clicked', async () => {
    const user = userEvent.setup();
    renderWithMockAuth(mockUser, false);

    const favoriteButton = screen.getByLabelText('Add United States to favorites');
    await user.click(favoriteButton);

    expect(mockAddFavorite).toHaveBeenCalledWith(mockCountry);
    expect(mockRemoveFavorite).not.toHaveBeenCalled();

    mockAddFavorite.mockReset();
    mockRemoveFavorite.mockReset();
    renderWithMockAuth(mockUser, true);

    const removeButton = screen.getByLabelText('Remove United States from favorites');
    await user.click(removeButton);

    expect(mockRemoveFavorite).toHaveBeenCalledWith(mockCountry.cca3);
    expect(mockAddFavorite).not.toHaveBeenCalled();
  });

  test('prevents navigation when clicking favorite button', async () => {
    const user = userEvent.setup();
    renderWithMockAuth(mockUser, false);

    const favoriteButton = screen.getByLabelText('Add United States to favorites');
    await user.click(favoriteButton);

    expect(mockAddFavorite).toHaveBeenCalled();
    // Ensure the link doesn't navigate
    expect(screen.getByRole('link')).toHaveAttribute('href', '/country/USA');
  });
});
