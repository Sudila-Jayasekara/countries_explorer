import { createContext, useContext, useState, useEffect } from 'react';
import { fetchAllCountries, searchCountriesByName, fetchCountriesByRegion } from '../utils/api';

// Create the context
const CountryContext = createContext();

// Provide the context
export const CountryProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('');

  // Fetch all countries on initial load
  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAllCountries();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        setError('Failed to load countries. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  // Handle search and filter changes
  useEffect(() => {
    const applyFilters = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let results = [];
        
        // If we have both search and region filter
        if (searchTerm && regionFilter) {
          const searchResults = await searchCountriesByName(searchTerm);
          results = searchResults.filter(country => 
            country.region.toLowerCase() === regionFilter.toLowerCase()
          );
        }
        // If we only have search term
        else if (searchTerm) {
          results = await searchCountriesByName(searchTerm);
        }
        // If we only have region filter
        else if (regionFilter) {
          results = await fetchCountriesByRegion(regionFilter);
        }
        // If we have neither, show all countries
        else {
          results = countries;
        }
        
        setFilteredCountries(results);
      } catch (err) {
        setError('Error applying filters. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search to avoid too many API calls
    const debounceTimer = setTimeout(() => {
      applyFilters();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, regionFilter, countries]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setRegionFilter('');
    setFilteredCountries(countries);
  };

  return (
    <CountryContext.Provider
      value={{
        countries,
        filteredCountries,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        regionFilter,
        setRegionFilter,
        clearFilters,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

// Custom hook to use the country context
export const useCountries = () => {
  const context = useContext(CountryContext);
  
  if (context === undefined) {
    throw new Error('useCountries must be used within a CountryProvider');
  }
  
  return context;
};