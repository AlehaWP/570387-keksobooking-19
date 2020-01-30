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

var returnRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var returnRandom = function (maxNum) {
  return Math.floor(Math.random() * maxNum);
};

var returnSomeElements = function (arr) {
  var resultArr = arr.slice();
  var quantityElems = returnRandom(arr.length) + 1;
  while (quantityElems < arr.length) {
    arr.splice(returnRandom(arr.length), 1);
  }
  return arr;
};

var createPin = function (avatars, mapWidth) {
  if (!avatars) {
    avatars = MokiDictionary.AVATARS;
  }
  var quantityRooms = returnRandom(4) + 1;
  var quantityGuests = quantityRooms * 2;
  return {
    'author': {
      'avatar': 'img/avatars/user' + avatars.splice(returnRandom(avatars.length), 1) + '.png'
    },
    'offer': {
      'title': returnRandomElement(MokiDictionary.TITLES),
      'address': returnRandom(1000) + ',' + returnRandom(1000),
      'price': returnRandom(3000) + 2000,
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
      'x': returnRandom(mapWidth),
      'y': returnRandom(500) + 130
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
  var icon = newElement.querySelector('.map__pin img');
  newElement.querySelector('.map__pin').style = 'left: ' + (pinData['location']['x'] - 40) + 'px;top: ' + (pinData['location']['y'] - 40) + 'px;';
  icon.src = pinData['author']['avatar'];
  icon.alt = pinData['offer']['title'];

  return newElement;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var pins = createPins(QUINTITY, map.clientWidth);

var pinTemplate = document.querySelector('#pin');
var fragment = document.createDocumentFragment();
for (var i = 0; i < pins.length; i++) {
  fragment.appendChild(createPinElement(pinTemplate.cloneNode(true).content, pins[i]));
}

map.querySelector('.map__pins').appendChild(fragment);
