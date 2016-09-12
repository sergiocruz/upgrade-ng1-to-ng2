import { Component, Input, Inject } from '@angular/core';

@Component({
  selector: 'weather-preview',
  template: `
    <div class="weather-preview" *ngIf="weather">
      <i [ngClass]="'wi ' + getIcon()"></i>
      It's {{ getTemperature() }}°F in
      <a [href]="'/#/weather/' + weather.sys.country + '/' + weather.name">{{ weather.name }}</a>
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

    return this.Weather.getIcon(this.weather);
  }

  /**
   * Formats temperature
   * @return {Number}
   */
  getTemperature(): Number {
    if (!this.weather) {
      return 0;
    }

    return parseInt(this.weather.main.temp, 10);
  }
}
