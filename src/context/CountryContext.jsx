import { createContext, useContext, useState, useEffect } from 'react';
import { fetchAllCountries, searchCountriesByName, fetchCountriesByRegion, fetchCountriesByLanguage } from '../utils/api';

const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

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

  // Handle search, region, and language filter changes
  useEffect(() => {
    const applyFilters = async () => {
      setLoading(true);
      setError(null);
      setCurrentPage(1); // Reset to first page when filters change
      
      try {
        let results = [];
        
        if (languageFilter) {
          // Start with language filter
          results = await fetchCountriesByLanguage(languageFilter);
          
          // Apply search term filter if present
          if (searchTerm) {
            results = results.filter(country =>
              country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
            );
          }
          
          // Apply region filter if present
          if (regionFilter) {
            results = results.filter(country =>
              country.region.toLowerCase() === regionFilter.toLowerCase()
            );
          }
        } else if (searchTerm && regionFilter) {
          const searchResults = await searchCountriesByName(searchTerm);
          results = searchResults.filter(country =>
            country.region.toLowerCase() === regionFilter.toLowerCase()
          );
        } else if (searchTerm) {
          results = await searchCountriesByName(searchTerm);
        } else if (regionFilter) {
          results = await fetchCountriesByRegion(regionFilter);
        } else {
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

    const debounceTimer = setTimeout(() => {
      applyFilters();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, regionFilter, languageFilter, countries]);

  // Get current countries for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setRegionFilter('');
    setLanguageFilter('');
    setCurrentPage(1);
    setFilteredCountries(countries);
  };

  return (
    <CountryContext.Provider
      value={{
        countries,
        filteredCountries: currentCountries,
        totalItems: filteredCountries.length,
        currentPage,
        setCurrentPage,
        totalPages,
        itemsPerPage,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        regionFilter,
        setRegionFilter,
        languageFilter,
        setLanguageFilter,
        clearFilters,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export const useCountries = () => {
  const context = useContext(CountryContext);
  
  if (context === undefined) {
    throw new Error('useCountries must be used within a CountryProvider');
  }
  
  return context;
};