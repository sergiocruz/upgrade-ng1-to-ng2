import { weatherIcons } from './constants/weather-icons.constant';
import { weatherStub } from './constants/weather.stub.js';
import { offlineMode } from '../config/config';

class Weather {

  constructor($q, $http) {

    this.$q = $q;

    // Just in case internet doesnt work during demo :)
    this.$http = offlineMode
      ? this.fakeRequest
      : $http;
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
    .then(({data}) => {

      if (data.query && data.query.count > 0) {
        return data.query.results.channel
      }

      throw "Records not found";
    });

  }

  getIcon(condition) {
    const { code } = condition;

    if (weatherIcons[code]) {
      return `wi-${weatherIcons[code].icon}`;
    }

    return '';
  }

  fakeRequest() {
    return this.$q(function(resolve, reject) {
      resolve({
        data: weatherStub
      });
    });
  }

}

export const WeatherService = [
  '$q',
  '$http',
  Weather
]
