const { apiKey } = require('../config/config.json');
import { weatherIcons } from './weather-icons.constant';

class Weather {

  constructor($http) {
    this.$http = $http;
  }

  getTemperature(searchQuery, countryCode = 'US') {

    const yql = `
      select * from weather.forecast
      where woeid in (
        select woeid
        from geo.places(1)
        where text="${searchQuery},${countryCode}"
      )
    `;

    return this.$http({
      method: 'GET',
      url: 'https://query.yahooapis.com/v1/public/yql',
      params: {
        q: yql,
        format: 'json',
      }
    })
    .then(({data}) => data.query.results.channel);

  }

  getIcon(condition) {
    const { code } = condition;

    if (weatherIcons[code]) {
      return `wi-${weatherIcons[code].icon}`;
    }

    return '';
  }

}

export const WeatherService = [
  '$http',
  Weather
]
