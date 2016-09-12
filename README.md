# Steps to upgrading to Angular 2

Maybe you've heard that it is possible to slowly upgrade an Angular 1.x application into Angular 2, but have tried to do so and there were too many steps. Maybe you've tried following [this guide](https://angular.io/docs/ts/latest/guide/upgrade.html) but they were either too long or didn't make much sense.

My goal for this repository is to give you a fully functioning Angular 1.x app that uses ES2015+ and is packagked with `gulp`, `babel` and `browserify`. Then we will go through the steps to upgrade this app piece-by-piece to Angular 2 (with TypeScript).

## Running the app

Follow these steps to run the app locally:

1. `git clone <repo url>` and `cd` into the repo directory
2. run `npm install`
3. run `npm start`

Running `npm start` should get the app running in a local webserver.

## Navigating through the branches

This project has different branches with the different upgrade steps. Be sure to run `npm install` every time you change branches as we may have brought in different dependencies depending on which step we're on.

I hope this is useful, and you all enjoy it :)

## Upgrade steps

### 1 - Start here _([see branch](https://github.com/sergiocruz/upgrade-ng1-to-ng2/tree/1-start-here))_

Go here to see the initial app working before the upgrade. These were the tools used to build this app:

- [Angular 1.5](https://angularjs.org/)
- [UI-Router](https://ui-router.github.io/ng1/)
- [Gulp](http://gulpjs.com/)
- [Browserify](http://browserify.org/)
- [Babel](https://babeljs.io/)

### 2 - TypeScript _([see branch](https://github.com/sergiocruz/upgrade-ng1-to-ng2/tree/2-typescript))_

1. TypeScript
  1. installed `typescript` and created `tsconfig.json`
  1. renamed `app/app.js` to `app/app.ts`
1. Typings
  1. installed `typings` and added needed dependencies for this project
  1. ie. `typings install dt~angular --save --global`, etc (see `typings.json`)
  1. added npm `postinstall` script to install typings every time
1. Gulp
  1. installed `tsify`
  1. replaced `bundler.transform(babelify)` with `bundler.plugin(tsify)`
  1. set entry file as `app/app.ts`
1. Code
  1. Using `require('angular')` because of global dependencies _(tricking the compiler)_
  1. Changed default imports to `* as x` syntax
    1. went from `import uiRouter from 'angular-ui-router'`
    1. to `import * as uiRouter from 'angular-ui-router'`

### 3 - Bootstrap with Angular 2 _([see branch](https://github.com/sergiocruz/upgrade-ng1-to-ng2/tree/3-angular2))_

1. Manual bootstrapping with Angular 1.x
  1. remove `ng-app` from `index.html`
  1. add manual bootstrap code
1. Install Angular 2 dependencies
  1. ng2 upgrade libraries (RC5)
  1. auxiliary libs: `reflect-metadata`, `rxjs`, `zone.js`
  1. create new `ng-upgrade.ts` file, export an instance of `new UpgradeAdapter()`
1. Bootstrap with ng2 instead of ng1
  1. in `app.ts`, swap `angular.bootstrap()` with `upgradeAdapter.bootstrap()`

### 4 - Convert Directive to Component _([see branch](https://github.com/sergiocruz/upgrade-ng1-to-ng2/tree/4-first-component))_

This is where we start applying Angular 2 principles to our application. For this exercise we will upgrade the `<weather-preview>` directive to an Angular 2 component.

1. In `weather-preview.js` declare the component's structure
  1. comment out the current directive declaration
  1. import `Component` from `@angular/core`
  1. declare `WeatherPreview` class and use the `@Component()`
  1. declare the `selector` and a temporary hello world `template`
1. In `weather/index.js`, downgrade the component to a directive
  1. import `{WeatherPreview}` class
  1. update `directive` by keeping same selector but replace declaration with `upgradeAdapter.downgradeNg2Component(WeatherPreview)`
  1. go to view and "hello world" text should be on screen
1. Finish migrating directive
  1. copy old commented out template to new component template
  1. Inject `Weather` service into component class
    1. in `weather/index.js`, call `upgradeAdapter.upgradeNg1Provider('Weather')`
    1. in the component declaration, add a `constructor(@Inject('Weather') private Weather){}`
  1. set `@Input() weather` and change template to use `[weather]` instead in `main.html`
  1. update component template syntax
    1. replace `ng-if` with `*ngIf`
    1. replace `class` with `[ngClass]='wi ' + getIcon()`
    1. replace `{{ weather.main.temp | number:0 }}` with `getTemperature()`
      1. so formatting can happen at class level
      1. there is no `number` built-in pipe at the moment
      1. if done too often, it is worth writing one
    1. replace `ui-sref=""` with simple `href`
