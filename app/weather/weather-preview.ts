import { Component, Input } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'weather-preview',
  template: `
    <div class="weather-preview" *ngIf="weather">
      <i [ngClass]="getIcon()"></i>
      It's {{ weather.item.condition.temp }}°{{ weather.units.temperature }} in
      {{ weather.location.city }}
      right now.
    </div>
  `
})
export class WeatherPreview {
  @Input() weather;

  constructor(private service: WeatherService) {}

  ngOnInit() {
    console.log('this.service', this.service)
  }

  getIcon() {
    return 'wi ' + this.service.getIcon(this.weather.item.condition)
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
//         <a ui-sref="weather({ countryCode: weather.location.country, searchTerm: weather.location.city })">{{ weather.location.city }}</a>
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
