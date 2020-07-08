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

  var coatColor = 'rgb(101, 137, 164)';
  var eyeColor = 'black';
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyeColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.wizard.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var wizardCoatClickHandler = window.util.debounce(function () {
    var newColor = COAT_COLORS[window.util.getRandom(0, COAT_COLORS.length - 1)];
    window.util.colorize(setupWizardCoat, newColor, 'coat');
    coatColor = newColor;
    updateWizards();
  });

  var wizardEyesClickHandler = window.util.debounce(function () {
    var newColor = EYE_COLORS[window.util.getRandom(0, EYE_COLORS.length - 1)];
    window.util.colorize(setupWizardEyes, newColor, 'eyes');
    eyeColor = newColor;
    updateWizards();
  });

  var wizardFireBallClickHandler = function () {
    var fireBallColor = FIREBALL_COLORS[window.util.getRandom(0, FIREBALL_COLORS.length - 1)];

    window.util.colorize(setupFireBall, fireBallColor, 'fireball', 'backgroundColor');
  };

  setupWizardCoat.addEventListener('click', wizardCoatClickHandler);
  setupWizardEyes.addEventListener('click', wizardEyesClickHandler);
  setupFireBall.addEventListener('click', wizardFireBallClickHandler);

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

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  window.backend.load(successHandler, window.util.errorHandler);
})();
