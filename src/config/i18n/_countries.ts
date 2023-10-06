import countries from 'i18n-iso-countries';
import countries_en from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(countries_en);

const countriesListObj = countries.getNames('en', { select: 'official' });
const countriesList = Object.entries(countriesListObj).map(([code, name]) => ({
  code,
  name,
}));

countriesList.sort(({ name: nameA }, { name: nameB }) => {
  const normalizedA = nameA.toUpperCase();
  const normalizedB = nameB.toUpperCase();
  if (normalizedA < normalizedB) {
    return -1;
  }

  if (normalizedA > normalizedB) {
    return 1;
  }

  return 0;
});

export default countriesList;
