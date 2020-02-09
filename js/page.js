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

  setNotActive();

  window.page = {
    setActive: setActive,
    setNotActive: setNotActive
  };
})();
