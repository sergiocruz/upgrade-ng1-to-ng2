import angular from 'angular';
import uiRouter from 'angular-ui-router'
import { weatherModule } from './weather';

angular.module('app', [
  uiRouter,
  weatherModule
])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  function setupRoutes($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainController',
        controllerAs: 'vm',
      });
}]);
