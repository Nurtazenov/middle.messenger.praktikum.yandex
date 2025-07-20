import "../auth.scss";
import template from './register.hbs'
import Block from '../../tools/Block';
import { createButtons, createInputs } from '../../const/signup/signup';
import auth from '../../controller/auth.controller';
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
 
  

