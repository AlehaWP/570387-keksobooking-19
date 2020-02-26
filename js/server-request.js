'use strict';

(function () {
  var SUCCESS = 200;
  var TIMEOUT = 10000;
  var NUMBER_ATTEMPTS = 4;

  var PostMessages = {
    CONNECTION_ERROR: 'Произошла ошибка соединения',
    SUCCESS: 'Данные сохранены на сервере',
    NO_SUCCESS: 'Ошибка отправки данных',
    TIMEOUT: 'К сожалению, отправка данных формы не успела выполниться за ' + TIMEOUT + 'мс.Обязательно попробуйте еще раз.'
  };

  var GetMessages = {
    CONNECTION_ERROR: 'Произошла ошибка соединения',
    SUCCESS: 'Данные получены с сервера',
    NO_SUCCESS: 'Ошибка загрузки данных',
    TIMEOUT: 'К сожалению, загрузка данных продолжалась дольше установленного лимита времени ' + TIMEOUT + 'мс. Проверьте скорость соединения и обязательно попробуйте еще раз.'
  };

  var exchangeWithServer = function (url, onSuccess, onError, type, data) {

    var xhr = new XMLHttpRequest();
    var tryAgainCounter = 0;
    var messages;

    if (type === 'POST') {
      messages = PostMessages;
    } else {
      messages = GetMessages;
      xhr.responseType = 'json';
    }

    var xhrConnect = function () {
      xhr.open(type, url);
      xhr.send(data);
      if (tryAgainCounter++ > NUMBER_ATTEMPTS) {
        xhrConnect = null;
      }
    };

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS) {
        if (type === 'POST') {
          onSuccess('Данные сохранены на сервере');
          if (onSuccessPostExternal) {
            onSuccessPostExternal();
          }
        } else {
          onSuccess(xhr.response);
        }
      } else {
        onError(messages.NO_SUCCESS, xhrConnect);
      }
    });

    xhr.addEventListener('error', function () {
      onError(messages.CONNECTION_ERROR, xhrConnect);
    });

    xhr.addEventListener('timeout', function () {
      onError(messages.TIMEOUT, xhrConnect);
    });

    xhr.timeout = TIMEOUT;

    xhrConnect();
  };

  var getDataFromServer = function (url, onSuccess, onError) {
    exchangeWithServer(url, onSuccess, onError, 'GET');
  };

  var pushDataToServer = function (url, data, onSuccess, onError) {
    exchangeWithServer(url, onSuccess, onError, 'POST', data);
  };

  var onSuccessPostExternal;
  var subscribeOnSuccessPost = function (subscribe) {
    onSuccessPostExternal = subscribe;
  };

  window.serverRequest = {
    load: getDataFromServer,
    push: pushDataToServer,
    subscribeOnSuccessPost: subscribeOnSuccessPost
  };
})();
