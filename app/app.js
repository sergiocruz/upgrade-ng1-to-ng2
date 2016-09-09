import angular from 'angular';
import uiRouter from 'angular-ui-router'
import { weatherModule } from './weather';

angular.module('app', [
  uiRouter,
  weatherModule
]);
