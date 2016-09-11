const angular = require('angular');
import * as uiRouter from 'angular-ui-router';
import { weatherModule } from './weather';

angular.module('app', [
  uiRouter,
  weatherModule
]);

document.addEventListener('DOMContentLoaded', () => {
  angular.bootstrap(document.body, ['app']);
});
