export const MainController = [
  '$state',
  MainCtrl
]

import {countries} from './countries.constant';

function MainCtrl($state) {

  const vm = this;
  vm.searchWeather = searchWeather;
  vm.countries = countries;
  vm.searchCountry = 'US';
  vm.searchTerm = '';
  vm.hasError = false;

  /////////////////

  /**
   * Searches temperature
   * @return {Void}
   */
  function searchWeather() {

    if (!vm.searchCountry || !vm.searchTerm) {
      vm.hasError = true;
    }

    $state.go('weather', {
      countryCode: vm.searchCountry,
      searchTerm: vm.searchTerm,
    });
  }


}
