'use strict';

(function () {

  var DATA_LOADING_RESOURСE = 'https://js.dump.academy/keksobooking/data';
  var LEFT_BUTTON_MOUSE_UP_CODE = 0;
  var MARGIN_TOP = 65;
  var MAX_HEIGHT_AREA = 500;
  var HORIZONTAL_MARGIN = 0;
  var HALF = 0.5;
  var map = window.general.map;
  var filters = map.querySelectorAll('.map__filters>*');
  var mapPins = map.querySelector('.map__pins');
  var mainPin = map.querySelector('.map__pin--main');
  var mainPinWidthHalf = mainPin.offsetWidth / 2;
  var mainPinHeight = mainPin.offsetHeight;


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

  var setFiltersEnabled = function () {

    filters.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  var setFiltersDisabled = function () {
    filters.forEach(function (item) {
      item.setAttribute('disabled', '');
    });
  };

  var addPins = function (pinData) {
    var mapFilters = map.querySelector('.map__filters-container');
    var fragmentToAdd = window.pins.returnFragmentWithPins(pinData, map, mapFilters);
    mapPins.appendChild(fragmentToAdd);
    if (pinData) {
      setFiltersEnabled();
    }
  };

  var setDisabled = function () {
    map.classList.add('map--faded');
    setFiltersDisabled();
    window.pins.deleteAll();
  };

  var setEnabled = function () {
    map.classList.remove('map--faded');
    window.serverRequest.load(DATA_LOADING_RESOURСE, addPins, window.dialog.onError);
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
    addPins: addPins,
    addEventsWithCallback: addEventsWithCallback,
    mainPinPointer: mainPinPointer,
    setEnabled: setEnabled,
    setDisabled: setDisabled
  };

})();
