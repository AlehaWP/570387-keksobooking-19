'use strict';

(function () {
  var map = window.general.map;

  var templateError = document.querySelector('#error').content;
  var setNotActive = function () {
    window.map.setDisabled();
    window.form.setDisabled();
  };

  var setActive = function () {
    window.map.setEnabled();
    window.form.setEnabled();
    window.upload.load('https://js.dump.academy/keksobooking/data', addPinsToMap, onError);
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

  var onError = function (message, tryAgain) {
    var errorMessage = templateError.cloneNode(true);
    errorMessage.querySelector('.error__message').textContent = message;
    var button = errorMessage.querySelector('.error__button');
    var firstElement = document.body.firstChild;
    if (!tryAgain) {
      button.textContent = 'Закрыть';
    }
    button.addEventListener('click', function () {
      if (tryAgain) {
        tryAgain();
      }
      document.body.removeChild(button.parentElement);
    });
    document.body.insertBefore(errorMessage, firstElement);
  };

  var addPinsToMap = function (pinData) {
    var mapFilters = map.querySelector('.map__filters-container');
    var target = map.querySelector('.map__pins');
    var fragmentToAdd = window.pins.returnFragmentWithPins(pinData, map, mapFilters);
    target.appendChild(fragmentToAdd);
  };
})();
