import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize auth state from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [userFavorites, setUserFavorites] = useState(() => {
    const saved = localStorage.getItem('userFavorites');
    return saved ? JSON.parse(saved) : {};
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
    localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
  }, [userFavorites]);

  // Login function - in a real app, this would make an API call
  const login = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || {};
    const userData = storedUsers[email];

    if (userData && userData.password === password) {
      setUser({ email, name: userData.name, isAuthenticated: true });
      return true;
    }
    return false;
  };

  // Register function - in a real app, this would make an API call
  const register = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || {};

    if (!storedUsers[email]) {
      storedUsers[email] = { name: email.split('@')[0], password };
      localStorage.setItem('users', JSON.stringify(storedUsers));
      setUser({ email, name: email.split('@')[0], isAuthenticated: true });
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

    setUserFavorites((prev) => {
      const userFavs = prev[user.email] || [];
      if (userFavs.some((c) => c.cca3 === country.cca3)) return prev;

      return {
        ...prev,
        [user.email]: [...userFavs, country],
      };
    });
    return true;
  };

  const removeFavorite = (countryCode) => {
    if (!user) return false;

    setUserFavorites((prev) => {
      const userFavs = prev[user.email] || [];
      return {
        ...prev,
        [user.email]: userFavs.filter((country) => country.cca3 !== countryCode),
      };
    });
    return true;
  };

  const isFavorite = (countryCode) => {
    return (userFavorites[user.email] || []).some((country) => country.cca3 === countryCode);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        register, 
        userFavorites,
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