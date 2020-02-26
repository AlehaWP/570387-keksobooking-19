'use strict';

(function () {
  var PIN_LIMIT = 5;
  var priceCostsMap = {
    low: [0, 10000],
    middle: [10000, 50000],
    high: [50000, 1000000]
  };

  window.filterPins = function (formData, pinsFromServer) {
    var typeFilter = formData.get('housing-type') === 'any' ? null : formData.get('housing-type');
    var priceFilter = formData.get('housing-price') === 'any' ? null : formData.get('housing-price');
    var roomsFilter = formData.get('housing-rooms') === 'any' ? null : +formData.get('housing-rooms');
    var guestsFilter = formData.get('housing-guests') === 'any' ? null : formData.get('housing-guests');
    var featuresFilter = formData.getAll('features') === [] ? null : formData.getAll('features');
    var offer;
    var priceRange;

    var result = [];
    for (var i = 0; i < pinsFromServer.length && result.length < PIN_LIMIT; i++) {
      offer = pinsFromServer[i].offer;
      priceRange = priceCostsMap[priceFilter];

      // Если что-то не совпало прерываем текущую итерацию
      if (typeFilter && typeFilter !== offer.type) {
        continue;
      }
      if (priceFilter && (offer.price <= priceRange[0] || offer.price > priceRange[1])) {
        continue;
      }
      if (roomsFilter && roomsFilter !== offer.rooms) {
        continue;
      }
      if (guestsFilter && (guestsFilter > offer.guests || (offer.guests !== 0 && guestsFilter === '0'))) {
        continue;
      }
      if (featuresFilter) {
        // Ищем элементы которых нету в features пина
        var notFindedElements = featuresFilter.filter(function (item) {
          return offer.features.indexOf(item) === -1;
        });
        // Если такие элементы есть, выходим
        if (notFindedElements.length) {
          continue;
        }
      }

      // если дошли сюда, значит все совпало,пин подходит, добавляем его в список для добавления
      result.push(pinsFromServer[i]);
    }

    return result;
  };
})();
