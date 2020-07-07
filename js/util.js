'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var TIMEOUT_IN_MS = 10000;
  var DEBOUNCE_INTERVAL = 500;

  var StatusCode = {
    OK: 200
  };

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
    },

    makeRequest: function (data, method, url, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open(method, url);
      xhr.send(data);
    },

    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    },

    debounce: function (cb) {
      var lastTimeout = null;

      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };
    }
  };
})();
