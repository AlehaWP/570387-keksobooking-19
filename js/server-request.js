'use strict';

(function () {
  var SUCCESS = 300;
  var TIMEOUT = 10000;
  var current = {};
  var tryAgainCounter = 0;

  var tryAgain = function () {
    if (current.data) {
      pushDataToServer(current.url, current.data, current.onSuccess, current.onError);
    } else {
      getDataFromServer(current.url, current.onSuccess, current.onError);
    }
  };

  var exchangeDataError = function (message) {
    if (++tryAgainCounter < 5) {
      current.onError(message, tryAgain);
    } else {
      current.onError('Ошибка получения данных с сервера. Приносим свои извинения! Попробуйте зайти на наш сайт через несколько минут');
      tryAgainCounter = 0;
    }
  };

  var getDataFromServer = function (url, onSuccess, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    current.url = url;
    current.data = null;
    current.onSuccess = onSuccess;
    current.onError = onError;

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS) {
        onSuccess(xhr.response);
      } else {
        exchangeDataError('Ошибка загрузки данных');
      }
    });

    xhr.addEventListener('error', function () {
      exchangeDataError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      exchangeDataError('К сожалению, запрос не успел выполниться за ' + xhr.timeout + 'мс. Обязательно попробуйте еще раз.');
    });

    xhr.timeout = TIMEOUT; // 10s

    xhr.open('GET', url);
    xhr.send();
  };

  var pushDataToServer = function (url, data, onSuccess, onError) {

    var xhr = new XMLHttpRequest();
    current.url = url;
    current.data = data;
    current.onSuccess = onSuccess;
    current.onError = onError;

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS) {
        onSuccess('Данные сохранены на сервере');
        if (onSuccessPostExternal) {
          onSuccessPostExternal();
        }
      } else {
        exchangeDataError('Ошибка отправки данных');
      }
    });

    xhr.addEventListener('error', function () {
      exchangeDataError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      exchangeDataError('К сожалению, отправка данных формы не успела выполниться за ' + xhr.timeout + 'мс. Обязательно попробуйте еще раз.');
    });

    xhr.timeout = TIMEOUT;

    xhr.open('POST', url);
    xhr.send(data);
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
