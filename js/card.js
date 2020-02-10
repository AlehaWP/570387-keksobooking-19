'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var cardOpen;
  var cardTemplate = document.querySelector('#card');

  var translatedHouseName = {
    'flat': 'Kвартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var returnFragmentFeatures = function (features, template) {
    var fragment = document.createDocumentFragment();
    var newFeature;
    for (var i = 0; i < features.length; i++) {
      newFeature = template.cloneNode(true);
      newFeature.classList.add('popup__feature--' + features[i]);
      fragment.appendChild(newFeature);
    }
    return fragment;
  };

  var fillCardElement = function (card, pinData) {
    var i;
    card.querySelector('.popup__title').textContent = pinData.offer.title;
    card.querySelector('.popup__text--address').textContent = pinData.offer.address;
    card.querySelector('.popup__text--price').textContent = pinData.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = translatedHouseName[pinData.offer.type];
    card.querySelector('.popup__text--capacity').textContent = pinData.offer.rooms + ' комнаты  для ' + pinData.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + pinData.offer.checkin + ', выезд до ' + pinData.offer.checkout;
    card.querySelector('.popup__description').textContent = pinData.offer.description;
    card.querySelector('.popup__avatar').src = pinData.author.avatar;

    var features = pinData.offer.features;
    var featuresList = card.querySelector('.popup__features');
    var featureElement = featuresList.querySelector('.popup__feature').cloneNode(true);
    featureElement.className = '';
    featureElement.classList.add('popup__feature');
    var featuresToAdd = returnFragmentFeatures(features, featureElement);
    featuresList.innerHTML = '';
    featuresList.appendChild(featuresToAdd);


    var photos = pinData.offer.photos;
    var photosBlock = card.querySelector('.popup__photos');
    var photoElementTemplate = photosBlock.querySelector('.popup__photo').cloneNode();
    photosBlock.innerHTML = '';
    var newPhotoElement;
    for (i = 0; i < photos.length; i++) {
      newPhotoElement = photoElementTemplate.cloneNode();
      photosBlock.appendChild(newPhotoElement);
      newPhotoElement.src = photos[i];
    }
  };

  var closeCard = function () {
    var parent = cardOpen.parentElement;
    parent.removeChild(cardOpen);
    parent.removeEventListener('keydown', onCardKeyDownEsc);
    cardOpen = null;
  };

  var onCardKeyDownEsc = function (evt) {
    if (evt.key === ESC_KEY) {
      closeCard();
    }
  };

  var onPopupCloseClick = function () {
    closeCard();
  };

  var open = function (pinData, parent, elementAfter) {
    if (cardOpen) {
      fillCardElement(cardOpen, pinData);
    } else {
      var elementToAdd = cardTemplate.cloneNode(true).content;
      fillCardElement(elementToAdd, pinData);
      cardOpen = elementToAdd.querySelector('.popup');
      cardOpen.querySelector('.popup__close').addEventListener('click', onPopupCloseClick);
      parrent.insertBefore(elementToAdd, elementAfter);
      parrent.addEventListener('keydown', onCardKeyDownEsc);
    }
  };

  window.card = {
    open: open
  };
})();
