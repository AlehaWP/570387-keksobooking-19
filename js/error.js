'use strict';

(function () {

  var ESC_KEY = 'Escape';
  var templateError = document.querySelector('#error').content;

  var onError = function (message, tryAgain) {
    var errorFragment = templateError.cloneNode(true);
    var errorMessage = errorFragment.querySelector('.error');
    errorMessage.querySelector('.error__message').textContent = message;
    var button = errorMessage.querySelector('.error__button');
    var firstElement = document.body.firstChild;

    var closeErrorWindow = function () {
      document.body.removeChild(errorMessage);
      document.removeEventListener('keydown', onEscKeyDown);
    };

    var onEscKeyDown = function (evt) {
      if (evt.key === ESC_KEY) {
        closeErrorWindow();
      }
    };

    if (!tryAgain) {
      button.textContent = 'Закрыть';
    }
    button.addEventListener('click', function () {
      if (tryAgain) {
        tryAgain();
      }
      closeErrorWindow();
    });

    document.addEventListener('keydown', onEscKeyDown);
    document.body.insertBefore(errorFragment, firstElement);
  };

  window.error = {
    onError: onError
  };
})();
