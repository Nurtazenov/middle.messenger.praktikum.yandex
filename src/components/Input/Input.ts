import { validateInput } from "../../Auth/validate.ts";
import Block from "../../tools/Block.ts";
import { activatePlaceholder, deactivatePlaceholder } from "../dom/activateInputFocus.ts";
import template from './input.hbs';
import './Input.scss';
interface InputProps {
  inputName: string;
  inputLabel: string;
  inputType: string;
  inputMainClass: string;
  inputClass: string;
  labelClass: string;
  inputValue: unknown;
  isEditing?: boolean;
  onClick?: () => void;
  events?: {
    click: () => void;
  };
}
export default class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        focus: (e: Event) => {
          activatePlaceholder(e.target as HTMLInputElement);
        },
        focusout: (e: Event) => {
          deactivatePlaceholder(e.target as HTMLInputElement)
          validateInput(e.target as HTMLInputElement)
        }
      }
    })
  }
  getEvents() {
    return this.props.events;
  }

  render() {
    return this.compile(template, this.props)
  }
}
