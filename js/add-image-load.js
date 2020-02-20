'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var addedEvents = {};

  var load = function (destinationParent, inputFileElement, onError) {
    var destination = destinationParent.querySelector('img');
    if (!destination) {
      var img = document.createElement('img');
      destinationParent.appendChild(img);
      destination = img;
      destination.style.width = '100%';
      destination.style.height = '100%';
    }

    var oninputFileElementChange = function () {
      var file = inputFileElement.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          destination.src = reader.result;
        });

        reader.readAsDataURL(file);
      } else {
        onError('Тип файла не подходит для загрузки');
      }
    };
    inputFileElement.addEventListener('change', oninputFileElementChange);
    addedEvents[inputFileElement.id] = function () {
      inputFileElement.removeEventListener('change', oninputFileElementChange);
    };
  };

  var removeEventFromInputFileElement = function (inputFileElementID) {
    if (addedEvents[inputFileElementID]) {
      addedEvents[inputFileElementID]();
    }
  };

  window.addImage = {
    load: load,
    removeLoad: removeEventFromInputFileElement
  };
})();
