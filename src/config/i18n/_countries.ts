import countries from 'i18n-iso-countries';
import countries_en from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(countries_en);

const countriesListObj = countries.getNames('en', { select: 'official' });
const countriesList = Object.entries(countriesListObj).map(([code, name]) => ({
  code,
  name,
}));

export default countriesList;
