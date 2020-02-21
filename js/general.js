'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var LEFT_MOUSE_BUTTON = 1;
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var translatedHouseName = {
    'flat': 'Kвартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  window.general = {
    ENTER_KEY: ENTER_KEY,
    ESC_KEY: ESC_KEY,
    LEFT_MOUSE_BUTTON: LEFT_MOUSE_BUTTON,
    map: map,
    form: form,
    translatedHouseName: translatedHouseName
  };
})();
