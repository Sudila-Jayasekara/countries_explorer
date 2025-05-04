import { Link } from 'react-router-dom';
import { FaMoon, FaSun, FaGlobe, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-dark-800 shadow-md transition-colors duration-200">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xl font-bold text-primary-700 dark:text-primary-400 transition-colors duration-200"
          >
            <FaGlobe className="text-2xl" />
            <span className="hidden sm:inline">Countries Explorer</span>
            <span className="sm:hidden">Explorer</span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors duration-200"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-dark-800" />
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button 
                  onClick={toggleMenu}
                  className="flex items-center gap-2 btn-outlined"
                >
                  <FaUser className="text-primary-600 dark:text-primary-400" />
                  <span className="hidden sm:inline">{user.name}</span>
                </button>

                {/* Dropdown Menu */}
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-800 rounded-md shadow-lg py-1 z-50 animate-fade-in">
                    <Link 
                      to="/favorites" 
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700"
                      onClick={() => setShowMenu(false)}
                    >
                      My Favorites
                    </Link>
                    <button 
                      onClick={() => {
                        logout();
                        setShowMenu(false);
                      }}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700"
                    >
                      <div className="flex items-center gap-2">
                        <FaSignOutAlt className="text-error-500" />
                        Sign Out
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn-primary flex items-center gap-2">
                <FaUser />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;