'use strict';

var MockupDictionary = {
  AVATARS: ['01', '02', '03', '04', '05', '06', '07', '08'],
  TITLES: ['Уютное местечко', 'Тихая квартирка', 'Семейный отдых', 'Аренда помещения',
    'Хостел', 'Апартаменты', 'Квартира ждет арендатаров', 'Длительное размещение'],
  TYPES: ['palace', 'flat', 'house', 'bungalo'],
  CHECKIN: ['12:00', '13:00', '14:00'],
  CHECKOUT: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  DESCRIPTIONS: ['Описание 1', 'Описание 2', 'Описание 3', 'Описание 4'],
  PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
};

var QUANTITY = 8;
var LOGO_WIDTH = 40;
var LOGO_HEIGHT = 40;
var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';

var returnRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var returnRandomNumber = function (maxNum) {
  return Math.floor(Math.random() * maxNum);
};

var returnSomeElements = function (arr) {
  var resultArr = arr.slice();
  var elementsQuantity = returnRandomNumber(resultArr.length) + 1;
  while (elementsQuantity < resultArr.length) {
    resultArr.splice(returnRandomNumber(resultArr.length), 1);
  }
  return resultArr;
};

var createPin = function (avatars, mapWidth) {
  var roomsQuantity = returnRandomNumber(4) + 1;
  var guestsQuantity = roomsQuantity * 2;
  return {
    'author': {
      'avatar': 'img/avatars/user' + avatars.splice(returnRandomNumber(avatars.length), 1) + '.png'
    },
    'offer': {
      'title': returnRandomElement(MockupDictionary.TITLES),
      'address': returnRandomNumber(1000) + ',' + returnRandomNumber(1000),
      'price': returnRandomNumber(3000) + 2000,
      'type': returnRandomElement(MockupDictionary.TYPES),
      'rooms': roomsQuantity,
      'guests': guestsQuantity,
      'checkin': returnRandomElement(MockupDictionary.CHECKIN),
      'checkout': returnRandomElement(MockupDictionary.CHECKOUT),
      'features': returnSomeElements(MockupDictionary.FEATURES),
      'description': returnRandomElement(MockupDictionary.DESCRIPTIONS),
      'photos': returnSomeElements(MockupDictionary.PHOTOS)
    },
    'location': {
      'x': returnRandomNumber(mapWidth),
      'y': returnRandomNumber(500) + 130
    }
  };
};

var createPins = function (quantity, mapWidth) {
  var resultArr = [];
  var tempAvatars = MockupDictionary.AVATARS.slice();
  for (var i = 0; i < quantity; i++) {
    resultArr[i] = createPin(tempAvatars, mapWidth);
  }
  return resultArr;
};

var cardDisplayedIndex = -1;


var closeOpenedCard = function () {
  if (cardDisplayedIndex !== -1) {
    var cardOpened = map.querySelector('article[data-index="' + cardDisplayedIndex + '"]');
    map.querySelector('article[data-index="' + cardDisplayedIndex + '"]').style.display = 'none';
    cardOpened.querySelector('.popup__close').removeEventListener('click', closeOpenedCard);
    map.removeEventListener('keydown', closeOpenedCardByEscape);
    cardDisplayedIndex = -1;
  }
};

var closeOpenedCardByEscape = function (evt) {
  if (evt.key === ESC_KEY) {
    closeOpenedCard();
  }
};

var openPinCard = function (index) {
  if (cardDisplayedIndex !== index) {
    closeOpenedCard();
    var card = map.querySelector('article[data-index="' + index + '"]');
    card.style.display = '';
    card.querySelector('.popup__close').addEventListener('click', closeOpenedCard);
    map.addEventListener('keydown', closeOpenedCardByEscape);
    cardDisplayedIndex = index;
  } else {
    closeOpenedCard();
  }
};

