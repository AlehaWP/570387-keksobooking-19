'use strict';

(function () {
  var HOUSE_TYPE_MIN_PRICE = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  var RESOURСE_TO_SEND = 'https://js.dump.academy/keksobooking';

  var form = window.general.form;
  var elementsInputSelect = form.querySelectorAll('input, select, textarea, button');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');

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

  var setCapacityByRoomsNumber = function () {
    if (capacity.value !== roomNumber.value) {
      capacity.querySelector('[selected]').removeAttribute('selected');
      capacity.querySelector('[value="' + roomNumber.value + '"]').setAttribute('selected', '');
    }
  };

  roomNumber.addEventListener('change', function () {
    checkCapacityByRoomsNumber();
  });

  capacity.addEventListener('change', function () {
    checkCapacityByRoomsNumber();
  });

  var formTitle = form.querySelector('#title');
  formTitle.addEventListener('invalid', function () {
    switch (true) {
      case formTitle.validity.valueMissing:
        formTitle.setCustomValidity('Поле обязательно для заполнения');
        break;
      case formTitle.validity.tooShort:
        formTitle.setCustomValidity('Минимальная длина заголовка 30 символов');
        break;
      case formTitle.validity.toLong:
        formTitle.setCustomValidity('Максимальная длина заголовка 100 символов');
        break;
      default:
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
    price.setAttribute('placeholder', HOUSE_TYPE_MIN_PRICE[houseType.value]);
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

  var adFormHeaderPreview = document.querySelector('.ad-form-header__preview');
  var adFormField = document.querySelector('.ad-form__field input[type="file"]');
  var adFormPhoto = document.querySelector('.ad-form__photo');
  var adFormUpload = document.querySelector('.ad-form__upload input[type="file"]');

  var addImageLoad = function () {
    window.addImage.load(adFormHeaderPreview, adFormField, window.dialog.error);
    window.addImage.load(adFormPhoto, adFormUpload, window.dialog.error);
  };

  var removeImageLoad = function () {
    window.addImage.removeLoad(adFormField.id);
    window.addImage.removeLoad(adFormUpload.id);
  };

  var setEnabled = function () {
    form.classList.remove('ad-form--disabled');
    setInputStateEnabled();
    checkCapacityByRoomsNumber();
    addImageLoad();
  };

  var setInputStateDisabled = function () {
    for (var i = 0; i < elementsInputSelect.length; i++) {
      elementsInputSelect[i].setAttribute('disabled', '');
    }
  };

  var setDisabled = function () {
    form.classList.add('ad-form--disabled');
    setInputStateDisabled();
    removeImageLoad();
  };

  var formReset = function () {
    form.reset();
  };

  form.addEventListener('submit', function (evt) {
    var url = RESOURСE_TO_SEND;
    window.serverRequest.push(url, new FormData(form), window.dialog.onSuccess, window.dialog.onError);
    evt.preventDefault();
  });

  setMinPriceByType();
  setCapacityByRoomsNumber();

  window.form = {
    reset: formReset,
    setDisabled: setDisabled,
    setEnabled: setEnabled
  };
})();
