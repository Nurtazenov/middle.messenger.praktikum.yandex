/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {EventBus} from "./EventBus.ts";

export enum WSTransportEvents {
    Connected = "connected",
    Error = "error",
    Message = "message",
    Close = "close",
  }
  
export default class WSTransport extends EventBus {
  private socket: WebSocket | null = null;
  private pingInterval: NodeJS.Timeout | number = 0;

  constructor(private url: string) {
    super();
  }

  public get readyState(): number | undefined {
    return this.socket?.readyState;
  }

  public send(data: unknown) {
    if (!this.socket) {
      throw new Error("Socket is not connected");
    }

    if (this.socket.readyState !== WebSocket.OPEN) {
      return;
    }

    this.socket.send(JSON.stringify(data));
  }

  public connect(): Promise<void> {
    this.socket = new WebSocket(this.url);

    this.subscribe(this.socket);

    this.setupPing();

    return new Promise((resolve) => {
      this.on(WSTransportEvents.Connected, () => {
        resolve();
      });
    });
  }

  public close() {
    this.socket?.close();
  }

  private setupPing() {
    this.pingInterval = setInterval(() => {
      this.send({ type: "ping" });
    }, 5000);

    this.on(WSTransportEvents.Close, () => {
      clearInterval(this.pingInterval);
      this.pingInterval = 0;
    });
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener("open", () => {
      this.emit(WSTransportEvents.Connected);
    });
    socket.addEventListener("close", () => {
      this.emit(WSTransportEvents.Close);
    });

    socket.addEventListener("error", (e) => {
      this.emit(WSTransportEvents.Error, e);
    });

    socket.addEventListener("message", (message) => {
      try {
        const data = JSON.parse(message.data);

        if (data.type && data.type === "pong") {
          return;
        }

        this.emit(WSTransportEvents.Message, data);
      } catch (e) {
        // console.error(e);
      }
    });
  }
}



