'use strict';

(function () {
  var LOGO_WIDTH = 40;
  var LOGO_HEIGHT = 40;

  var fillPinElement = function (newElement, pinData, parentBlock, elementAfter) {
    var pinButton = newElement.querySelector('.map__pin');
    pinButton.style = 'left: ' + (pinData.location.x - LOGO_WIDTH / 2) + 'px;top: ' + (pinData.location.y - LOGO_HEIGHT) + 'px;';

    pinButton.addEventListener('click', function () {
      window.card.open(pinData, parentBlock, elementAfter);
    });

    var icon = newElement.querySelector('.map__pin img');
    icon.src = pinData.author.avatar;
    icon.alt = pinData.offer.title;
  };


  var returnFragmentWithPins = function (parentBlockToAdd, elementAfter) {
    var pins = window.dataMockup.returnPins(parentBlockToAdd.clientWidth);
    var pinTemplate = document.querySelector('#pin');
    var fragment = document.createDocumentFragment();
    var newElement;
    for (var i = 0; i < pins.length; i++) {
      newElement = pinTemplate.cloneNode(true).content;
      fillPinElement(newElement, pins[i], parentBlockToAdd, elementAfter);
      fragment.appendChild(newElement);
    }
    return fragment;
  };


  window.pins = {
    returnFragmentWithPins: returnFragmentWithPins
  };
})();
