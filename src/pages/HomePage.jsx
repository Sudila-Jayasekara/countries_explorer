import { useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import CountryList from '../components/CountryList';
import { useCountries } from '../context/CountryContext';
import { FaGlobeAmericas, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const HomePage = () => {
  const { 
    searchTerm, 
    regionFilter, 
    clearFilters, 
    loading, 
    error,
    filteredCountries
  } = useCountries();

  // Update document title
  useEffect(() => {
    document.title = 'Countries Explorer | Home';
  }, []);

  // Check if filters are applied
  const hasFilters = searchTerm || regionFilter;

  return (
    <motion.div 
      className="container-custom py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-700 dark:to-secondary-700 rounded-xl p-8 mb-10 text-white">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="text-4xl">
            <FaGlobeAmericas />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Discover Our World</h1>
            <p className="opacity-90 max-w-2xl">
              Explore detailed information about countries around the globe. Search, filter, and learn about each nation's unique characteristics.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
        <SearchBar />
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <FilterDropdown />
          
          {/* Clear Filters Button (visible only when filters are applied) */}
          {hasFilters && (
            <button 
              onClick={clearFilters}
              className="btn-outlined flex items-center justify-center gap-2"
              aria-label="Clear all filters"
            >
              <FaTimes />
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Summary (when filters are applied) */}
      {hasFilters && !loading && !error && (
        <div className="mb-6 text-gray-600 dark:text-gray-300">
          <p>
            Showing {filteredCountries.length} {filteredCountries.length === 1 ? 'country' : 'countries'}
            {searchTerm && ` matching "${searchTerm}"`}
            {regionFilter && ` in ${regionFilter}`}
          </p>
        </div>
      )}

      {/* Country Grid */}
      <CountryList />
    </motion.div>
  );
};

export default HomePage;