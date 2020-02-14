'use strict';

(function () {
  var HOUSE_TYPE_MIN_PRICE = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  var form = window.general.form;
  var elementsInputSelect = form.querySelectorAll('input, select, textarea, button');

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

  var onTimeChange = function (evt) {
    synchronizeTimeInOut(evt);
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


  var setInputStateEnabled = function () {
    for (var i = 0; i < elementsInputSelect.length; i++) {
      elementsInputSelect[i].removeAttribute('disabled');
    }
  };

  var setEnabled = function () {
    form.classList.remove('ad-form--disabled');
    setInputStateEnabled();
    checkCapacityByRoomsNumber();
  };

  var setInputStateDisabled = function () {
    for (var i = 0; i < elementsInputSelect.length; i++) {
      elementsInputSelect[i].setAttribute('disabled', '');
    }
  };

  var setDisabled = function () {
    form.classList.add('ad-form--disabled');
    setInputStateDisabled();
  };

  setMinPriceByType();

  var formReset = function () {
    form.reset();
  };

  var onSubmitExternal;
  var subscribeOnSubmit = function (subscribe) {
    onSubmitExternal = subscribe;
  };

  form.addEventListener('submit', function (evt) {
    var url = 'https://js.dump.academy/keksobooking';
    window.serverRequest.push(url, new FormData(form), window.dialog.onSuccess, window.dialog.onError);
    if (onSubmitExternal) {
      onSubmitExternal();
    }
    evt.preventDefault();
  });

  window.form = {
    subscribeOnSubmit: subscribeOnSubmit,
    reset: formReset,
    setDisabled: setDisabled,
    setEnabled: setEnabled
  };
})();
