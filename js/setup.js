'use strict';

(function () {
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;
  var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setupWizard = document.querySelector('.setup-wizard');
  var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireBall = document.querySelector('.setup-fireball-wrap');
  var userNameInput = document.querySelector('.setup-user-name');

  setupWizardCoat.addEventListener('click', function () {
    var coatColor = COAT_COLORS[window.util.getRandom(0, COAT_COLORS.length - 1)];

    window.util.colorize(setupWizardCoat, coatColor, 'coat');
  });

  setupWizardEyes.addEventListener('click', function () {
    var eyeColor = EYE_COLORS[window.util.getRandom(0, EYE_COLORS.length - 1)];

    window.util.colorize(setupWizardEyes, eyeColor, 'eyes');
  });

  setupFireBall.addEventListener('click', function () {
    var fireBallColor = FIREBALL_COLORS[window.util.getRandom(0, FIREBALL_COLORS.length - 1)];

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
