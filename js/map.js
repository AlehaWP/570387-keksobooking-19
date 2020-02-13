'use strict';

(function () {
  var map = window.general.map;
  var filters = map.querySelector('.map__filters');
  var mainPin = map.querySelector('.map__pin--main');
  var mainPinWidthHalf = mainPin.offsetWidth / 2;
  var mainPinHeight = mainPin.offsetHeight;
  var LEFT_BUTTON_MOUSE_UP_CODE = 0;
  var MARGIN_TOP = 65;
  var MAX_HEIGHT_AREA = 500;
  var HORIZONTAL_MARGIN = 0;
  var HALF = 0.5;

  var mainPinPointer = {
    x: Math.round(mainPin.offsetLeft + mainPinWidthHalf),
    y: Math.round(mainPin.offsetTop + mainPinHeight)
  };

  var borderArea = {
    top: MARGIN_TOP,
    right: map.clientWidth - mainPin.offsetWidth * HALF,
    bottom: MARGIN_TOP + MAX_HEIGHT_AREA,
    left: HORIZONTAL_MARGIN - mainPin.offsetWidth * HALF
  };
  window.moveElement.addDragAndDrop(mainPin, mainPin, borderArea);

  var setDisabled = function () {
    filters.classList.add('map__filters--disabled');
  };

  var setEnabled = function () {
    window.general.map.classList.remove('map--faded');
    filters.classList.remove('map__filters--disabled');
  };

  var addEventsWithCallback = function (onMainPinClickCallback, onMainPinMouseUpCallback) {

    mainPin.addEventListener('mousedown', function (evt) {
      if (evt.buttons === window.general.LEFT_MOUSE_BUTTON) {
        onMainPinClickCallback();

        var onMainPinMouseUp = function () {
          if (evt.button === LEFT_BUTTON_MOUSE_UP_CODE) {
            mainPinPointer.x = Math.round(mainPin.offsetLeft + mainPinWidthHalf);
            mainPinPointer.y = Math.round(mainPin.offsetTop + mainPinHeight);
          }
          onMainPinMouseUpCallback();
          document.removeEventListener('mouseup', onMainPinMouseUp);
        };
        document.addEventListener('mouseup', onMainPinMouseUp);
      }
    });

    mainPin.addEventListener('keydown', function (evt) {
      if (evt.key === window.general.ENTER_KEY) {
        onMainPinClickCallback();
      }
    });
  };

  window.map = {
    addEventsWithCallback: addEventsWithCallback,
    mainPinPointer: mainPinPointer,
    setEnabled: setEnabled,
    setDisabled: setDisabled
  };

})();
