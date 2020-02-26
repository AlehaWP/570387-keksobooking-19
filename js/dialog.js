'use strict';

(function () {

  var templateError = document.querySelector('#error').content;
  var templateSucces = document.querySelector('#success').content;
  var main = document.body.querySelector('main');

  var onError = function (message, tryAgain) {
    dialogWindow('error', templateError, message, tryAgain);
  };

  var onSuccess = function (message) {
    dialogWindow('success', templateSucces, message);
  };

  var dialogWindow = function (type, template, message, tryAgain) {
    var dialogFragment = template.cloneNode(true);
    var dialogElement = dialogFragment.querySelector('.' + type);
    dialogElement.querySelector('.' + type + '__message').textContent = message;
    var button = dialogElement.querySelector('.' + type + '__button');
    var firstElement = main.firstChild;

    var closeWindow = function () {
      main.removeChild(dialogElement);
      document.removeEventListener('keydown', onEscKeyDown);
    };

    var onEscKeyDown = function (evt) {
      if (evt.key === window.general.ESC_KEY) {
        closeWindow();
      }
    };

    dialogElement.addEventListener('click', function (evt) {
      if (evt.target !== button) {
        closeWindow();
      }
    });

    if (button) {
      if (!tryAgain) {
        button.textContent = 'Закрыть';
      }
      button.addEventListener('click', function () {
        if (tryAgain) {
          tryAgain();
        }
        closeWindow();
      });
    }


    document.addEventListener('keydown', onEscKeyDown);
    main.insertBefore(dialogFragment, firstElement);
  };

  window.dialog = {
    onError: onError,
    onSuccess: onSuccess
  };
})();
