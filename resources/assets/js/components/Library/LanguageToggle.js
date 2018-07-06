import React from 'react';
import { withLocalize } from 'react-localize-redux';

const LanguageToggle = ({languages, activeLanguage, setActiveLanguage}) => {
  const getClass = (languageCode) => {
    return languageCode === activeLanguage.code ? 'active' : ''
  };

  return (
    <ul className="selector">
      {languages.map(lang =>
        <li key={ lang.code }>
          <a className={getClass(lang.code)} onClick={() => setActiveLanguage(lang.code)}>{ lang.name }</a>
        </li>
      )}
    </ul>
  );
};

export default withLocalize(LanguageToggle);
