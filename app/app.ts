const angular = require('angular');
import * as uiRouter from 'angular-ui-router';
import { weatherModule } from './weather';

angular.module('app', [
  uiRouter,
  weatherModule
]);

import { upgradeAdapter } from './ng2-upgrade';
document.addEventListener('DOMContentLoaded', () => {
  upgradeAdapter.bootstrap(document.body, ['app']);
});
