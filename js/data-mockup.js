'use strict';

(function () {
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

  var returnMokupPin = function (avatars, mapWidth) {
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

  var returnMokupPins = function (mapWidth) {
    var resultArr = [];
    var tempAvatars = MockupDictionary.AVATARS.slice();
    for (var i = 0; i < QUANTITY; i++) {
      resultArr[i] = returnMokupPin(tempAvatars, mapWidth);
    }
    return resultArr;
  };

  window.dataMockup = {
    returnPins: returnMokupPins
  };
})();
