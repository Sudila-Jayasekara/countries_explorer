import { useCountries } from '../context/CountryContext';

const FilterDropdown = () => {
  const { regionFilter, setRegionFilter } = useCountries();
  
  const regions = [
    { value: '', label: 'Filter by Region' },
    { value: 'Africa', label: 'Africa' },
    { value: 'Americas', label: 'Americas' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Europe', label: 'Europe' },
    { value: 'Oceania', label: 'Oceania' },
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