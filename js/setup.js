'use strict';

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var MAX_WIZARD_COUNT = 4;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getWizards = function () {
  var wizards = [];

  for (var i = 0; i < MAX_WIZARD_COUNT; i++) {
    var wizard = {
      'name': FIRST_NAMES[getRandom(0, FIRST_NAMES.length - 1)] + ' ' + LAST_NAMES[getRandom(0, LAST_NAMES.length - 1)],
      'coatColor': COAT_COLORS[getRandom(0, COAT_COLORS.length - 1)],
      'eyesColor': EYE_COLORS[getRandom(0, EYE_COLORS.length - 1)]
    };
    wizards.push(wizard);
  }

  return wizards;
};

var wizards = getWizards();

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var similarWizardList = document.querySelector('.setup-similar-list');
var fragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarWizardList.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
