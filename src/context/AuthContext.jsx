import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize auth state from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [favoriteCountries, setFavoriteCountries] = useState(() => {
    const saved = localStorage.getItem('favoriteCountries');
    return saved ? JSON.parse(saved) : [];
  });

  // Update localStorage when user or favorites change
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('favoriteCountries', JSON.stringify(favoriteCountries));
  }, [favoriteCountries]);

  // Login function - in a real app, this would make an API call
  const login = (email, password) => {
    // Simulate authentication
    if (email && password) {
      const userData = {
        email,
        name: email.split('@')[0], // Use part of email as name
        isAuthenticated: true,
      };
      setUser(userData);
      return true;
    }
    return false;
  };

  // Register function - in a real app, this would make an API call
  const register = (email, password) => {
    // Simulate registration
    if (email && password) {
      const userData = {
        email,
        name: email.split('@')[0],
        isAuthenticated: true,
      };
      setUser(userData);
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Favorite country functions
  const addFavorite = (country) => {
    if (!user) return false;
    
    setFavoriteCountries(prev => {
      // Check if country is already a favorite
      if (prev.some(c => c.cca3 === country.cca3)) {
        return prev;
      }
      return [...prev, country];
    });
    return true;
  };

  const removeFavorite = (countryCode) => {
    if (!user) return false;
    
    setFavoriteCountries(prev => 
      prev.filter(country => country.cca3 !== countryCode)
    );
    return true;
  };

  const isFavorite = (countryCode) => {
    return favoriteCountries.some(country => country.cca3 === countryCode);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        register, 
        favoriteCountries,
        addFavorite,
        removeFavorite,
        isFavorite
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};