import Block from "../../tools/Block";
import templateButton from "./button.hbs";
import './button.scss';
interface PropsButton {
  buttonText: string;
  buttonClass: string;
  buttonType?: "submit" | "reset" | "button";
  buttonImage?: string;
  imageAlt?: string;
  buttonImageClass?: string;
  onClick?: (e: MouseEvent) => void;
  events?: {
    click: (e: MouseEvent) => void;
  };
}
export default class Button extends Block {
  constructor(props: PropsButton) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  render() {
    return this.compile(templateButton, this.props);
  }
}
