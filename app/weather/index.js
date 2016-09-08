import angular from 'angular';
export const weatherModule = 'app.weather';

import { WeatherService } from './weather.service.js';
import { MainController } from './main.controller.js';

angular.module(weatherModule, [])
  .service('Weather', WeatherService)
  .controller('MainController', MainController)
