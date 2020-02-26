'use strict';

(function () {
  var addressField = window.general.form.querySelector('#address');

  var setNotActive = function () {
    window.map.setDisabled();
    window.form.setDisabled();
    fillAddressByPin();
  };

  var setActive = function () {
    window.map.setEnabled();
    window.form.setEnabled();
  };

  var fillAddressByPin = function () {
    addressField.value = window.map.mainPinPointer.x;
    addressField.value += ', ' + window.map.mainPinPointer.y;
  };

  setNotActive();
  window.map.addEventsWithCallback(setActive, fillAddressByPin);
  window.form.signOuterElementToReset(setNotActive);

  window.page = {
    setActive: setActive,
    setNotActive: setNotActive
  };
})();
