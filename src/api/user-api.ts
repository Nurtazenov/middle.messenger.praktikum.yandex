import ErrorModal from "../components/Modal/ErrorModal";
import { BaseAPI } from "./base-api";
import { IChangePassword, IUser } from "./user.interface";

class UsersApi extends BaseAPI {
  constructor() {
    super("/user");
  }
  update(data: IUser): Promise<IUser> {
    return this.http.put("/profile", data);
  }

  updateAvatar(data: FormData) {
    return this.http
      .put("/profile/avatar", data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (error.message.includes("Request timed out")) {
        } else {
          ErrorModal(`Ошибка при обновлении аватара`)
        }
        throw error;
      });
  }

  changePassword(data: IChangePassword) {
    return this.http.put("/password", data);
  }

  getUser(): Promise<IUser> {
    return this.http.get("/user");
  }

  searchUsers(login: string): Promise<IUser[]> {
    return this.http.post("/search", { login: login });
  }

  logout() {
    return this.http.post("/logout", {});
  }
  create = undefined;
  delete = undefined;
  request = undefined;
}

export default new UsersApi();
