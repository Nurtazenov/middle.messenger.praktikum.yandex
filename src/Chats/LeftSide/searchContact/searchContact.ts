import chatController from "../../../controller/chat.controller";
import Block from "../../../tools/Block"
import { router, routs } from "../../../tools/Router";
import template from './searchContact.hbs';
import searchIcon from '../../../pictures/icons8-search.svg';
import './searchContact.scss'
export default class SearchContact extends Block{
  constructor() {
    super({
      searchIcon: searchIcon,
      showChatPopup: "hidden",
      profileButton: {
        buttonText: "Профиль >",
        buttonClass: "button_link",
        buttonType: "button",
      },
      createChatButton: {
        buttonText: "Новый чат",
        buttonClass: "button_link",
        buttonType: "button",
      },
      onChangePage: (e: MouseEvent) => {
        e.preventDefault();
        router.go(routs.settings);
      },
      onOpenCreateChat: (e: MouseEvent) => {
        e.preventDefault();
        this.toggleCreateChatPopup();
      },
      handleChatCreate: (e: Event) => this.handleCreateChat(e),
      toggleChatCreate: () => this.toggleCreateChatPopup(),
    });
  }

  toggleCreateChatPopup() {
    const newPopupState =
      this.props.showChatPopup === "hidden" ? "visible" : "hidden";
    this.setProps({ showChatPopup: newPopupState });
  }

  handleCreateChat = (e: Event) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    const title = form.get("title");

    chatController.create(title as string);
  };

  render() {
    return this.compile(template, this.props);
  }
}
