import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import CountryCard from '../components/CountryCard';
import { FaHeart, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FavoritesPage = () => {
  const { user, favoriteCountries } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Update document title
  useEffect(() => {
    document.title = 'Countries Explorer | My Favorites';
    
    return () => {
      document.title = 'Countries Explorer';
    };
  }, []);

  // Animation variants for list and items
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (!user) return null;

  return (
    <motion.div 
      className="container-custom py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="btn-outlined flex items-center gap-2 mb-6"
          aria-label="Go back"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>
        
        <div className="flex items-center gap-3 mb-2">
          <FaHeart className="text-error-500" />
          <h1 className="text-3xl font-bold">My Favorite Countries</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Your personally curated collection of countries
        </p>
      </div>

      {/* Favorites List */}
      {favoriteCountries.length === 0 ? (
        <div className="bg-gray-50 dark:bg-dark-800 rounded-lg p-8 text-center">
          <h2 className="text-xl mb-4">You haven't added any favorites yet!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Explore countries and click the heart icon to add them to your favorites.
          </p>
          <Link to="/" className="btn-primary inline-block">
            Explore Countries
          </Link>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {favoriteCountries.map((country) => (
            <motion.div key={country.cca3} variants={itemVariants}>
              <CountryCard country={country} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default FavoritesPage;