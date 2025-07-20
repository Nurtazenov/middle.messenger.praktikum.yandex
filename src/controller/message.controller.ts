import { IMessage } from "../Chats/RightSide/message/message.interface";
import ErrorModal from "../components/Modal/ErrorModal";
import store from "../tools/Store";
import WSTransport, { WSTransportEvents } from "../tools/WebSocket";
import chatController from "./chat.controller";
import processMessages from "./processMessages";

class MessagesController {
    private sockets: Map<number, WSTransport> = new Map();

  async connect(id: number, token: string) {
    try {
      if (this.sockets.has(id)) {
        return;
      }

      const userId = store.getState().user.id;

      if (!userId || !token) {
        ErrorModal(`User ID or token is missing`);
      }

      const wsTransport = new WSTransport(
        `wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`
      );
      this.sockets.set(id, wsTransport);

      await wsTransport.connect();

      this.subscribe(wsTransport, id);
      this.fetchOldMessages(id);
    } catch (e) {
       console.error("Failed to connect to chat", e);
       ErrorModal(`${e}`);
    }
  }

  sendMessage(id: number, message: string) {
    try {
      const socket = this.sockets.get(id);

      if (!socket) {
        throw new Error(`Chat ${id} is not connected`);
      }

      if (socket.readyState === WebSocket.CONNECTING) {
        this.waitForSocketConnection(socket).then(() => {
          if (message.length > 0) {
            socket.send({ type: "message", content: message });
          }
        });
        return;
      }

      if (socket.readyState !== WebSocket.OPEN) {
        return;
      }

      socket.send({ type: "message", content: message });
    } catch (e) {
      ErrorModal(`${e}`);
    }
  }

  async fetchOldMessages(id: number) {
    try {
      const socket = this.sockets.get(id);

      if (!socket) {
        throw new Error(`Chat ${id} is not connected`);
      }

      if (socket.readyState === WebSocket.CONNECTING) {
        await this.waitForSocketConnection(socket);
      }

      if (socket.readyState === WebSocket.OPEN) {
        socket.send({ type: "get old", content: "0" });
      } else {

      }
    } catch (e) {
    }
  }

  private waitForSocketConnection(socket: WSTransport): Promise<void> {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  }

  closeAll() {
    try {
      Array.from(this.sockets.values()).forEach((socket) => socket.close());
    } catch (e) {
    }
  }

  private onMessage(id: number, messages: IMessage | IMessage[]) {
    try {
      let messagesToAdd: IMessage[] = [];

      if (Array.isArray(messages)) {
        if (messages.length === 0) {
        } else {
          messagesToAdd = messages.reverse();
        }
      } else if (messages) {
        messagesToAdd.push(messages);
      }


      const currentMessages = store.getState().messages[id] || [];
      const filteredMessagesToAdd = messagesToAdd.filter((newMessage) => {
        return !currentMessages.some(
          (existingMessage) => existingMessage.id === newMessage.id
        );
      });

      if (filteredMessagesToAdd.length > 0) {
        const updatedMessages = [...currentMessages, ...filteredMessagesToAdd];
        const processedMessages = processMessages(updatedMessages);
        store.set(`messages.${id}`, processedMessages);
      }

      const chats = store.getState().chats;
      const updatedChats = chats.map((chat) => {
        if (chat.id === id) {
          const lastMessage = messagesToAdd.reduce((latest, current) => {
            return new Date(latest.time) > new Date(current.time)
              ? latest
              : current;
          });

          return {
            ...chat,
            last_message: {
              user: {
                id: lastMessage.user_id,
              },
              content: lastMessage.content,
              time: lastMessage.time,
            },
          };
        }
        return chat;
      });
      store.set("chats", updatedChats);
    } catch (e) {
    }
  }

  private onClose(id: number) {
    try {
      this.sockets.delete(id);
  
      chatController.getToken(id).then((token) => {
        if (token) {
          this.connect(id, token);
        } else {
        }
      });
    } catch (e) {
    }
  }
  
  private subscribe(transport: WSTransport, id: number) {
    try {
      transport.on(WSTransportEvents.Message, (rawData: unknown) => {
        try {
          const parsedData =
            typeof rawData === "string" ? JSON.parse(rawData) : rawData;

          if (Array.isArray(parsedData)) {
            this.onMessage(id, parsedData as IMessage[]);
          } else if (parsedData) {
            this.onMessage(id, parsedData as IMessage);
          } else {
          }
        } catch (e) {
        }
      });

      transport.on(WSTransportEvents.Close, () => this.onClose(id));
      transport.on(WSTransportEvents.Error, () => {
      });
    } catch (e) {
      // console.error(e);
    }
  }
}

const messagesController = new MessagesController();

export default messagesController;


