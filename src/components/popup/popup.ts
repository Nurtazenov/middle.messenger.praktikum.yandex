import Block from "../../tools/Block.ts";
import template from './popup.hbs';
import './popup.scss';
interface PopupProps {
  onClick: () => void;
  visibility: string;
  events: {
    // eslint-disable-next-line no-unused-vars
    click: (event: MouseEvent) => void;
  };
}
export default class Popup extends Block {
   constructor(props: PopupProps) {
    super({
      ...props,
      events: {
        click: (event: MouseEvent) => this.handleClick(event),
      },
    });
  }

  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target && target.dataset.close === "true") {
      if (this.props.onClick) {
        this.props.onClick();
      }
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
