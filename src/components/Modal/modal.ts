import Block from "../../tools/Block";
import modal from "./modal.hbs";
import './modal.scss'
interface IModalProps{
    visibility: string; 
    modalClassName?: string;
    errorMessage?: string; 
}
export default class Modal extends Block {
  constructor(props: IModalProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(modal, this.props);
  }
}
