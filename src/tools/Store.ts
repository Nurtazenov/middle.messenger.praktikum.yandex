import { ChatInfo } from "../api/chat-api";
import { IUser } from "../api/user.interface";
import { set } from "../help/store.helper";
import Block from "./Block";
import EventBus from "./EventBus";
import isEqual from "./isEqual";
interface IMessage {
  id: number;
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
}
interface State {
    user: IUser;
    chats: ChatInfo[];
    messages: Record<number, IMessage[]>;
    selectedChat: number;
  }
  
  export enum StoreEvents {
    Updated = "updated",
  }
  
class Store extends EventBus {
  private state: any = {};

  public getState(): State {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }

  public isUserAuthorized(): boolean {
    return !!this.state.user;
  }
}
  
export function withStore(mapStateToProps: (state: State) => any) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(props: any) {
        let state = mapStateToProps(store.getState());
        super({ ...props, ...state });

        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }
          state = newState;
        });
      }
    };
  };
}
  
  const store = new Store();
  export default store;
