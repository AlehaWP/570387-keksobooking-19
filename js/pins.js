'use strict';

(function () {
  var LOGO_WIDTH = 40;
  var LOGO_HEIGHT = 40;
  var parentBlock;
  var pins;
  var mapFilters;


  var fillPinElement = function (newElement, pinData, indexNumber) {
    var pinButton = newElement.querySelector('.map__pin');
    pinButton.style = 'left: ' + (pinData.location.x - LOGO_WIDTH / 2) + 'px;top: ' + (pinData.location.y - LOGO_HEIGHT) + 'px;';

    pinButton.addEventListener('click', function () {
      window.card.open(pins[indexNumber], parentBlock, mapFilters);
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

  var addTo = function (parentBlockToAdd) {
    parentBlock = parentBlockToAdd;
    mapFilters = parentBlock.querySelector('.map__filters-container');
    pins = window.dataMockup.returnPins(parentBlock.clientWidth);

    var target = parentBlock.querySelector('.map__pins');
    var fragmentToAdd = returnFragmentWithPins();
    target.appendChild(fragmentToAdd);
  };

  window.pins = {
    addTo: addTo
  };
})();
