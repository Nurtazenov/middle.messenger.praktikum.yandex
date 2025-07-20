import chatController from "../../../controller/chat.controller";
import Block from "../../../tools/Block";
import union from "../../../pictures/avatrar.jpg";
import template from "./contacts.hbs";
import "./contacts.scss";
import { api_url } from "../../../api/api.const";
export interface IContact {
  chatId: any;
  avatar: string;
  chatName: string;
  lastMessageDate: string;
  newMessages: number;
}
export default class Contacts extends Block {
  constructor(props: IContact) {
    super(props);
    console.log("proops", props);
    console.log("props.avatar", props.avatar);
    const avatarPath = `${api_url}/resources/`;
    const icon = props.avatar?.startsWith("/")
      ? `${avatarPath}${props.avatar}`
      : props.avatar || union;

    const hasNewMessages = props.newMessages;
    this.setProps({
      ...props,
      hasNewMessages,
      icon: icon,
    });

    this.setProps({
      events: {
        click: this.onChatClick.bind(this),
      },
    });
  }

  onChatClick() {
    chatController.selectChat(this.props.chatId);
  }

  render() {
    return this.compile(template, this.props);
  }
}
