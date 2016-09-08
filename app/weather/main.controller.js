export const MainController = [
  'Weather',
  MainCtrl
]

function MainCtrl(Weather) {

  const vm = this;
  vm.hello = 'World';
  getTemperature();

  function getTemperature() {

    Weather.getTemperature(34734)
      .then((data) => console.log(data))

  }



}
