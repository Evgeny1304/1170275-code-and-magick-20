'use strict';

(function () {
  var setupPopup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var userNameInput = document.querySelector('.setup-user-name');
  var similarWizardList = document.querySelector('.setup-similar-list');

  var setupPopupTop = window.getComputedStyle(setupPopup).getPropertyValue('top');
  var setupPopupLeft = window.getComputedStyle(setupPopup).getPropertyValue('left');

  var wizards = window.data.getWizards();

  var onSetupPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeSetupPopup);
  };

  var openSetupPopup = function () {
    setupPopup.style.top = setupPopupTop;
    setupPopup.style.left = setupPopupLeft;
    setupPopup.classList.remove('hidden');
    setupPopup.querySelector('.setup-similar').classList.remove('hidden');
    window.wizard.render(wizards);
    document.addEventListener('keydown', onSetupPopupEscPress);
  };

  var closeSetupPopup = function () {
    if (userNameInput !== document.activeElement) {
      setupPopup.classList.add('hidden');
      similarWizardList.innerHTML = '';
      document.removeEventListener('keydown', onSetupPopupEscPress);
    }
  };

  setupOpen.addEventListener('click', function () {
    openSetupPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openSetupPopup);
  });

  setupClose.addEventListener('click', function () {
    closeSetupPopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeSetupPopup);
  });
})();
