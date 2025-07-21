import { ChatInfo } from "../api/chat-api";
import chatController from "../controller/chat.controller";
import Block from "../tools/Block";
import { withStore } from "../tools/Store";
import template from "./chat.hbs"
import { IMessage } from "./RightSide/message/message.interface";
import './chat.scss';

interface PropsMainPage {
  messages: IMessage[];
  chats: ChatInfo[];
}
class setChat extends Block{
constructor(props: PropsMainPage) {
    super({
      ...props,
      chats: props.chats,
      messages: props.messages,
    });
  }

  init() {
    chatController.fetchChats();
  }

  render() {
    return this.compile(template, this.props);
  }
}

const mapStateToProps = (state: {
  chats: ChatInfo[];
  messages: Record<number, IMessage[]>;
}) => {
  return {
    chats: state.chats,
    messages: state.messages,
  };
};

export default withStore(mapStateToProps)(setChat);
