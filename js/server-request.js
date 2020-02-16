'use strict';

(function () {
  var SUCCESS = 200;
  var TIMEOUT = 10000;
  var NUMBER_ATTEMPTS = 4;

  var getDataFromServer = function (url, onSuccess, onError) {

    var xhr = new XMLHttpRequest();
    var tryAgainCounter = 0;
    xhr.responseType = 'json';

    var xhrConnect = function () {
      xhr.open('GET', url);
      xhr.send();
      if (tryAgainCounter++ > NUMBER_ATTEMPTS) {
        xhrConnect = null;
      }
    };

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError('Ошибка загрузки данных', xhrConnect);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения', xhrConnect);
    });

    xhr.addEventListener('timeout', function () {
      onError('К сожалению, запрос не успел выполниться за ' + xhr.timeout + 'мс. Обязательно попробуйте еще раз.', xhrConnect);
    });

    xhr.timeout = TIMEOUT; // 10s

    xhrConnect();
  };

  var pushDataToServer = function (url, data, onSuccess, onError) {

    var xhr = new XMLHttpRequest();
    var tryAgainCounter = 0;

    var xhrConnect = function () {
      xhr.open('POST', url);
      xhr.send(data);
      if (tryAgainCounter++ > NUMBER_ATTEMPTS) {
        xhrConnect = null;
      }
    };

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS) {
        onSuccess('Данные сохранены на сервере');
        if (onSuccessPostExternal) {
          onSuccessPostExternal();
        }
      } else {
        onError('Ошибка отправки данных', xhrConnect);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения', xhrConnect);
    });

    xhr.addEventListener('timeout', function () {
      onError('К сожалению, отправка данных формы не успела выполниться за ' + xhr.timeout + 'мс. Обязательно попробуйте еще раз.', xhrConnect);
    });

    xhr.timeout = TIMEOUT;

    xhrConnect();
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
