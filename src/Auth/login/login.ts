import template from "./login.hbs"
import Block from '../../tools/Block';
import auth from '../../controller/auth.controller';
import { createButtons, createInputs } from '../../const/login/login';
import { initializeValidationListeners } from '../validate';
import './login.scss'
const handleFormSubmit = (e: Event) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  auth.login(form);
};
export default class setLogin extends Block {
constructor() {
    super({
      buttons: createButtons(),
      inputs: createInputs(),
      onSubmitForm: (e: Event) => handleFormSubmit(e),
    });
  }

  componentDidMount() {
    const form = this.getContent() as HTMLFormElement;
    initializeValidationListeners(form);
  }

  render() {
    return this.compile(template, this.props);
  }

}
