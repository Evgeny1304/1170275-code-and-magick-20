'use strict';

(function () {
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;

  var setupWizard = document.querySelector('.setup-wizard');
  var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireBall = document.querySelector('.setup-fireball-wrap');
  var userNameInput = document.querySelector('.setup-user-name');

  setupWizardCoat.addEventListener('click', function () {
    var coatColors = window.data.coatColors;
    var coatColor = coatColors[window.util.getRandom(0, coatColors.length - 1)];

    window.util.colorize(setupWizardCoat, coatColor, 'coat');
  });

  setupWizardEyes.addEventListener('click', function () {
    var eyeColors = window.data.eyeColors;
    var eyeColor = eyeColors[window.util.getRandom(0, eyeColors.length - 1)];

    window.util.colorize(setupWizardEyes, eyeColor, 'eyes');
  });

  setupFireBall.addEventListener('click', function () {
    var fireBallColors = window.data.fireballColors;
    var fireBallColor = fireBallColors[window.util.getRandom(0, fireBallColors.length - 1)];

    window.util.colorize(setupFireBall, fireBallColor, 'fireball', 'backgroundColor');
  });

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  userNameInput.addEventListener('input', function () {
    var valueLength = userNameInput.value.length;

    if (valueLength < MIN_NAME_LENGTH) {
      userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_NAME_LENGTH) {
      userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
    } else {
      userNameInput.setCustomValidity('');
    }
  });
})();
