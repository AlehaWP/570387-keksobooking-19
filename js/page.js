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
    // window.form.fillAddressByPin(mainPin);
  };

  setNotActive();
  window.map.setOnMainPinClick(activatePage);

  window.page = {
    setActive: setActive,
    setNotActive: setNotActive
  };
})();
