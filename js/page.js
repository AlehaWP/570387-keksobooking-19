'use strict';

(function () {
  var RESOURСE = 'https://js.dump.academy/keksobooking/data';
  var setNotActive = function () {
    window.map.setDisabled();
    window.form.setDisabled();
  };

  var setActive = function () {
    window.map.setEnabled();
    window.form.setEnabled();
    window.serverRequest.load(RESOURСE, window.map.addPinsToMap, window.dialog.onError);
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
})();
