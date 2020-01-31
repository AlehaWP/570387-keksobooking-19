'use strict';

var MokiDictionary = {
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

var QUINTITY = 8;
var X = 40;
var Y = 40;

var returnRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var returnRandomNumber = function (maxNum) {
  return Math.floor(Math.random() * maxNum);
};

var returnSomeElements = function (arr) {
  arr = arr.slice();
  var quantityElems = returnRandomNumber(arr.length) + 1;
  while (quantityElems < arr.length) {
    arr.splice(returnRandomNumber(arr.length), 1);
  }
  return arr;
};

var createPin = function (avatars, mapWidth) {
  if (!avatars) {
    avatars = MokiDictionary.AVATARS;
  }
  var quantityRooms = returnRandomNumber(4) + 1;
  var quantityGuests = quantityRooms * 2;
  return {
    'author': {
      'avatar': 'img/avatars/user' + avatars.splice(returnRandomNumber(avatars.length), 1) + '.png'
    },
    'offer': {
      'title': returnRandomElement(MokiDictionary.TITLES),
      'address': returnRandomNumber(1000) + ',' + returnRandomNumber(1000),
      'price': returnRandomNumber(3000) + 2000,
      'type': returnRandomElement(MokiDictionary.TYPES),
      'rooms': quantityRooms,
      'guests': quantityGuests,
      'checkin': returnRandomElement(MokiDictionary.CHECKIN),
      'checkout': returnRandomElement(MokiDictionary.CHECKOUT),
      'features': returnSomeElements(MokiDictionary.FEATURES),
      'description': returnRandomElement(MokiDictionary.DESCRIPTIONS),
      'photos': returnSomeElements(MokiDictionary.PHOTOS)
    },
    'location': {
      'x': returnRandomNumber(mapWidth),
      'y': returnRandomNumber(500) + 130
    }
  };
};

var createPins = function (quintity, mapWidth) {
  var resultArr = [];
  var tempAvatars = MokiDictionary.AVATARS.slice();
  for (var i = 0; i < quintity; i++) {
    resultArr[i] = createPin(tempAvatars, mapWidth);
  }
  return resultArr;
};

var createPinElement = function (newElement, pinData) {
  newElement.querySelector('.map__pin').style = 'left: ' + (pinData.location.x - X / 2) + 'px;top: ' + (pinData.location.y - Y) + 'px;';

  var icon = newElement.querySelector('.map__pin img');
  icon.src = pinData.author.avatar;
  icon.alt = pinData.offer.title;

  return newElement;
};

var createFragmentWithPins = function (pins) {
  var pinTemplate = document.querySelector('#pin');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(createPinElement(pinTemplate.cloneNode(true).content, pins[i]));
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

var createCardElement = function (newElement, pinData) {
  console.log(pinData);
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
  for (var i = 0; i < features.length; i++) {
    featuresList.querySelector('.popup__feature--' + features[i]).textContent = features[i];
  }
  var featuresElements = newElement.querySelectorAll('.popup__feature');
  for (var i = 0; i < featuresElements.length; i++) {
    if (featuresElements[i].textContent.length === 0) {
      featuresList.removeChild(featuresElements[i]);
    }
  }

  var photos = pinData.offer.photos;
  var photosBlock = newElement.querySelector('.popup__photos');
  for (var i = 0; i < photos.length; i++) {
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
  for (var i = 0; i < 1; i++) {
    fragment.appendChild(createCardElement(cardTemplate.cloneNode(true).content, pins[i]));
  }
  return fragment;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var pins = createPins(QUINTITY, map.clientWidth);

map.querySelector('.map__pins').appendChild(createFragmentWithPins(pins));
var mapFilters = map.querySelector('.map__filters-container');
map.insertBefore(createFragmentWithCards(pins), mapFilters);
