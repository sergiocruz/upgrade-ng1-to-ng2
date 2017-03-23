import 'zone.js';
import 'reflect-metadata';
import { NgModule } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule,
    HttpModule,
  ]
})
export class AppModule {
  ngDoBootstrap() {}
}
