import fetchAPI from './fetchAPI';

const handleCurrencies = async () => {
  const data = await fetchAPI();
  delete data.USDT;
  const currenciesArray = Object.keys(data);
  return currenciesArray;
};

export default handleCurrencies;
