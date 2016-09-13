export const WeatherController = [
  '$stateParams',
  'Weather',
  WeatherCtrl
]

function WeatherCtrl($stateParams, Weather) {

  // Public properties
  const vm = this;
  vm.formatTime = formatTime;
  vm.getIcon = getIcon;
  vm.loading = true;
  vm.weather = null;
  vm.hasError = false;
  vm.icon = '';

  activate();

  ////////////////////

  /**
   * Execute default actions
   * @return {Void}
   */
  function activate() {

    Weather
      .getTemperature($stateParams.searchTerm, $stateParams.countryCode)
      .then((weather) => {
        vm.icon = getIcon(weather.item.condition);
        vm.weather = weather;
        vm.loading = false;
      })
      .catch(() => {
        vm.hasError = true;
        vm.loading = false;
      });

  }

  /**
   * Time comes back malformed from API sometimes, let's try to fix it
   * @param  {String} time
   * @return {String}
   */
  function formatTime(time) {
    if (typeof time === 'string') {
      return time.replace(/\:(\d)\W/, ":0$1 ")
    }

    return '';
  }

  /**
   * Gets icon from Weather service
   * @param  {Object} condition
   * @return {String}
   */
  function getIcon(condition) {
    return Weather.getIcon(condition);
  }

}
