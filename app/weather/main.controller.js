export const MainController = [
  '$state',
  'Weather',
  MainCtrl
]

import {countries} from './countries.constant';
import debounce from 'lodash/debounce';

function MainCtrl($state, Weather) {

  const vm = this;
  vm.searchWeather = searchWeather;
  vm.onSearchChange = debounce(onSearchChange, 600);
  vm.countries = countries;
  vm.searchCountry = 'US';
  vm.searchTerm = '';
  vm.hasError = false;
  vm.weather = null;

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

  /**
   * On search change
   * @return {Void}
   */
  function onSearchChange() {

    if (!vm.searchTerm) {
      vm.weather = null;
      return;
    }

    Weather
      .getTemperature(vm.searchTerm, vm.searchCountry)
      .then((info) => vm.weather = info);
  }


}
