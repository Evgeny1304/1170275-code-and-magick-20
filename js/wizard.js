'use strict';

(function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarWizardList = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  var renderWizard = function (object) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = object.name;
    wizardElement.querySelector('.wizard-coat').style.fill = object.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = object.eyesColor;

    return wizardElement;
  };

  window.wizard = {
    render: function (objects) {
      for (var i = 0; i < objects.length; i++) {
        fragment.appendChild(renderWizard(objects[i]));
      }
      similarWizardList.appendChild(fragment);
    }
  };
})();
