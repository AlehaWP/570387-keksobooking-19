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

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var pins = createPins(QUINTITY, map.clientWidth);

map.querySelector('.map__pins').appendChild(createFragmentWithPins(pins));
