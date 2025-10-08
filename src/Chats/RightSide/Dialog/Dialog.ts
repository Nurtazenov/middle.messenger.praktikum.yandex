import Block from "../../../tools/Block.ts";
import store from "../../../tools/Store.ts";
import union from '../../../pictures/avatrar.jpg'
import chatController from "../../../controller/chat.controller.ts";
import { IUser } from "../../../api/user.interface.ts";
import userController from "../../../controller/user.controller.ts";
import ErrorModal from "../../../components/Modal/ErrorModal.ts";
import template from './Dialog.hbs';
import ellipseIcon from './../../../pictures/mnogotochie_nn6wzi83jzzh.svg';
import './Dialog.scss'
import { api_url } from "../../../api/api.const.ts";
export default class Dialog extends Block{
 constructor() {
    const selectedChatId = store.getState().selectedChat;
    const chats = store.getState().chats || [];
    const selectedChat = chats.find((chat: any) => chat.id === selectedChatId);

    const avatarUrl =
      selectedChat && selectedChat.avatar
        ? `${api_url}/resources${selectedChat.avatar}`
        : union; 

    super({
      currentUserId: store.getState().user.id,
      ellipseIcon,
      onAvatarPopupClick: () => this.toggleAddChatAvatarPopup(this),
      avatarChangeVisibility: "hidden",
      chatOptionsVisibility: "hidden",
      onOptionsClick: () => this.handleOptionsClick(this),
      addUserPopupVisibility: "hidden",
      onAddUserPopupClick: () => this.toggleAddUserPopup(this),
      handleAddUser: (e: Event) => this.handleAddUser(e, this),
      deleteUserPopupVisibility: "hidden",
      onRemoveUserClick: () => this.toggleDeleteUserPopup(this),
      avatar: avatarUrl,
      chatName: selectedChat?.title,
      users: [],
      handleDeleteUser: (e: Event) => this.handleDeleteUser(e),
      handleSetChatAvatar: (e: Event) => this.handleSetChatAvatar(e),
    });
  }

  async loadUsers() {
    const chatId = store.getState().selectedChat;
    const users = await chatController.getUsers(chatId);
    this.setProps({ users });

    this.bindDeleteUserButtons();
  }

  bindDeleteUserButtons() {
    const deleteButtons = document.querySelectorAll(".button_delete");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", this.handleDeleteUser);
    });
  }

  handleOptionsClick = (block: Block) => {
    block.setProps({
      chatOptionsVisibility:
        this.props.chatOptionsVisibility === "visible" ? "hidden" : "visible",
    });
  };

  toggleDeleteUserPopup = (block: Block) => {
    this.loadUsers();
    block.setProps({
      deleteUserPopupVisibility:
        this.props.deleteUserPopupVisibility === "visible"
          ? "hidden"
          : "visible",
    });
    this.handleOptionsClick(block);
  };

  toggleAddChatAvatarPopup = (block: Block) => {
    this.loadUsers();
    block.setProps({
      avatarChangeVisibility:
        this.props.avatarChangeVisibility === "visible" ? "hidden" : "visible",
    });
    this.handleOptionsClick(block);
  };

  toggleAddUserPopup = (block: Block) => {
    this.loadUsers();
    block.setProps({
      addUserPopupVisibility:
        this.props.addUserPopupVisibility === "visible" ? "hidden" : "visible",
    });
    this.handleOptionsClick(block);
  };

  handleAddUser = async (e: Event, block: Block) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const chatId = store.getState().selectedChat;
    const userList: IUser[] = await userController.searchUsers(
      formData.get("login") as string
    );
    const user = userList[0];
    await chatController.addUserToChat(chatId, user.id);
    block.setProps({ addUserPopupVisibility: "hidden" });
  };

  handleDeleteUser = (e: Event) => {
    const button = e.target as HTMLElement;
    const userIdString = button.getAttribute("data-user-id");

    if (userIdString) {
      const userId = parseInt(userIdString, 10);
      const chatId = store.getState().selectedChat;

      chatController
        .deleteUserFromChat(chatId, userId)
        .then(() => this.loadUsers())
        .catch(() => ErrorModal(`Ошибка при удалении пользователя`));
    }
  };

  handleSetChatAvatar = async (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector(
      'input[name="avatar"]'
    ) as HTMLInputElement;
    const file = input?.files?.[0];

    if (!file) {
      ErrorModal("Файл не выбран.");
      return;
    }

    const chatId = store.getState().selectedChat;
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("chatId", chatId.toString());

    console.log("Проверка formData перед отправкой", formData);

    try {
      await chatController.addChatAvatar(formData);

      await chatController.fetchChats();

      this.updateChatAvatar();
      this.setProps({ avatarChangeVisibility: "hidden" });
      console.log("Аватар успешно загружен.");
    } catch (error) {
      ErrorModal(`Ошибка при изменении аватара: ${JSON.stringify(error)}`);
    }
  };

  updateChatAvatar() {
    const chatId = store.getState().selectedChat;
    const chats = store.getState().chats;
    const selectedChat = chats.find((chat: any) => chat.id === chatId);

    if (selectedChat && selectedChat.avatar) {
      this.setProps({
        avatar: `${api_url}/resources${selectedChat.avatar}`,
      });
    }
  }

  render() {
    return this.compile(template, this.props);
  }
  componentDidMount() {
    this.loadUsers();
  }
}

