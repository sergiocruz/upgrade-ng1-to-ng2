import angular from 'angular';
export const weatherModule = 'app.weather';

import { WeatherService } from './weather.service.js';
import { MainController } from './main.controller.js';
import { WeatherController } from './weather.controller.js';
import { routes } from './routes';

angular.module(weatherModule, [])
  .config(routes)
  .service('Weather', WeatherService)
  .controller('MainController', MainController)
  .controller('WeatherController', WeatherController)
