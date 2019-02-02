import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { IntlProvider, addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import de from "react-intl/locale-data/de";
import lt from "react-intl/locale-data/lt";

import App from './containers/App/App';

axios.get('/locales/data.json')
  .then(function (response) {
    const localeData = response.data;
    addLocaleData([...en, ...de, ...lt]); 

    const language =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage;

    const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

    const messages =
    localeData[languageWithoutRegionCode] ||
    localeData[language] ||
    localeData.en;

    ReactDOM.render(
        <IntlProvider locale={language} messages={messages}>
            <App />
        </IntlProvider>,     
        document.getElementById('root'));
  })
  .catch(function (error) {
    console.log(error);
  });

registerServiceWorker();
