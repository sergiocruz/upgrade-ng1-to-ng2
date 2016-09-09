export const WeatherController = [
  '$stateParams',
  'Weather',
  WeatherCtrl
]

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
        vm.icon = Weather.getIcon(info);
        vm.info = info;
        vm.loading = false;
      })
      .catch(() => {
        vm.hasError = true;
        vm.loading = false;
      });

  }

}
