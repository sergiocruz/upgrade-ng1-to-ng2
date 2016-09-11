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

### 1 - [`1-start-here`](https://github.com/sergiocruz/upgrade-ng1-to-ng2/tree/1-start-here) branch

### 2 - [`2-typescript`](https://github.com/sergiocruz/upgrade-ng1-to-ng2/tree/2-typescript) branch

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
  1. set entry file as
1. Code
  1. Using `require('angular')` because of global dependencies _(tricking the compiler)_
  1. Changed default imports to `* as x` syntax
    1. went from `import uiRouter from 'angular-ui-router'`
    1. to `import * as uiRouter from 'angular-ui-router'`
