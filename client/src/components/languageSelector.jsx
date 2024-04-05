import { useState } from 'react';
import { LANGUAGE_VERSIONS } from '../constant';
import './languageSelector.css'; // Import CSS file for styling

const LanguageSelector = ({ selectedLanguage, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleLanguageChange = (language) => {
      onSelect(language);
      setIsOpen(false);
    };

  return (
    <div className="language-selector-container">
      <div className="language-selector-header" onClick={() => setIsOpen(!isOpen)}>
        <span> {selectedLanguage}</span>
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
      </div>
      {isOpen && (
        <div className="language-options">
          {Object.entries(LANGUAGE_VERSIONS).map(([language, version]) => (
            <div key={language} className="language-option" onClick={() => handleLanguageChange(language)}>
              {language.toUpperCase()} ({version})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
