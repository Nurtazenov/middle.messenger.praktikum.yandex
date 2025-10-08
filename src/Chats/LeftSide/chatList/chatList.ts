import Block from "../../../tools/Block.ts";
import { IContact } from "../cotacts/contacts.ts";
import template from'./chatList.hbs'
import './chatList.scss'

export class ChatList extends Block{
      constructor(props: IContact) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
