export const WeatherPreviewDirective = [
  'Weather',
  WeatherPreview,
]

function WeatherPreview(Weather) {
  return {
    restrict: 'E',
    template: `
      <div class="weather-preview" ng-if="weather">
        <i class="wi {{ Weather.getIcon(weather.item.condition) }}"></i>
        It's {{ weather.item.condition.temp | number:0 }}°{{ weather.units.temperature }} in
        <a ui-sref="weather({ countryCode: weather.location.country, searchTerm: weather.location.city })">{{ weather.location.city }}</a>
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
