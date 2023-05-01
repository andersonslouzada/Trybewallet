const fetchAPI = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  return data;
};

const currenciesArray = async () => {
  const data = await fetchAPI();
  delete data.USDT;
  const currencies = Object.keys(data);
  return currencies;
};

export default currenciesArray;
