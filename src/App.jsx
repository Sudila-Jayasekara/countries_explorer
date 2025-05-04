import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { ThemeProvider } from './context/ThemeContext';
import { CountryProvider } from './context/CountryContext';
import { AuthProvider } from './context/AuthContext';
import { FaSpinner } from 'react-icons/fa';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const CountryDetailPage = lazy(() => import('./pages/CountryDetailPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const LoginPage = lazy(() => import('./components/Login'));
const RegisterPage = lazy(() => import('./components/Register'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <FaSpinner className="animate-spin text-4xl text-primary-600 dark:text-primary-400" />
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CountryProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/country/:code" element={<CountryDetailPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </main>
              <footer className="bg-white dark:bg-dark-800 py-6 border-t border-gray-200 dark:border-dark-700">
                <div className="container-custom text-center text-sm text-gray-600 dark:text-gray-400">
                  <p>© 2025 Countries Explorer. All rights reserved.</p>
                  <p className="mt-1">Data provided by REST Countries API</p>
                </div>
              </footer>
            </div>
          </Router>
        </CountryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;