'use strict';

(function () {
  var setPageNotActive = function () {
    window.map.setMapDisabled();
    window.form.setFormDisabled();
  };

  var setPageActive = function () {
    window.map.setMapEnabled();
    window.form.setFormEnabled();
  };

  setPageNotActive();

  window.page = {
    setPageActive: setPageActive,
    setPageNotActive: setPageNotActive
  };
})();
