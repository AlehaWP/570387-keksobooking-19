'use strict';

(function () {
  var SUCCESS = 200;
  var current = {};
  var tryAgainCounter = 0;

  var tryAgain = function () {
    getDataFromServer(current.url, current.onSuccess, current.onError);
  };

  var getDataError = function (message) {
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
    current.onSuccess = onSuccess;
    current.onError = onError;

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS) {
        onSuccess(xhr.response);
      } else {
        getDataError('Ошибка загрузки данных');
      }
    });

    xhr.addEventListener('error', function () {
      getDataError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      getDataError('К сожалению, запрос не успел выполниться за ' + xhr.timeout + 'мс. Обязательно попробуйте еще раз.');
    });

    xhr.timeout = 5000; // 10s

    xhr.open('GET', url);
    xhr.send();
  };

  window.upload = {
    load: getDataFromServer
  };
})();
