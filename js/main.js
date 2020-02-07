'use strict';

var HOUSE_TYPE_MIN_PRICE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalo': 0
};

// map.js
(function () {

})();

window.pins.addPinsToMap();

var form = document.querySelector('.ad-form');
var filters = window.general.map.querySelector('.map__filters');
var elementsInputSelect = form.querySelectorAll('input, select, textarea, button');
var mainPin = window.general.map.querySelector('.map__pin--main');


var setInputStateDisabled = function () {
  for (var i = 0; i < elementsInputSelect.length; i++) {
    elementsInputSelect[i].setAttribute('disabled', '');
  }
};

var setInputStateEnabled = function () {
  for (var i = 0; i < elementsInputSelect.length; i++) {
    elementsInputSelect[i].removeAttribute('disabled');
  }
};

var setFormDisabled = function () {
  form.classList.add('ad-form--disabled');
  setInputStateDisabled();
};

var setFormEnabled = function () {
  form.classList.remove('ad-form--disabled');
  setInputStateEnabled();
};

var setPageNotActive = function () {
  filters.classList.add('map__filters--disabled');
  setFormDisabled();
};

var setPageActive = function () {
  window.general.map.classList.remove('map--faded');
  filters.classList.remove('map__filters--disabled');
  setFormEnabled();
};

var fillAddressByPin = function (pin) {
  var addressField = form.querySelector('#address');
  addressField.value = Math.round(pin.offsetLeft + pin.offsetWidth / 2);
  addressField.value += ', ' + Math.round(pin.offsetTop + pin.offsetHeight);
};

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.buttons === window.general.LEFT_MOUSE_BUTTON) {
    setPageActive();
    fillAddressByPin(mainPin);
    checkCapacityByRoomsNumber();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === window.general.ENTER_KEY) {
    setPageActive();
    fillAddressByPin(mainPin);
    checkCapacityByRoomsNumber();
  }
});

var checkCapacityByRoomsNumber = function () {
  var rooms = Number(roomNumber.value);
  var guests = Number(capacity.value);
  if (rooms < guests) {
    capacity.setCustomValidity('Количество гостей не может быть больше чем количество комнат');
  } else if (rooms === 100 && guests !== 0) {
    capacity.setCustomValidity('Указанное количество комнат не предназначено для размещения гостей. Укажите значение "не для гостей"');
  } else {
    capacity.setCustomValidity('');
  }
};

var roomNumber = form.querySelector('#room_number');
var capacity = form.querySelector('#capacity');


roomNumber.addEventListener('change', function () {
  checkCapacityByRoomsNumber();
});

capacity.addEventListener('change', function () {
  checkCapacityByRoomsNumber();
});

var formTitle = form.querySelector('#title');
formTitle.addEventListener('invalid', function () {
  if (formTitle.validity.tooShort) {
    formTitle.setCustomValidity('Минимальная длина заголовка 30 символов');
  } else if (formTitle.validity.toLong) {
    formTitle.setCustomValidity('Максимальная длина заголовка 100 символов');
  } else if (formTitle.validity.valueMissing) {
    formTitle.setCustomValidity('Поле обязательно для заполнения');
  } else {
    formTitle.setCustomValidity('');
  }
});

var timeIn = form.querySelector('#timein');
var timeOut = form.querySelector('#timeout');

var synchronizeTimeInOut = function (evt) {
  if (evt.target === timeIn) {
    timeOut.value = timeIn.value;
  }
  if (evt.target === timeOut) {
    timeIn.value = timeOut.value;
  }
};

var onTimeChange = function () {
  synchronizeTimeInOut();
};

timeIn.addEventListener('change', onTimeChange);
timeOut.addEventListener('change', onTimeChange);

var houseType = form.querySelector('#type');
var price = form.querySelector('#price');
var setMinPriceByType = function () {
  price.setAttribute('min', HOUSE_TYPE_MIN_PRICE[houseType.value]);
};

var onPriceChange = function () {
  setMinPriceByType();
};

houseType.addEventListener('change', onPriceChange);

setMinPriceByType();

setPageNotActive();
