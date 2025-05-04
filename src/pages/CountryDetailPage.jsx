import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchCountryByCode, fetchCountryBorders } from '../utils/api';
import { FaArrowLeft, FaHeart, FaRegHeart, FaSpinner } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const CountryDetailPage = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const { user, isFavorite, addFavorite, removeFavorite } = useAuth();
  
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCountryData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch country data
        const countryData = await fetchCountryByCode(code);
        setCountry(countryData);
        
        // Update page title
        document.title = `Countries Explorer | ${countryData.name.common}`;
        
        // Fetch border countries if any
        if (countryData.borders && countryData.borders.length > 0) {
          const borderData = await fetchCountryBorders(countryData.borders);
          setBorderCountries(borderData);
        }
      } catch (err) {
        console.error('Error fetching country data:', err);
        setError('Failed to load country information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadCountryData();
    
    // Cleanup function
    return () => {
      document.title = 'Countries Explorer';
    };
  }, [code]);

  const handleFavoriteToggle = () => {
    if (isFavorite(country.cca3)) {
      removeFavorite(country.cca3);
    } else {
      addFavorite(country);
    }
  };

  // Helper function to format population with commas
  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  // Helper function to get languages as comma-separated string
  const getLanguages = (languagesObj) => {
    if (!languagesObj) return 'N/A';
    return Object.values(languagesObj).join(', ');
  };

  // Helper function to get currencies as comma-separated string
  const getCurrencies = (currenciesObj) => {
    if (!currenciesObj) return 'N/A';
    return Object.values(currenciesObj)
      .map(currency => `${currency.name} (${currency.symbol})`)
      .join(', ');
  };

  if (loading) {
    return (
      <div className="container-custom py-8 flex justify-center items-center min-h-[60vh]">
        <FaSpinner className="animate-spin text-4xl text-primary-600 dark:text-primary-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom py-8">
        <div className="bg-error-50 dark:bg-error-900/20 text-error-900 dark:text-error-50 p-4 rounded-lg">
          <p>{error}</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 btn-primary"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (!country) return null;

  return (
    <motion.div 
      className="container-custom py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back Button */}
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="btn-outlined flex items-center gap-2"
          aria-label="Go back"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Flag Section */}
        <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
          <img 
            src={country.flags.svg || country.flags.png} 
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Country Information */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h1 className="text-3xl md:text-4xl font-bold">{country.name.common}</h1>
            
            {/* Favorite Button (only if logged in) */}
            {user && (
              <button
                onClick={handleFavoriteToggle}
                className={`btn flex items-center gap-2 ${
                  isFavorite(country.cca3) 
                    ? 'bg-error-500 hover:bg-error-600 text-white' 
                    : 'btn-outlined'
                }`}
                aria-label={isFavorite(country.cca3) ? `Remove ${country.name.common} from favorites` : `Add ${country.name.common} to favorites`}
              >
                {isFavorite(country.cca3) ? (
                  <>
                    <FaHeart />
                    <span>Remove from Favorites</span>
                  </>
                ) : (
                  <>
                    <FaRegHeart />
                    <span>Add to Favorites</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Official Name (if different from common name) */}
          {country.name.official !== country.name.common && (
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Official name: {country.name.official}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-8">
            {/* Column 1 */}
            <div className="space-y-3">
              <p><span className="font-semibold">Population:</span> {formatNumber(country.population)}</p>
              <p><span className="font-semibold">Region:</span> {country.region}</p>
              <p><span className="font-semibold">Sub Region:</span> {country.subregion || 'N/A'}</p>
              <p><span className="font-semibold">Capital:</span> {country.capital ? country.capital.join(', ') : 'N/A'}</p>
            </div>

            {/* Column 2 */}
            <div className="space-y-3">
              <p><span className="font-semibold">Top Level Domain:</span> {country.tld ? country.tld.join(', ') : 'N/A'}</p>
              <p><span className="font-semibold">Currencies:</span> {getCurrencies(country.currencies)}</p>
              <p><span className="font-semibold">Languages:</span> {getLanguages(country.languages)}</p>
              <p><span className="font-semibold">Continent:</span> {country.continents ? country.continents.join(', ') : 'N/A'}</p>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-3 mb-8">
            <p><span className="font-semibold">Area:</span> {formatNumber(country.area)} km²</p>
            {country.timezones && (
              <p><span className="font-semibold">Timezones:</span> {country.timezones.join(', ')}</p>
            )}
            {country.car && (
              <p><span className="font-semibold">Driving Side:</span> {country.car.side}</p>
            )}
          </div>

          {/* Border Countries */}
          {borderCountries.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-3">Border Countries:</h3>
              <div className="flex flex-wrap gap-3">
                {borderCountries.map((border) => (
                  <Link 
                    key={border.cca3} 
                    to={`/country/${border.cca3}`}
                    className="btn-outlined flex items-center gap-2"
                  >
                    <img 
                      src={border.flags.svg || border.flags.png} 
                      alt={`Flag of ${border.name.common}`}
                      className="w-5 h-5 rounded-sm object-cover"
                    />
                    <span>{border.name.common}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CountryDetailPage;