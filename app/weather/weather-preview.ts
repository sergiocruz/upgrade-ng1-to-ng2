import { Component, Input } from '@angular/core'
import { WeatherService } from './weather.service';

@Component({
  selector: 'weather-preview',
  template: `
    <div class="weather-preview" *ngIf="weather">
      <i [ngClass]="'wi ' + getIcon()"></i>
      It's {{ weather.item.condition.temp }}°{{ weather.units.temperature }} in
      <span class="weather-preview-city">{{ weather.location.city }}</span>
      right now.
    </div>
  `
})
export class WeatherPreview {
  @Input() weather;

  constructor(
    private Weather: WeatherService
  ) {}

  getIcon() {
    return this.Weather.getIcon(this.weather.item.condition)
  }
}

// export const WeatherPreview = [
//   'Weather',
//   WeatherPreviewDirective,
// ]

// function WeatherPreviewDirective(Weather) {
//   return {
//     restrict: 'E',
//     template: `
//       <div class="weather-preview" ng-if="weather">
//         <i class="wi {{ Weather.getIcon(weather.item.condition) }}"></i>
//         It's {{ weather.item.condition.temp }}°{{ weather.units.temperature }} in
//         <span class="weather-preview-city">{{ weather.location.city }}</span>
//         right now.
//       </div>
//     `,
//     scope: {
//       weather: '=',
//     },
//     link($scope, $element) {
//       $scope.Weather = Weather;
//     }
//   }
// }
