class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  };

  _showErrorMessage(input) {
    input.classList.add(this._inputErrorClass);
    const errorElement = this._formElement.querySelector(`.${input.name}-error`);
    errorElement.textContent = input.validationMessage;
  };

  _hideErrorMessage(input) {
    input.classList.remove(this._inputErrorClass);
    const errorElement = this._formElement.querySelector(`.${input.name}-error`);
    errorElement.textContent = ' ';
  };

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showErrorMessage(input);
    } else {
      this._hideErrorMessage(input);
    }
  };

  _disableButton() {
    const submitButton = this._formElement.querySelector(this._submitButtonSelector);
    submitButton.disabled = true;
    submitButton.classList.add(this._inactiveButtonClass);
  };

  _enableButton() {
    const submitButton = this._formElement.querySelector(this._submitButtonSelector);
    submitButton.disabled = false;
    submitButton.classList.remove(this._inactiveButtonClass);
  };

  _toggleButtonState() {
    const inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const isValid = inputs.every(input => input.validity.valid);

    if (!isValid) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _setEventListeners() {
    const inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._toggleButtonState();

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        this._toggleButtonState();
        this._checkInputValidity(input);
      });
    });

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      if (!this._formElement.checkValidity()) return;
    });

    this._toggleButtonState();
  };

  enableValidation() {
    this._setEventListeners();
  };
}

export { FormValidator };