const { apiKey } = require('../config/config.json');

class Weather {

  constructor($http) {
    this.$http = $http;
  }

  getTemperature(searchQuery, countryCode = 'US') {

    const q = `${searchQuery},${countryCode}`;

    return this.$http({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather',
      params: {
        units: 'imperial', // degrees in fahrenheit
        APPID: apiKey, // apiKey from `config.json`
        q, // query string
      }
    })
    .then(({ data }) => data);

  }

}

export const WeatherService = [
  '$http',
  Weather
]
