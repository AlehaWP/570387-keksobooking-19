'use strict';

(function () {
  var addDragAndDropToElement = function (element, moveElement, borderArea) {
    var parent = element.parentElement;
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

        var newCoordinats = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var delta = {
          x: newCoordinats.x - startCoordinates.x,
          y: newCoordinats.y - startCoordinates.y
        };

        startCoordinates = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        var newPosition = {
          x: moveElement.offsetLeft + delta.x,
          y: moveElement.offsetTop + delta.y
        };

        if (borderArea) {
          if (newPosition.x < borderArea.left) {
            newPosition.x = borderArea.left;
          }
          if (newPosition.y < borderArea.top) {
            newPosition.y = borderArea.top;
          }
          if (newPosition.x > borderArea.right) {
            newPosition.x = borderArea.right;
          }
          if (newPosition.y > borderArea.bottom) {
            newPosition.y = borderArea.bottom;
          }
        }

        moveElement.style.left = newPosition.x + 'px';
        moveElement.style.top = newPosition.y + 'px';
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
  window.moveElement = {
    addDragAndDrop: addDragAndDropToElement
  };
})();
