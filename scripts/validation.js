function showErrorMessage(inputElement, errorElement) {
  inputElement.classList.add('popup__input_state_invalid');
  errorElement.textContent = inputElement.validationMessage;
};

function hideErrorMessage(inputElement, errorElement) {
  inputElement.classList.remove('popup__input_state_invalid');
  errorElement.textContent = inputElement.validationMessage;
};

function checkInputValidity(inputElement, formElement) {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  if (!isInputValid) {
    showErrorMessage(inputElement, errorElement);
  } else {
    hideErrorMessage(inputElement, errorElement);
  };
};

function disableButton(buttonElement) {
  buttonElement.disabled = 'disabled';
  buttonElement.classList.add('popup__save-button_disabled');
}

function enableButton(buttonElement) {
  buttonElement.disabled = false;
  buttonElement.classList.remove('popup__save-button_disabled');
}

function toggleButtonState(buttonElement, isActive) {
  if (!isActive) {
    disableButton(buttonElement);
  } else {
    enableButton(buttonElement);
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const submitButtonElement = formElement.querySelector('.popup__save-button');

  toggleButtonState(submitButtonElement, formElement.checkValidity());
  
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      toggleButtonState(submitButtonElement, formElement.checkValidity());
      checkInputValidity(inputElement, formElement);
    });
  });
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach(function (formElement) {
    setEventListeners(formElement);
  });
};

enableValidation();