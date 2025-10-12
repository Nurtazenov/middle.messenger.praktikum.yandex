import { BaseAPI } from './base-api.ts';
import { IUser } from './user.interface.ts';
export interface ChatInfo {
  id: number ;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: IUser;
    time: string;
    content: string;
  };
}
export class ChatsAPI extends BaseAPI {
    constructor() {
      super("/chats");
    }
  
    create(title: string) {
      return this.http.post("/", { title });
    }
  
    delete(id: number): Promise<unknown> {
      return this.http.delete("/", { chatId: id });
    }
  
    read(): Promise<ChatInfo[]> {
      return this.http.get("/");
    }
  
    getUsers(id: number): Promise<Array<IUser & { role: string }>> {
      return this.http.get(`/${id}/users`);
    }
  
    addUsers(id: number, users: number[]): Promise<unknown> {
      return this.http.put("/users", { users: users, chatId: id });
    }
  
    deleteUsers(id: number, users: number[]): Promise<unknown> {
      return this.http.delete("/users", { users: users, chatId: id });
    }
  
    addChatAvatar(formData: FormData): Promise<unknown> {
      return this.http.put("/avatar", formData);
  }
  
    async getToken(id: number): Promise<string> {
      const response = await this.http.post<{ token: string }>(
        `/token/${id}`,
        {}
      );
  
      return response.token;
    }
  
    update = undefined;
    request = undefined;
  }
  const chatAPI = new ChatsAPI()
  export default chatAPI;
