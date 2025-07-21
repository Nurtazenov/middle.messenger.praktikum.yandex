import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

import { router, routs } from "../../tools/Router";

export const createInputs = () => [
  new Input({
    inputName: "email",
    inputLabel: "Почта",
    inputType: "email",
    inputMainClass: "dynamic-input",
    inputClass: "dynamic-input__data",
    labelClass: "dynamic-input__placeholder",
    inputValue: "",
    isEditing: true
  }),
  new Input({
    inputName: "login",
    inputLabel: "Логин",
    inputType: "text",
    inputMainClass: "dynamic-input",
    inputClass: "dynamic-input__data",
    labelClass: "dynamic-input__placeholder",
    inputValue: "",
    isEditing: true
  }),
  new Input({
    inputName: "first_name",
    inputLabel: "Имя",
    inputType: "text",
    inputMainClass: "dynamic-input",
    inputClass: "dynamic-input__data",
    labelClass: "dynamic-input__placeholder",
    inputValue: "",
    isEditing: true
  }),
  new Input({
    inputName: "second_name",
    inputLabel: "Фамилия",
    inputType: "text",
    inputMainClass: "dynamic-input",
    inputClass: "dynamic-input__data",
    labelClass: "dynamic-input__placeholder",
    inputValue: "",
    isEditing: true
  }),
  new Input({
    inputName: "phone",
    inputLabel: "Телефон",
    inputType: "tel",
    inputMainClass: "dynamic-input",
    inputClass: "dynamic-input__data",
    labelClass: "dynamic-input__placeholder",
    inputValue: "",
    isEditing: true
  }),
  new Input({
    inputName: "password",
    inputLabel: "Пароль",
    inputType: "password",
    inputMainClass: "dynamic-input",
    inputClass: "dynamic-input__data",
    labelClass: "dynamic-input__placeholder",
    inputValue: "",
    isEditing: true
  }),
  new Input({
    inputName: "confirmPassword",
    inputLabel: "Пароль (еще раз)",
    inputType: "password",
    inputMainClass: "dynamic-input",
    inputClass: "dynamic-input__data",
    labelClass: "dynamic-input__placeholder",
    inputValue: "",
    isEditing: true
  }),
];

export const createButtons  = () => [
  new Button({
    buttonText: "Зарегистрироваться",
    buttonClass: "button_primary",
    buttonType: "submit",
  }),
  new Button({
    buttonText: "Войти",
    buttonClass: "button_text",
    buttonType: "button",
    onClick: (e: MouseEvent) => {
      e.preventDefault();
      router.go(routs.login)
    },
  }),
];
