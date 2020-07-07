'use strict';

(function () {
  var MAX_WIZARD_COUNT = 4;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarWizardList = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  var renderWizard = function (object) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = object.name;
    wizardElement.querySelector('.wizard-coat').style.fill = object.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = object.colorEyes;

    return wizardElement;
  };

  window.wizard = {
    render: function (objects) {
      var wizardsCount = objects.length > MAX_WIZARD_COUNT ? MAX_WIZARD_COUNT : objects.length;
      similarWizardList.innerHTML = '';
      for (var i = 0; i < wizardsCount; i++) {
        fragment.appendChild(renderWizard(objects[i]));
      }
      similarWizardList.appendChild(fragment);
    }
  };
})();
