import { upgradeAdapter } from '../ng2-upgrade';

import { module } from 'angular';
export const weatherModule = 'app.weather';


import { WeatherService } from './weather.service';
import { MainController } from './main.controller';
import { WeatherController } from './weather.controller';
import { WeatherPreview } from './weather-preview';
import { routes } from './routes';

module(weatherModule, [])
  .config(routes)
  .service('Weather', WeatherService)
  .service('WeatherService', WeatherService)
  .controller('MainController', MainController)
  .controller('WeatherController', WeatherController)
  .directive('weatherPreview', upgradeAdapter.downgradeNg2Component(WeatherPreview));

upgradeAdapter.upgradeNg1Provider('Weather');
