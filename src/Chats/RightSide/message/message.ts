import Block from "../../../tools/Block";
import template from './message.hbs'
export interface IMessageItem {
  text: string;
  time: string;
  showDate: boolean;
  isCurrentUser: boolean;
}

class Message extends Block{
  constructor(props: IMessageItem) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
export default Message;


