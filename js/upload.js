'use strict';

(function () {
  var getDataFromServer = function (onLoadFromServer) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'JSON';
    xhr.addEventListener('load', function () {
      onLoadFromServer();
    });

    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();
  };

  window.upload = {
    load: getDataFromServer
  };
})();
