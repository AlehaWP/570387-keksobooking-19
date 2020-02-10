'use strict';

(function () {
  var setNotActive = function () {
    window.map.setDisabled();
    window.form.setDisabled();
  };

  var setActive = function () {
    window.map.setEnabled();
    window.form.setEnabled();
  };

  var activatePage = function () {
    setActive();
  };

  var fillAddressByPin = function () {
    var addressField = window.general.form.querySelector('#address');
    addressField.value = window.map.mainPinPointer.x;
    addressField.value += ', ' + window.map.mainPinPointer.y;
  };

  setNotActive();
  window.map.subscribeOnMainPinClick(activatePage);
  window.map.subscribeOnMainPinMouseUp(fillAddressByPin);

  window.page = {
    setActive: setActive,
    setNotActive: setNotActive
  };
})();
