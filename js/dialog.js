'use strict';

(function () {
  var setupPopup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var userNameInput = document.querySelector('.setup-user-name');
  var similarWizardList = document.querySelector('.setup-similar-list');
  var dialogHandle = setupPopup.querySelector('.upload');
  var form = setupPopup.querySelector('.setup-wizard-form');

  var setupPopupTop = window.getComputedStyle(setupPopup).getPropertyValue('top');
  var setupPopupLeft = window.getComputedStyle(setupPopup).getPropertyValue('left');

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onSetupPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeSetupPopup);
  };

  var openSetupPopup = function () {
    setupPopup.style.top = setupPopupTop;
    setupPopup.style.left = setupPopupLeft;
    setupPopup.classList.remove('hidden');
    setupPopup.querySelector('.setup-similar').classList.remove('hidden');
    window.backend.load(window.wizard.render, errorHandler);
    document.addEventListener('keydown', onSetupPopupEscPress);
  };

  var closeSetupPopup = function () {
    if (userNameInput !== document.activeElement) {
      setupPopup.classList.add('hidden');
      similarWizardList.innerHTML = '';
      document.removeEventListener('keydown', onSetupPopupEscPress);
    }
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      setupPopup.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  });

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

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupPopup.style.top = (setupPopup.offsetTop - shift.y) + 'px';
      setupPopup.style.left = (setupPopup.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
