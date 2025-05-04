import { useState, useEffect, useCallback } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useCountries } from '../context/CountryContext';

// Custom debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useCountries();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const debouncedSearchTerm = useDebounce(localSearchTerm, 200);

  // Sync local search term with context search term
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  // Update context search term when debounced value changes
  useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchTerm]);

  // Handle search input changes
  const handleSearchChange = useCallback((e) => {
    setLocalSearchTerm(e.target.value);
  }, []);

  // Clear search input
  const handleClearSearch = useCallback(() => {
    setLocalSearchTerm('');
    setSearchTerm('');
  }, [setSearchTerm]);

  return (
    <div className="relative w-full max-w-lg">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearch className="text-gray-400 dark:text-gray-500" />
      </div>
      
      <input
        type="text"
        placeholder="Search for a country..."
        value={localSearchTerm}
        onChange={handleSearchChange}
        className="form-input pl-10 pr-10"
        aria-label="Search for a country"
      />
      
      {localSearchTerm && (
        <button
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={handleClearSearch}
          aria-label="Clear search"
        >
          <FaTimes className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;