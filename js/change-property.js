'use strict';

(function () {
  var counterIndex = function (limit) {
    var count = 0;
    return function () {
      count = ++count % limit;
      return count;
    };
  };

  var returnChangeValueMethod = function (element, valueData, propertyName, elementInput) {
    var counter = counterIndex(valueData.length);
    return function () {
      var newIndex = counter();
      element.style[propertyName] = valueData[newIndex];
      elementInput.value = valueData[newIndex];
    };
  };

  window.changeProperty = returnChangeValueMethod;
})();