var createPinElement = function (newElement, pinData, indexNumber) {
  var pinButton = newElement.querySelector('.map__pin');
  pinButton.style = 'left: ' + (pinData.location.x - LOGO_WIDTH / 2) + 'px;top: ' + (pinData.location.y - LOGO_HEIGHT) + 'px;';

  pinButton.addEventListener('click', function (evt) {
    openPinCard(indexNumber);
  });

  var icon = newElement.querySelector('.map__pin img');
  icon.src = pinData.author.avatar;
  icon.alt = pinData.offer.title;
  return newElement;
};


var createFragmentWithPins = function (pins) {
  var pinTemplate = document.querySelector('#pin');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(createPinElement(pinTemplate.cloneNode(true).content, pins[i], i));
  }
  return fragment;
};

var translateHouseName = function (engName) {
  switch (engName) {
    case 'flat':
      return 'Kвартира';
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    default:
      return 'Kвартира';
  }
};

var createCardElement = function (newElement, pinData, index) {
  var i;
  var card = newElement.querySelector('.map__card');
  card.setAttribute('data-index', index);
  card.style.display = 'none';
  newElement.querySelector('.popup__title').textContent = pinData.offer.title;
  newElement.querySelector('.popup__text--address').textContent = pinData.offer.address;
  newElement.querySelector('.popup__text--price').textContent = pinData.offer.price + '₽/ночь';
  newElement.querySelector('.popup__type').textContent = translateHouseName(pinData.offer.type);
  newElement.querySelector('.popup__text--capacity').textContent = pinData.offer.rooms + ' комнаты  для ' + pinData.offer.guests + ' гостей';
  newElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pinData.offer.checkin + ', выезд до ' + pinData.offer.checkout;
  newElement.querySelector('.popup__description').textContent = pinData.offer.description;
  newElement.querySelector('.popup__avatar').src = pinData.author.avatar;

  var features = pinData.offer.features;
  var featuresList = newElement.querySelector('.popup__features');
  for (i = 0; i < features.length; i++) {
    featuresList.querySelector('.popup__feature--' + features[i]).textContent = features[i];
  }
  var featuresElements = newElement.querySelectorAll('.popup__feature');
  for (i = 0; i < featuresElements.length; i++) {
    if (featuresElements[i].textContent.length === 0) {
      featuresList.removeChild(featuresElements[i]);
    }
  }

  var photos = pinData.offer.photos;
  var photosBlock = newElement.querySelector('.popup__photos');
  for (i = 0; i < photos.length; i++) {
    var photoElement = photosBlock.querySelector('.popup__photo');
    if (i > 0) {
      photoElement = photoElement.cloneNode();
      photosBlock.appendChild(photoElement);
    }
    photoElement.src = photos[i];
  }

  return newElement;
};

var createFragmentWithCards = function (pins) {
  var cardTemplate = document.querySelector('#card');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(createCardElement(cardTemplate.cloneNode(true).content, pins[i], i));
  }
  return fragment;
};


var map = document.querySelector('.map');
var pins = createPins(QUANTITY, map.clientWidth);
map.querySelector('.map__pins').appendChild(createFragmentWithPins(pins));

var form = document.querySelector('.ad-form');
var filters = map.querySelector('.map__filters');
var elementsInputSelect = form.querySelectorAll('input, select');
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

var setPageNotActive = function () {
  filters.classList.add('map__filters--disabled');
  setInputStateDisabled();
};

var setPageActive = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  filters.classList.remove('map__filters--disabled');
  setInputStateEnabled();
};

var fillAddressByPin = function (pin) {
  var addressField = form.querySelector('#address');
  addressField.value = Math.round(pin.offsetLeft + pin.offsetWidth / 2);
  addressField.value += ', ' + Math.round(pin.offsetTop + pin.offsetHeight);
};

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.buttons === 1) {
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

setPageNotActive();

var mapFilters = map.querySelector('.map__filters-container');
map.insertBefore(createFragmentWithCards(pins), mapFilters);
