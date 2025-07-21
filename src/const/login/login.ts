import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

import { router, routs } from "../../tools/Router";

export const createInputs = () => [
  new Input({
    inputName: "login",
    inputLabel: "Логин",
    inputType: "text",
    inputMainClass: "dynamic-input",
    inputClass: "dynamic-input__data",
    labelClass: "dynamic-input__placeholder",
    inputValue: "",
    isEditing: true,
  }),
  new Input({
    inputName: "password",
    inputLabel: "Пароль",
    inputType: "password",
    inputMainClass: "dynamic-input",
    inputClass: "dynamic-input__data",
    labelClass: "dynamic-input__placeholder",
    inputValue: "",
    isEditing: true,
  }),
];

export const createButtons  = () => [
  new Button({
    buttonText: "Авторизоваться",
    buttonClass: "button_primary",
    buttonType: "submit",
  }),
  new Button({
    buttonText: "Нет аккаунта?",
    buttonClass: "button_text",
    buttonType: "button",
    onClick: (e: MouseEvent) => {
      e.preventDefault();      
      router.go(routs.signUp)
    },
  }),
];
