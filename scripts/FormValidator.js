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
    this._submitButton.disabled = true;
    this._submitButton.classList.add(this._inactiveButtonClass);
  };

  _enableButton() {
    this._submitButton.disabled = false;
    this._submitButton.classList.remove(this._inactiveButtonClass);
  };

  toggleButtonState() {
    const isValid = this._inputs.every(input => input.validity.valid);

    if (!isValid) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _setEventListeners() {
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this.toggleButtonState();

    this._inputs.forEach(input => {
      input.addEventListener('input', () => {
        this.toggleButtonState();
        this._checkInputValidity(input);
      });
    });

    this.toggleButtonState();
  };

  enableValidation() {
    this._setEventListeners();
  };
}

export { FormValidator };