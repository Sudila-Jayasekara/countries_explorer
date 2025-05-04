import { useCountries } from '../context/CountryContext';
import CountryCard from './CountryCard';
import { FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CountryList = () => {
  const { filteredCountries, loading, error } = useCountries();

  // Animation variants for list and items
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <FaSpinner className="animate-spin text-4xl text-primary-600 dark:text-primary-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error-50 dark:bg-error-900/20 text-error-900 dark:text-error-50 p-4 rounded-md text-center">
        <p>{error}</p>
      </div>
    );
  }

  if (filteredCountries.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl mb-2">No countries found</h3>
        <p className="text-gray-600 dark:text-gray-400">Try changing your search or filter criteria</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      variants={listVariants}
      initial="hidden"
      animate="visible"
    >
      {filteredCountries.map((country) => (
        <motion.div key={country.cca3} variants={itemVariants}>
          <CountryCard country={country} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CountryList;