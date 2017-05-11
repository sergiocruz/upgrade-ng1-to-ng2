// shims needed for Angular
import 'zone.js';
import 'reflect-metadata'

const angular = require('angular');
import * as uiRouter from 'angular-ui-router';
import { weatherModule } from './weather';
import { AppModule } from './ng-upgrade'
import { UpgradeModule } from '@angular/upgrade/static';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

angular.module('app', [
  uiRouter,
  weatherModule
]);


platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
  const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
  upgrade.bootstrap(document.body, ['app']);
});
