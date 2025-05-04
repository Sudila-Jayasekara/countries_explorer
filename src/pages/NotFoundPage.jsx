import { Link } from 'react-router-dom';
import { FaGlobe, FaHome } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="container-custom py-12 flex flex-col items-center justify-center min-h-[70vh] text-center">
      <FaGlobe className="text-8xl text-primary-400 mb-6 animate-pulse-slow" />
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Page Not Found</h2>
      
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved to another location.
      </p>
      
      <Link to="/" className="btn-primary flex items-center gap-2">
        <FaHome />
        <span>Return Home</span>
      </Link>
    </div>
  );
};

export default NotFoundPage;