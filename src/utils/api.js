import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

// Create axios instance with configuration
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Intercept responses to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log the error or handle specific error codes
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

// Export API methods
export const fetchAllCountries = async (fields = ['name', 'population', 'region', 'capital', 'flags', 'cca3']) => {
  try {
    const response = await api.get(`/all?fields=${fields.join(',')}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchCountriesByName = async (name, fields = ['name', 'population', 'region', 'capital', 'flags', 'cca3']) => {
  try {
    const response = await api.get(`/name/${name}?fields=${fields.join(',')}`);
    return response.data;
  } catch (error) {
    // If no countries found, return empty array instead of error
    if (error.response && error.response.status === 404) {
      return [];
    }
    throw error;
  }
};

export const fetchCountriesByRegion = async (region, fields = ['name', 'population', 'region', 'capital', 'flags', 'cca3']) => {
  try {
    const response = await api.get(`/region/${region}?fields=${fields.join(',')}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCountryByCode = async (code) => {
  try {
    const response = await api.get(`/alpha/${code}`);
    return response.data[0];
  } catch (error) {
    throw error;
  }
};

export const fetchCountryBorders = async (codes) => {
  if (!codes || codes.length === 0) return [];
  
  try {
    const codesString = codes.join(',');
    const response = await api.get(`/alpha?codes=${codesString}&fields=name,flags,cca3`);
    return response.data;
  } catch (error) {
    console.error('Error fetching border countries:', error);
    return [];
  }
};

export default {
  fetchAllCountries,
  searchCountriesByName,
  fetchCountriesByRegion,
  fetchCountryByCode,
  fetchCountryBorders
};