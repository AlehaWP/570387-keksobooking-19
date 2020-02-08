'use strict';

(function () {
  var map = window.general.map;
  var filters = map.querySelector('.map__filters');
  var mainPin = map.querySelector('.map__pin--main');
  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.buttons === window.general.LEFT_MOUSE_BUTTON) {
      window.page.setPageActive();
      window.form.fillAddressByPin(mainPin);
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === window.general.ENTER_KEY) {
      window.page.setPageActive();
      window.form.fillAddressByPin(mainPin);
    }
  });

  var setMapDisabled = function () {
    filters.classList.add('map__filters--disabled');
  };

  var setMapEnabled = function () {
    window.general.map.classList.remove('map--faded');
    filters.classList.remove('map__filters--disabled');
  };

  window.pins.addPinsToMap();

  window.map = {
    setMapEnabled: setMapEnabled,
    setMapDisabled: setMapDisabled
  };

})();
