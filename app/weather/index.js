import { module } from 'angular';
export const weatherModule = 'app.weather';
import { downgradeComponent, downgradeInjectable } from '@angular/upgrade/static';


import { WeatherService } from './weather.service';
import { MainController } from './main.controller';
import { WeatherController } from './weather.controller';
import { WeatherPreview } from './weather-preview';
import { routes } from './routes';

module(weatherModule, [])
  .config(routes)
  .service('Weather', downgradeInjectable(WeatherService))
  .controller('MainController', MainController)
  .controller('WeatherController', WeatherController)
  .directive('weatherPreview', downgradeComponent({
    component: WeatherPreview,
    inputs: ['weather'],
  }))
