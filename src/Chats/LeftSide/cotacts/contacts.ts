import chatController from "../../../controller/chat.controller";
import Block from "../../../tools/Block";
import union from '../../../pictures/avatrar.jpg'
import template from './contacts.hbs'
import './contacts.scss'
export interface IContact{
    chatId: string | number;
    chatName: string;
    lastMessageDate: string;
    newMessages: number;
}
export default class Contacts extends Block{
    constructor(props:IContact){
    super();
    const hasNewMessages = props.newMessages !== 0; 
        this.setProps({
      ...props,
      hasNewMessages,
      icon: union,
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
  render(){
      return this.compile(template, this.props)
  }

}

