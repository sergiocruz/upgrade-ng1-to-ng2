export const WeatherPreview = [
  'Weather',
  WeatherPreviewDirective,
]

function WeatherPreviewDirective(Weather) {
  return {
    restrict: 'E',
    template: `
      <div class="weather-preview" ng-if="weather">
        <i class="wi {{ Weather.getIcon(weather.item.condition) }}"></i>
        It's {{ weather.item.condition.temp }}°{{ weather.units.temperature }} in
        <span class="weather-preview-city">{{ weather.location.city }}</span>
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
