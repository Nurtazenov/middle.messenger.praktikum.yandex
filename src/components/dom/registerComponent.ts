import '../../help/index'
import { HelperOptions } from "handlebars"
import Block from "../../tools/Block";
import Form from "../form/form";
import Input from "../Input/input";
import Popup from "../popup/popup";
import { LeftPanel } from "../../Chats/LeftSide/leftSide";
import { ChatList } from "../../Chats/LeftSide/chatList/chatList";
import SearchContact from "../../Chats/LeftSide/searchContact/searchContact";
import Contacts from "../../Chats/LeftSide/cotacts/contacts";
import Dialog from "../../Chats/RightSide/Dialog/Dialog";
import InputBar from "../../Chats/RightSide/InputBar/InputBar";
import Message from "../../Chats/RightSide/message/message";
import RightSide from "../../Chats/RightSide/rightSide";
import Button from "../Button/button";
import Handlebars from 'handlebars';
import Modal from '../Modal/modal';
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
};

registerComponent("Form", Form);
registerComponent("Button", Button);
registerComponent("Input", Input);
registerComponent("Popup", Popup);
registerComponent("Modal", Modal);
registerComponent("LeftPanel", LeftPanel);
registerComponent("СhatList", ChatList);
registerComponent("SearchContact", SearchContact);
registerComponent("Contacts", Contacts);
registerComponent("Dialog", Dialog);
registerComponent("InputBar", InputBar);
registerComponent("Message", Message);
registerComponent("RightSide", RightSide);


