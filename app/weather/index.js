import angular from 'angular';
export const weatherModule = 'app.weather';

import { WeatherService } from './weather.service';
import { MainController } from './main.controller';
import { WeatherController } from './weather.controller';
import { WeatherPreviewDirective } from './weather-preview';
import { routes } from './routes';

angular.module(weatherModule, [])
  .config(routes)
  .service('Weather', WeatherService)
  .controller('MainController', MainController)
  .controller('WeatherController', WeatherController)
  .directive('weatherPreview', WeatherPreviewDirective)
