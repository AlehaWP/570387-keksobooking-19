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

var returnRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var cutRandomElement = function (arr) {
  var randomNum = Math.floor(Math.random() * arr.length);
  var result = arr.splice(randomNum, 1);
  return result;
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

// var createMark = function () {
//   var quantityRooms = returnRandom(4) + 1;
//   var quantityGuests = quantityRooms * 2;
//   return {
//     'author': {
//       'avatar': 'img/avatars/user' + MokiDictionary.AVATARS.splice(returnRandom(8), 1) + '.png'
//     },
//     'offer': {
//       'title': returnRandomElement(MokiDictionary.TITLES),
//       'address': строка, адрес предложения. Для простоты пусть пока представляет собой запись вида '{{location.x}}, {{location.y}}', например, '600, 350'
//       'price': число, стоимость
//       'type': returnRandomElement(MokiDictionary.TYPES),
//       'rooms': quantityRooms,
//       'guests': quantityGuests,
//       'checkin': returnRandomElement(MokiDictionary.CHECKIN),
//       'checkout': returnRandomElement(MokiDictionary.CHECKOUT),
//       'features': returnSomeElements(MokiDictionary.FEATURES),
//       'description': returnRandomElement(MokiDictionary.DESCRIPTIONS),
//       'photos': returnSomeElements(MokiDictionary.PHOTOS)
//     },
//     'location': {
//       'x': случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
//       'y': случайное число, координата y метки на карте от 130 до 630.
//     }
//   }
// }

var map = document.querySelector('.map');
var widthMap = map.clientWidth;
// console.log(MokiDictionary.AVATARS.splice(returnRandom(8), 1));

console.log(MokiDictionary.FEATURES);
console.log(returnSomeElements(MokiDictionary.FEATURES));
