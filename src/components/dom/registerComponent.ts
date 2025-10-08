import '../../help/index.ts'
import Block from "../../tools/Block.ts";
import Form from "../form/form.ts";
import Input from '../Input/Input.ts';
import Popup from "../popup/popup.ts";
import { LeftPanel } from "../../Chats/LeftSide/leftSide.ts";
import { ChatList } from "../../Chats/LeftSide/chatList/chatList.ts";
import SearchContact from "../../Chats/LeftSide/searchContact/searchContact.ts";
import Contacts from "../../Chats/LeftSide/cotacts/contacts.ts";
import Dialog from "../../Chats/RightSide/Dialog/Dialog.ts";
import InputBar from "../../Chats/RightSide/InputBar/InputBar.ts";
import Message from "../../Chats/RightSide/message/message.ts";
import RightSide from "../../Chats/RightSide/rightSide.ts";
import Button from "../Button/Button.ts";
import Handlebars, { HelperOptions } from 'handlebars';
import Modal from '../Modal/modal.ts';
export function registerComponent(name: string, Component: typeof Block) {
  if (name in Handlebars.helpers) {
    throw `The ${name} component is already registered!`;
  }

  Handlebars.registerHelper(
    name,
    function (this: unknown, { hash, data, fn }: HelperOptions) {
      const component = new Component(hash);
      const dataAttribute = `data-id="${component.id}"`;

      if ("ref" in hash) {
        (data.root.__refs = data.root.__refs || {})[hash.ref] = component;
      }

      (data.root.__children = data.root.__children || []).push({
        component,
        embed(fragment: DocumentFragment) {
          const stub = fragment.querySelector(`[${dataAttribute}]`);

          if (!stub) {
            return;
          }

          component.getContent()?.append(...Array.from(stub.childNodes));

          stub.replaceWith(component.getContent()!);
        },
      });

      const contents = fn ? fn(this) : "";

      return `<div ${dataAttribute}>${contents}</div>`;
    }
  );
}

registerComponent("Form", Form);
registerComponent("Button", Button);
registerComponent("Input", Input);
registerComponent("Popup", Popup);
registerComponent("Modal", Modal);
registerComponent("LeftPanel", LeftPanel);
registerComponent("ChatList", ChatList);
registerComponent("SearchContact", SearchContact);
registerComponent("Contacts", Contacts);
registerComponent("Dialog", Dialog);
registerComponent("InputBar", InputBar);
registerComponent("Message", Message);
registerComponent("RightSide", RightSide);


