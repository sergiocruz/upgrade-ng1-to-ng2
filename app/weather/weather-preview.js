import { Component, Input, Inject } from '@angular/core';

@Component({
  selector: 'weather-preview',
  template: `
    <div class="weather-preview" *ngIf="weather">
      <i [ngClass]="'wi ' + getIcon()"></i>
      It's {{ getTemperature() }}°{{ weather.units.temperature }} in
      <a [href]="'/#/weather/' + weather.location.country + '/' + weather.location.city">{{ weather.location.city }}</a>
      right now.
    </div>
  `
})
export class WeatherPreview {

  @Input() weather = null;

  constructor(@Inject('Weather') private Weather){}

  /**
   * Gets current Icon
   * @return {String}
   */
  getIcon(): String {
    if (!this.weather) {
      return '';
    }

    return this.Weather.getIcon(this.weather.item.condition);
  }

  /**
   * Formats temperature
   * @return {Number}
   */
  getTemperature(): Number {
    if (!this.weather) {
      return 0;
    }

    return parseInt(this.weather.item.condition.temp, 10);
  }
}
