'use strict';

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var MAX_WIZARD_COUNT = 4;
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

var userDialog = document.querySelector('.setup');

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

var renderWizards = function (objects) {
  for (var i = 0; i < objects.length; i++) {
    fragment.appendChild(renderWizard(objects[i]));
  }
  similarWizardList.appendChild(fragment);
};

renderWizards(wizards);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var userNameInput = document.querySelector('.setup-user-name');

var onSetupPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeSetupPopup();
  }
};

var openSetupPopup = function () {
  userDialog.classList.remove('hidden');

  document.addEventListener('keydown', onSetupPopupEscPress);
};

var closeSetupPopup = function () {
  if (userNameInput !== document.activeElement) {
    userDialog.classList.add('hidden');

    document.removeEventListener('keydown', onSetupPopupEscPress);
  }
};

setupOpen.addEventListener('click', function () {
  openSetupPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openSetupPopup();
  }
});

setupClose.addEventListener('click', function () {
  closeSetupPopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closeSetupPopup();
  }
});

var setupWizard = document.querySelector('.setup-wizard');
var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireBall = document.querySelector('.setup-fireball-wrap');

var chooseColor = function (element, colors, type) {
  var elementColor = colors[getRandom(0, colors.length - 1)];
  var inputColor = document.querySelector('input[name="' + type + '-color"]');

  if (type === 'fireball') {
    element.style.backgroundColor = elementColor;
  }

  element.style.fill = elementColor;
  inputColor.value = elementColor;
};

setupWizardCoat.addEventListener('click', function () {
  chooseColor(setupWizardCoat, COAT_COLORS, 'coat');
});

setupWizardEyes.addEventListener('click', function () {
  chooseColor(setupWizardEyes, EYE_COLORS, 'eyes');
});

setupFireBall.addEventListener('click', function () {
  chooseColor(setupFireBall, FIREBALL_COLORS, 'fireball');
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
