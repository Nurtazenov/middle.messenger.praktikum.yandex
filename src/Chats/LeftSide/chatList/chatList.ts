import Block from "../../../tools/Block";
import { IContact } from "../cotacts/contacts";
import template from'./chatList.hbs'

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
