'use strict';

(function () {
  var map = window.general.map;
  var filters = map.querySelector('.map__filters');
  var mainPin = map.querySelector('.map__pin--main');
  var borderArea = {
    top: 130,
    right: map.clientWidth - mainPin.offsetWidth / 2,
    bottom: 630,
    left: 0 - mainPin.offsetWidth / 2
  };
  window.moveElement.addDragAndDrop(mainPin, mainPin);

  var activatePage = function () {
    window.page.setActive();
    window.form.fillAddressByPin(mainPin);
  };

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.buttons === window.general.LEFT_MOUSE_BUTTON) {
      activatePage();
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === window.general.ENTER_KEY) {
      activatePage();
    }
  });

  var setDisabled = function () {
    filters.classList.add('map__filters--disabled');
  };

  var setEnabled = function () {
    window.general.map.classList.remove('map--faded');
    filters.classList.remove('map__filters--disabled');
  };

  window.pins.addTo(map);

  window.map = {
    setEnabled: setEnabled,
    setDisabled: setDisabled
  };

})();
