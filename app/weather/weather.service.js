const { apiKey } = require('../config/config.json');
import { weatherIcons } from './weather-icons.constant';

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

  getIcon(info) {
    const code = info.weather[0].id;
    const hour = new Date().getHours();
    let { icon } = weatherIcons[code];
    let dorn = '';

    // If we are not in the ranges mentioned above, add a day/night prefix.
    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
      dorn = (hour > 6 && hour < 20) ? 'day-' : 'night-';
    }

    return `wi-${dorn}${icon}`;
  }

}

export const WeatherService = [
  '$http',
  Weather
]
