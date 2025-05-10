import { useCountries } from '../context/CountryContext';

const FilterDropdown = () => {
  const { regionFilter, setRegionFilter } = useCountries();
  
   const regions = [
    { value: '', label: 'Filter by Region' },
    { value: 'Africa', label: 'Africa' },
    { value: 'Northern Africa', label: 'Northern Africa' },
    { value: 'Western Africa', label: 'Western Africa' },
    { value: 'Eastern Africa', label: 'Eastern Africa' },
    { value: 'Middle Africa', label: 'Middle Africa' },
    { value: 'Southern Africa', label: 'Southern Africa' },
    { value: 'Americas', label: 'Americas' },
    { value: 'Northern America', label: 'Northern America' },
    { value: 'Central America', label: 'Central America' },
    { value: 'South America', label: 'South America' },
    { value: 'Caribbean', label: 'Caribbean' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Central Asia', label: 'Central Asia' },
    { value: 'Eastern Asia', label: 'Eastern Asia' },
    { value: 'Southern Asia', label: 'Southern Asia' },
    { value: 'South-Eastern Asia', label: 'South-Eastern Asia' },
    { value: 'Western Asia', label: 'Western Asia' },
    { value: 'Europe', label: 'Europe' },
    { value: 'Northern Europe', label: 'Northern Europe' },
    { value: 'Western Europe', label: 'Western Europe' },
    { value: 'Eastern Europe', label: 'Eastern Europe' },
    { value: 'Southern Europe', label: 'Southern Europe' },
    { value: 'Oceania', label: 'Oceania' },
    { value: 'Australia and New Zealand', label: 'Australia and New Zealand' },
    { value: 'Melanesia', label: 'Melanesia' },
    { value: 'Micronesia', label: 'Micronesia' },
    { value: 'Polynesia', label: 'Polynesia' },
    { value: 'Antarctica', label: 'Antarctica' },
  ];

  const handleRegionChange = (e) => {
    setRegionFilter(e.target.value);
  };

  return (
    <div className="w-full max-w-xs">
      <select
        value={regionFilter}
        onChange={handleRegionChange}
        className="dropdown"
        aria-label="Filter countries by region"
      >
        {regions.map((region) => (
          <option key={region.value} value={region.value}>
            {region.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;