import { useCountries } from '../context/CountryContext';

export const languages = [
  { value: '', label: 'Filter by Language' },
  { value: 'English', label: 'English' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'French', label: 'French' },
  { value: 'German', label: 'German' },
  { value: 'Chinese', label: 'Chinese' },
  { value: 'Arabic', label: 'Arabic' },
  { value: 'Hindi', label: 'Hindi' },
  { value: 'Portuguese', label: 'Portuguese' },
  { value: 'Russian', label: 'Russian' },
  { value: 'Japanese', label: 'Japanese' },
  { value: 'Korean', label: 'Korean' },
  { value: 'Italian', label: 'Italian' },
  { value: 'Dutch', label: 'Dutch' },
  { value: 'Swedish', label: 'Swedish' },
  { value: 'Turkish', label: 'Turkish' },
  { value: 'Polish', label: 'Polish' },
  { value: 'Vietnamese', label: 'Vietnamese' },
  { value: 'Thai', label: 'Thai' },
  { value: 'Greek', label: 'Greek' },
  { value: 'Hebrew', label: 'Hebrew' },
  { value: 'Bengali', label: 'Bengali' },
  { value: 'Tamil', label: 'Tamil' },
  { value: 'Urdu', label: 'Urdu' },
  { value: 'Swahili', label: 'Swahili' },
  { value: 'Ukrainian', label: 'Ukrainian' },
  { value: 'Czech', label: 'Czech' },
  { value: 'Danish', label: 'Danish' },
  { value: 'Finnish', label: 'Finnish' },
  { value: 'Norwegian', label: 'Norwegian' },
  { value: 'Hungarian', label: 'Hungarian' },
  { value: 'Indonesian', label: 'Indonesian' },
  { value: 'Malay', label: 'Malay' },
  { value: 'Romanian', label: 'Romanian' },
  { value: 'Slovak', label: 'Slovak' },
  { value: 'Bulgarian', label: 'Bulgarian' },
  { value: 'Croatian', label: 'Croatian' },
  { value: 'Serbian', label: 'Serbian' },
  { value: 'Slovenian', label: 'Slovenian' },
  { value: 'Estonian', label: 'Estonian' },
  { value: 'Latvian', label: 'Latvian' },
  { value: 'Lithuanian', label: 'Lithuanian' },
  { value: 'Persian', label: 'Persian' },
  { value: 'Amharic', label: 'Amharic' },
  { value: 'Burmese', label: 'Burmese' },
  { value: 'Khmer', label: 'Khmer' },
  { value: 'Lao', label: 'Lao' },
  { value: 'Sinhala', label: 'Sinhala' },
  { value: 'Nepali', label: 'Nepali' },
  { value: 'Dzongkha', label: 'Dzongkha' },
  { value: 'Malagasy', label: 'Malagasy' },
  { value: 'Somali', label: 'Somali' },
  { value: 'Zulu', label: 'Zulu' },
  { value: 'Xhosa', label: 'Xhosa' },
  { value: 'Afrikaans', label: 'Afrikaans' },
  { value: 'Irish', label: 'Irish' },
  { value: 'Welsh', label: 'Welsh' },
  { value: 'Icelandic', label: 'Icelandic' },
  { value: 'Maltese', label: 'Maltese' },
  { value: 'Basque', label: 'Basque' },
  { value: 'Catalan', label: 'Catalan' },
  { value: 'Galician', label: 'Galician' },
];

const LanguageFilterDropdown = () => {
  const { languageFilter, setLanguageFilter } = useCountries();

  const handleLanguageChange = (e) => {
    setLanguageFilter(e.target.value);
  };

  return (
    <div className="w-full max-w-xs">
      <select
        value={languageFilter}
        onChange={handleLanguageChange}
        className="dropdown"
        aria-label="Filter countries by language"
      >
        {languages.map((language) => (
          <option key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageFilterDropdown;