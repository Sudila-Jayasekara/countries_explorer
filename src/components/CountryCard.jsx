import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const CountryCard = ({ country }) => {
  const { user, isFavorite, addFavorite, removeFavorite } = useAuth();
  
  const handleFavoriteToggle = (e) => {
    e.preventDefault(); // Prevent navigating to detail page when clicking the favorite button
    
    if (isFavorite(country.cca3)) {
      removeFavorite(country.cca3);
    } else {
      addFavorite(country);
    }
  };

  // Format population with commas
  const formatPopulation = (population) => {
    return population.toLocaleString();
  };

  return (
    <Link to={`/country/${country.cca3}`} className="block">
      <div className="card h-full transform hover:scale-[1.02] transition-all duration-300">
        {/* Flag Image */}
        <div className="relative h-40 overflow-hidden">
          <LazyLoadImage
            src={country.flags.svg || country.flags.png}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            effect="blur"
            className="w-full h-full object-cover"
          />
          
          {/* Favorite Button (only if logged in) */}
          {user && (
            <button
              onClick={handleFavoriteToggle}
              className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-dark-800/80 rounded-full shadow-md hover:bg-white dark:hover:bg-dark-800 transition-colors duration-200"
              aria-label={isFavorite(country.cca3) ? `Remove ${country.name.common} from favorites` : `Add ${country.name.common} to favorites`}
            >
              {isFavorite(country.cca3) ? (
                <FaHeart className="text-error-500" />
              ) : (
                <FaRegHeart className="text-gray-500 dark:text-gray-400" />
              )}
            </button>
          )}
        </div>
        
        {/* Country Info */}
        <div className="p-5">
          <h3 className="text-lg font-bold mb-3 truncate">{country.name.common}</h3>
          
          <div className="space-y-1 text-sm">
            <p><span className="font-semibold">Population:</span> {formatPopulation(country.population)}</p>
            <p><span className="font-semibold">Region:</span> {country.region}</p>
            <p><span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;