'use strict';

(function () {
  var LOGO_WIDTH = 40;
  var LOGO_HEIGHT = 40;
  var activePins = [];

  var deleteAll = function () {
    if (activePins.length) {

      var parentBlock = activePins[0].parentElement;
      activePins.forEach(function (item) {
        parentBlock.removeChild(item);
      });
      activePins = [];
    }

    window.card.close();
  };

  var fillPinElement = function (newElement, pinData, parentBlock, elementAfter) {
    var pinButton = newElement.querySelector('.map__pin');
    activePins.push(pinButton);
    pinButton.style = 'left: ' + (pinData.location.x - LOGO_WIDTH / 2) + 'px;top: ' + (pinData.location.y - LOGO_HEIGHT) + 'px;';

    pinButton.addEventListener('click', function () {
      window.card.open(pinData, parentBlock, elementAfter);
    });

    var icon = newElement.querySelector('.map__pin img');
    icon.src = pinData.author.avatar;
    icon.alt = pinData.offer.title;
  };


  var returnFragmentWithPins = function (pins, parentBlockToAdd, elementAfter) {
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
    returnFragmentWithPins: returnFragmentWithPins,
    deleteAll: deleteAll
  };
})();
