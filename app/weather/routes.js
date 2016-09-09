export const routes = [
  '$stateProvider',
  '$urlRouterProvider',
  setupRoutes
];

function setupRoutes($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'views/main.html',
      controller: 'MainController',
      controllerAs: 'vm',
    })
    .state('weather', {
      url: '/weather/:countryCode/:searchTerm',
      templateUrl: 'views/weather.html',
      controller: 'WeatherController',
      controllerAs: 'vm',
    });
}
