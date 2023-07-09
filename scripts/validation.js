const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_state_invalid',
  errorClass: 'popup__input-error'
}

function showErrorMessage(inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};

function hideErrorMessage(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};

function checkInputValidity(inputElement, formElement, config) {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  if (!isInputValid) {
    showErrorMessage(inputElement, errorElement, config);
  } else {
    hideErrorMessage(inputElement, errorElement, config);
  };
};

function disableButton(buttonElement, config) {
  buttonElement.disabled = 'disabled';
  buttonElement.classList.add(config.inactiveButtonClass);
}

function enableButton(buttonElement, config) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.inactiveButtonClass);
}

function toggleButtonState(buttonElement, isActive, config) {
  if (!isActive) {
    disableButton(buttonElement, config);
  } else {
    enableButton(buttonElement, config);
  }
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButtonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(submitButtonElement, formElement.checkValidity(), config);

  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
      checkInputValidity(inputElement, formElement, config);
    });
  });
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (!formElement.checkValidity()) return;
  });
  toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(function (formElement) {
    setEventListeners(formElement, config);
  });
};

enableValidation(config);