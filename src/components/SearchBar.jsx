import { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useCountries } from '../context/CountryContext';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useCountries();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Update local search term when context search term changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  // Handle search input changes with debounce
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearchTerm(value);

    // Debounce search input
    const debounceTimeout = setTimeout(() => {
      setSearchTerm(value);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  };

  // Clear search input
  const handleClearSearch = () => {
    setLocalSearchTerm('');
    setSearchTerm('');
  };

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