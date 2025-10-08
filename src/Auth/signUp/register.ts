import template from './register.hbs'
import Block from '../../tools/Block.ts';
import { createButtons, createInputs } from '../../const/signup/signup.ts';
import auth from '../../controller/auth.controller.ts';
import './register.scss'
const handleFormSubmit = (e: Event) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  auth.signup(form);
};
export default class setRegister extends Block {
  constructor() {
    super({
      buttons: createButtons(),
      inputs: createInputs(),
      onSubmitForm: (e: Event) => handleFormSubmit(e),
    });
  }

  render() {
    return this.compile(template, this.props);
  }

}
 
  

