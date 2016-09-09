export const WeatherPreviewDirective = [
  'Weather',
  WeatherPreview,
]

function WeatherPreview(Weather) {
  return {
    restrict: 'E',
    template: `
      <div class="weather-preview" ng-if="weather">
        <i class="wi {{ Weather.getIcon(weather) }}"></i>
        It's {{ weather.main.temp | number:0 }}°F in
        <a ui-sref="weather({ countryCode: weather.sys.country, searchTerm: weather.name })">{{ weather.name }}</a>
        right now.
      </div>
    `,
    scope: {
      weather: '=',
    },
    link($scope, $element) {
      $scope.Weather = Weather;
    }
  }
}
