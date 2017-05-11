import 'zone.js';
import 'reflect-metadata';
import { NgModule } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { WeatherPreview } from './weather/weather-preview'
import { WeatherService } from './weather/weather.service'

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule,
    HttpModule,
  ],
  declarations: [ WeatherPreview ],
  entryComponents: [ WeatherPreview ],
  providers: [ WeatherService ],
})
export class AppModule {
  ngDoBootstrap() {}
}
