'use strict';

(function () {
  var map = window.general.map;
  var setNotActive = function () {
    window.map.setDisabled();
    window.form.setDisabled();
  };

  var setActive = function () {
    window.map.setEnabled();
    window.form.setEnabled();
    addPinsToMap();
  };

  var fillAddressByPin = function () {
    var addressField = window.general.form.querySelector('#address');
    addressField.value = window.map.mainPinPointer.x;
    addressField.value += ', ' + window.map.mainPinPointer.y;
  };

  setNotActive();
  window.map.addEventsWithCallback(setActive, fillAddressByPin);

  window.page = {
    setActive: setActive,
    setNotActive: setNotActive
  };

  var addPinsToMap = function () {
    var mapFilters = map.querySelector('.map__filters-container');
    var target = map.querySelector('.map__pins');
    var fragmentToAdd = window.pins.returnFragmentWithPins(map, mapFilters);
    target.appendChild(fragmentToAdd);
  };
})();
