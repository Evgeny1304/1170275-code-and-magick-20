'use strict';

(function () {
  var fireBallSize = 22;

  var getFireballSpeed = function (isWind) {
    if (isWind) {
      return 5;
    }

    return 2;
  };

  var wizardSpeed = 3;
  var wizardWidth = 70;

  var getWizardHeight = function () {
    return 1.337 * wizardWidth;
  };

  var getWizardX = function (gameFieldWidth) {
    return (gameFieldWidth - wizardWidth) / 2;
  };

  var getWizardY = function (gameFieldHeight) {
    return gameFieldHeight / 3;
  };
})();
