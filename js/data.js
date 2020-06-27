'use strict';

(function () {
  var MAX_WIZARD_COUNT = 4;

  window.data = {
    'firstNames': ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    'lastNames': ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    'coatColors': ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    'eyeColors': ['black', 'red', 'blue', 'yellow', 'green'],
    'fireballColors': ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],

    getWizards: function () {
      var wizards = [];

      for (var i = 0; i < MAX_WIZARD_COUNT; i++) {
        var wizard = {
          'name': this.firstNames[window.util.getRandom(0, this.firstNames.length - 1)] + ' ' + this.lastNames[window.util.getRandom(0, this.lastNames.length - 1)],
          'coatColor': this.coatColors[window.util.getRandom(0, this.coatColors.length - 1)],
          'eyesColor': this.eyeColors[window.util.getRandom(0, this.eyeColors.length - 1)]
        };
        wizards.push(wizard);
      }

      return wizards;
    }
  };
})();
