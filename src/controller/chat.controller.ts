import chatAPI, { ChatsAPI } from "../api/chat-api";
import store from "../tools/Store";
import { IUser } from "../api/user.interface";
import ErrorModal from "../components/Modal/ErrorModal";
import messagesController from "./message.controller";

class ChatsController {
  private readonly api: ChatsAPI;
  private sockets: Map<number, WebSocket>;

  constructor() {
    this.api = chatAPI;
    this.sockets = new Map();
  }

  async create(title: string) {
    try {
      await this.api.create(title);
      this.fetchChats();
    } catch (e) {
      // ErrorModal(`${e}`);
    }
  }

  async fetchChats() {
    try {
      const chats = await this.api.read();

      if (Array.isArray(chats)) {
        chats.map(async (chat) => {
          const token = await this.getToken(chat.id);

          if (token) {
            await messagesController.connect(chat.id, token);
            await this.fetchLastMessage(chat.id);
          }
        });

        store.set("chats", chats);
        console.log("chats", chats);
      }
    } catch (e) {
      // ErrorModal(`${e}`);
    }
  }

  async fetchLastMessage(id: number) {
    try {
      const socket = this.sockets.get(id);

      if (!socket) {
        throw new Error(`Чат ${id} не соединен`);
      }

      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "get old", content: "1" }));
      } else {
       console.error("WebSocket не открыт:", socket.readyState);
      }
    } catch (e) {
      // ErrorModal(`${e}`);
    }
  }

  addUserToChat(id: number, userId: number) {
    try {
      this.api.addUsers(id, [userId]);
    } catch (e) {
      // ErrorModal(`${e}`);
    }
  }

  async deleteUserFromChat(id: number, userId: number): Promise<void> {
    try {
      await this.api.deleteUsers(id, [userId]);
    } catch (e) {
      ErrorModal(`${e}`);
      throw new Error(`Ошибка при удалении пользователя из чата: ${e}`);
    }
  }

  async delete(id: number) {
    try {
      await this.api.delete(id);
      this.fetchChats();
    } catch (e) {
      // ErrorModal(`${e}`);
    }
  }

  async getToken(id: number): Promise<string | undefined> {
    try {
      const token = await this.api.getToken(id);
      return token;
    } catch (e) {

      return undefined;
    }
  }

  selectChat(id: number) {
    const messagesState = store.getState().messages || {};

    if (!messagesState[id]) {
      messagesState[id] = [];
      store.set("messages", messagesState);
    }

    store.set("selectedChat", id);
    messagesController.fetchOldMessages(id);
  }

  async getUsers(chatId: number): Promise<IUser[]> {
    try {
      const users = await this.api.getUsers(chatId);
      return users;
    } catch (e) {
      // ErrorModal(`${e}`);
      return [];
    }
  }

  async addChatAvatar(formData: FormData) {
    try {
      await this.api.addChatAvatar(formData);
    } catch (e) {
      ErrorModal(`Ошибка при добавлении аватара: ${e}`);
    }
  }
}

const chatController = new ChatsController();

export default chatController;



