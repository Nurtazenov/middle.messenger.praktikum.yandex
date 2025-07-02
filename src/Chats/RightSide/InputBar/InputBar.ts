import messagesController from "../../../controller/message.controller";
import Block from "../../../tools/Block";
import template from './InputBar.hbs';
import arrowBtn from './../../../pictures/arrowBtn.png';
import paperclip from './../../../pictures/paperclip-svgrepo-com.svg';
import './InputBar.scss';
function handleSendMessage(e: Event, block: Block) {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const message = form.message.value.trim();

  if (message) {
    const selectedChat = block.getProps("selectedChat");

    if (selectedChat) {
      messagesController.sendMessage(selectedChat, message);
      const chatWindow = document.querySelector(
        ".conversation__messages-container"
      );
      chatWindow?.scrollTo(0, chatWindow.scrollHeight);
    }

    form.reset();
  } else {
    triggerShakeAnimation();
    throw new Error("Поле сообщения пустое");
  }
}

function triggerShakeAnimation() {
  const submitButton = document.querySelector(".input-bar__send-button");
  const textArea = document.querySelector(".dialog__input-bar__input");

  if (submitButton && textArea) {
    submitButton.classList.add("shake");
    textArea.classList.add("shake");

    setTimeout(() => {
      submitButton.classList.remove("shake");
      textArea.classList.remove("shake");
    }, 300);
  }
}

export default class InputBar extends Block {
  constructor(props: any) {
    super({
      ...props,
      paperclip,
      arrowBtn,
      handleSubmit: (e: Event) => handleSendMessage(e, this),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
