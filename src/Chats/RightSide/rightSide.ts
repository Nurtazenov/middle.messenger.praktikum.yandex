import chatController from "../../controller/chat.controller";
import Block from "../../tools/Block";
import { withStore } from "../../tools/Store";
import union from './../../pictures/avatrar.jpg'
import { IMessage } from "./message/message.interface";
import template from './rightSide.hbs'
import './rightSide.scss'
export  interface PropsMessages {
  messages: IMessage[];
  avatar: string;
}
class RightSide extends Block{
  constructor(props: PropsMessages) {
    super({
      ...props,
      avatar: union,
      messages: props.messages,
    });
  }

  componentDidMount() {
    chatController.fetchChats();
  }

  render() {
    return this.compile(template, this.props);
  }
}
const withChats = withStore((state) => {
  const selectedChatId = state.selectedChat || 0;
  const selectedChat = state.chats?.find((chat) => chat.id === selectedChatId);
  const userId = state?.user?.id;
  const messages = (state.messages || {})[selectedChatId] || [];

  const updatedMessages = messages.map((message: IMessage) => ({
    ...message,
    isMine: message.user_id === userId,
  }));
  return {
    chats: [...(state.chats || [])],
    selectedChat: state.selectedChat,
    messages: updatedMessages,
    userId: state?.user?.id,
    chatName: selectedChat ? selectedChat.title : "Чат",
  };
});
export default withChats(RightSide);
