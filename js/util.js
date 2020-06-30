'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  window.util = {
    getRandom: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    isEnterEvent: function (evt, action) {
      if (evt.key === ENTER_KEY) {
        action();
      }
    },

    isEscEvent: function (evt, action) {
      if (evt.key === ESC_KEY) {
        action();
      }
    },

    colorize: function (element, color, type, styleProperty) {
      var targetProperty = styleProperty ? styleProperty : 'fill';
      var inputColor = document.querySelector('input[name="' + type + '-color"]');
      element.style[targetProperty] = color;
      inputColor.value = color;
    }
  };
})();
