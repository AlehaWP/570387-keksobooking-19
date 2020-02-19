'use strict';

(function () {
  window.addImageLoad = function (destinationParrent, inputParrent, onError) {
    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
    var destination = destinationParrent.querySelector('img');
    if (!destination) {
      var img = document.createElement('img');
      destinationParrent.appendChild(img);
      destination = img;
      destination.style.width = '100%';
      destination.style.height = '100%';
    }
    var inputFile = inputParrent.querySelector('input[type="file"]');
    inputFile.addEventListener('change', function () {
      var file = inputFile.files[0];
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

    });
  };
})();
