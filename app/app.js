import angular from 'angular';

angular.module('app', [
  require('angular-ui-router')
])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  function setupRoutes($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html'
      });
}]);
