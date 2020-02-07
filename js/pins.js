'use strict';

// pins.js
(function () {
  var LOGO_WIDTH = 40;
  var LOGO_HEIGHT = 40;
  var pins = window.dataMockup.returnPins(window.general.map.clientWidth);

  var fillPinElement = function (newElement, pinData, indexNumber) {
    var pinButton = newElement.querySelector('.map__pin');
    pinButton.style = 'left: ' + (pinData.location.x - LOGO_WIDTH / 2) + 'px;top: ' + (pinData.location.y - LOGO_HEIGHT) + 'px;';

    pinButton.addEventListener('click', function () {
      window.card.openPinCard(pins[indexNumber]);
    });

    var icon = newElement.querySelector('.map__pin img');
    icon.src = pinData.author.avatar;
    icon.alt = pinData.offer.title;
  };


  var returnFragmentWithPins = function () {
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
    var target = window.general.map.querySelector('.map__pins');
    var fragmentToAdd = returnFragmentWithPins();
    target.appendChild(fragmentToAdd);
  };

  window.pins = {
    addPinsToMap: addPinsToMap
  };
})();
