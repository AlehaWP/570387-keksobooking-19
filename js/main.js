'use strict';

var HOUSE_TYPE_MIN_PRICE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalo': 0
};


// main.js
(function () {
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');

  window.main = {
    map: map,
    form: form
  };
})();

// pins.js
(function () {

})();

// map.js
(function () {

})();


var LOGO_WIDTH = 40;
var LOGO_HEIGHT = 40;
var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';
var LEFT_MOUSE_BUTTON = 1;

var translatedHouseName = {
  'flat': 'Kвартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец'
};

var returnFragmentFiatures = function (features, template) {
  var fragment = document.createDocumentFragment();
  var newFeature;
  for (var i = 0; i < features.length; i++) {
    newFeature = template.cloneNode(true);
    newFeature.classList.add('popup__feature--' + features[i]);
    fragment.appendChild(newFeature);
  }
  return fragment;
};

var fillCardElement = function (card, pinData) {
  var i;
  card.querySelector('.popup__title').textContent = pinData.offer.title;
  card.querySelector('.popup__text--address').textContent = pinData.offer.address;
  card.querySelector('.popup__text--price').textContent = pinData.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = translatedHouseName[pinData.offer.type];
  card.querySelector('.popup__text--capacity').textContent = pinData.offer.rooms + ' комнаты  для ' + pinData.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + pinData.offer.checkin + ', выезд до ' + pinData.offer.checkout;
  card.querySelector('.popup__description').textContent = pinData.offer.description;
  card.querySelector('.popup__avatar').src = pinData.author.avatar;

  var features = pinData.offer.features;
  var featuresList = card.querySelector('.popup__features');
  var featureElement = featuresList.querySelector('.popup__feature').cloneNode(true);
  featureElement.className = '';
  featureElement.classList.add('popup__feature');
  var featuresToAdd = returnFragmentFiatures(features, featureElement);
  featuresList.innerHTML = '';
  featuresList.appendChild(featuresToAdd);


  var photos = pinData.offer.photos;
  var photosBlock = card.querySelector('.popup__photos');
  var photoElementTemplate = photosBlock.querySelector('.popup__photo').cloneNode();
  photosBlock.innerHTML = '';
  var newPhotoElement;
  for (i = 0; i < photos.length; i++) {
    newPhotoElement = photoElementTemplate.cloneNode();
    photosBlock.appendChild(newPhotoElement);
    newPhotoElement.src = photos[i];
  }
};

var cardOpen;

var closeOpenedCard = function () {
  map.removeChild(cardOpen);
  map.removeEventListener('keydown', onCardKeyDownEsc);
  cardOpen = null;
};

var onCardKeyDownEsc = function (evt) {
  if (evt.key === ESC_KEY) {
    closeOpenedCard();
  }
};

var onPopupCloseClick = function () {
  closeOpenedCard();
};

var openPinCard = function (index) {
  if (cardOpen) {
    fillCardElement(cardOpen, pins[index]);
  } else {
    var elementToAdd = cardTemplate.cloneNode(true).content;
    fillCardElement(elementToAdd, pins[index]);
    cardOpen = elementToAdd.querySelector('.popup');
    cardOpen.querySelector('.popup__close').addEventListener('click', onPopupCloseClick);
    map.insertBefore(elementToAdd, mapFilters);
    map.addEventListener('keydown', onCardKeyDownEsc);
  }
};

var fillPinElement = function (newElement, pinData, indexNumber) {
  var pinButton = newElement.querySelector('.map__pin');
  pinButton.style = 'left: ' + (pinData.location.x - LOGO_WIDTH / 2) + 'px;top: ' + (pinData.location.y - LOGO_HEIGHT) + 'px;';

  pinButton.addEventListener('click', function () {
    openPinCard(indexNumber);
  });

  var icon = newElement.querySelector('.map__pin img');
  icon.src = pinData.author.avatar;
  icon.alt = pinData.offer.title;
};


var createFragmentWithPins = function (pins) {
  var pinTemplate = document.querySelector('#pin');
  var fragment = document.createDocumentFragment();
  var newElement;
  for (var i = 0; i < pins.length; i++) {
    newElement = pinTemplate.cloneNode(true).content;
    fillPinElement(newElement, pins[i], i);
    fragment.appendChild(newElement);
  }
  return fragment;
};

var addPinsToMap = function () {
  var target = map.querySelector('.map__pins');
  var fragmentToAdd = createFragmentWithPins(pins);
  target.appendChild(fragmentToAdd);
};

var map = document.querySelector('.map');
var pins = window.dataMockup.returnPins(map.clientWidth);
var mapFilters = map.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#card');
addPinsToMap();

var form = document.querySelector('.ad-form');
var filters = map.querySelector('.map__filters');
var elementsInputSelect = form.querySelectorAll('input, select, textarea, button');
var mainPin = map.querySelector('.map__pin--main');


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
  map.classList.remove('map--faded');
  filters.classList.remove('map__filters--disabled');
  setFormEnabled();
};

var fillAddressByPin = function (pin) {
  var addressField = form.querySelector('#address');
  addressField.value = Math.round(pin.offsetLeft + pin.offsetWidth / 2);
  addressField.value += ', ' + Math.round(pin.offsetTop + pin.offsetHeight);
};

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.buttons === LEFT_MOUSE_BUTTON) {
    setPageActive();
    fillAddressByPin(mainPin);
    checkCapacityByRoomsNumber();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
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
