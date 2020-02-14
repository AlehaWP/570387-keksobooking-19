'use strict';

(function () {
  var DATA_LOADING_RESOURСE = 'https://js.dump.academy/keksobooking/data';
  var setNotActive = function () {
    window.map.setDisabled();
    window.form.setDisabled();
    window.form.reset();
  };

  var setActive = function () {
    window.map.setEnabled();
    window.form.setEnabled();
    window.serverRequest.load(DATA_LOADING_RESOURСE, window.map.addPins, window.dialog.onError);
  };

  var fillAddressByPin = function () {
    var addressField = window.general.form.querySelector('#address');
    addressField.value = window.map.mainPinPointer.x;
    addressField.value += ', ' + window.map.mainPinPointer.y;
  };

  setNotActive();
  window.form.subscribeOnSubmit(setActive);

  window.map.addEventsWithCallback(setActive, fillAddressByPin);

  window.page = {
    setActive: setActive,
    setNotActive: setNotActive
  };
})();
