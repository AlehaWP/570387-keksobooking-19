'use strict';

(function () {
  var setNotActive = function () {
    window.map.setDisabled();
    window.form.setDisabled();
    window.form.reset();
  };

  var setActive = function () {
    window.map.setEnabled();
    window.form.setEnabled();
  };

  var fillAddressByPin = function () {
    var addressField = window.general.form.querySelector('#address');
    addressField.value = window.map.mainPinPointer.x;
    addressField.value += ', ' + window.map.mainPinPointer.y;
  };

  setNotActive();
  window.serverRequest.subscribeOnSuccessPost(setNotActive);
  window.map.addEventsWithCallback(setActive, fillAddressByPin);

  window.page = {
    setActive: setActive,
    setNotActive: setNotActive
  };
})();
