export const WeatherController = [
  '$stateParams',
  'Weather',
  WeatherCtrl
]

import { weatherIcons } from './weather-icons.constant';

function WeatherCtrl($stateParams, Weather) {

  const vm = this;
  vm.loading = true;
  vm.info = null;
  vm.hasError = false;
  vm.icon = '';

  activate();

  ////////////////////

  function activate() {

    Weather
      .getTemperature($stateParams.searchTerm, $stateParams.countryCode)
      .then((info) => {
        vm.icon = getIcon(info.weather[0]);
        vm.info = info;
        vm.loading = false;
      })
      .catch(() => {
        vm.hasError = true;
        vm.loading = false;
      });

  }

  /**
   * Gets weather icon code
   * @param  {Object} weather
   * @return {String}
   */
  function getIcon(weather) {
    const code = weather.id;
    const hour = new Date().getHours();
    const { icon } = weatherIcons[code];
    let dorn = '';

    // If we are not in the ranges mentioned above, add a day/night prefix.
    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
      dorn = (hour > 6 && hour < 20) ? 'day-' : 'night-';
    }

    return `wi-${dorn}${icon}`;
  }

}
