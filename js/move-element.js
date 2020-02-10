'use strict';

(function () {
  var addDragAndDropToElement = function (element, moveElement) {
    element.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startCoordinates = {
        x: evt.clientX,
        y: evt.clientY
      };

      var dragged = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        dragged = true;

        var newOrdinats = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var delta = {
          x: newOrdinats.x - startCoordinates.x,
          y: newOrdinats.y - startCoordinates.y
        };

        startCoordinates = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        moveElement.style.left = (moveElement.offsetLeft + delta.x) + 'px';
        moveElement.style.top = (moveElement.offsetTop + delta.y) + 'px';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        if (dragged) {
          var onElementClickRemovePreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            element.removeEventListener('click', onElementClickRemovePreventDefault);
          };
          element.addEventListener('click', onElementClickRemovePreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

    });
  };
  window.moveElement = addDragAndDropToElement;
})();
