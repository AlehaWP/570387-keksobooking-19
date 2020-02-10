'use strict';

(function () {
  var map = window.general.map;
  var filters = map.querySelector('.map__filters');
  var mainPin = map.querySelector('.map__pin--main');
  var mainPinWidthHalf = mainPin.offsetWidth / 2;
  var mainPinHeight = mainPin.offsetHeight;
  var onMainPinClick = function () {};
  var LEFT_BUTTON_MOUSE_UP_CODE = 0;
  var mainPinPointer = {
    x: Math.round(mainPin.offsetLeft + mainPinWidthHalf),
    y: Math.round(mainPin.offsetTop + mainPinHeight)
  };

  var borderArea = {
    top: 130,
    right: map.clientWidth - mainPin.offsetWidth / 2,
    bottom: 630,
    left: 0 - mainPin.offsetWidth / 2
  };
  window.moveElement.addDragAndDrop(mainPin, mainPin, borderArea);

  // var fillAddressByPin = function (pin) {
  //   var addressField = form.querySelector('#address');
  //   addressField.value = Math.round(pin.offsetLeft + pin.offsetWidth / 2);
  //   addressField.value += ', ' + Math.round(pin.offsetTop + pin.offsetHeight);
  // };

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.buttons === window.general.LEFT_MOUSE_BUTTON) {
      onMainPinClick();
      document.addEventListener('mouseup', onMouseUp);
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === window.general.ENTER_KEY) {
      onMainPinClick();
    }
  });

  var onMouseUp = function (evt) {
    if (evt.button === LEFT_BUTTON_MOUSE_UP_CODE) {
      mainPinPointer = {
        x: Math.round(mainPin.offsetLeft + mainPinWidthHalf),
        y: Math.round(mainPin.offsetTop + mainPinHeight)
      };
      document.removeEventListener('mouseup', onMouseUp);
    }
  };

  var setDisabled = function () {
    filters.classList.add('map__filters--disabled');
  };

  var setEnabled = function () {
    window.general.map.classList.remove('map--faded');
    filters.classList.remove('map__filters--disabled');
  };

  window.pins.addTo(map);

  var setOnMainPinClick = function (callback) {
    onMainPinClick = callback;
  };

  window.map = {
    mainPinPointer: mainPinPointer,
    setOnMainPinClick: setOnMainPinClick,
    setEnabled: setEnabled,
    setDisabled: setDisabled
  };

})();
