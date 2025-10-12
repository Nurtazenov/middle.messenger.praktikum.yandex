import { BaseAPI } from "./base-api.ts";
import { ILogin, ISignUp, IUser } from "./user.interface.ts";

class AuthApi extends BaseAPI {
    constructor() {
    super("/auth");
  }
  async signin(data: ILogin) {
    return this.http.post("/signin", data);
  }

  async signup(data: ISignUp) {
    return this.http.post("/signup", { ...data });
  }

  async getUser(): Promise<IUser> {
    return this.http.get("/user");
  }

  async logout() {
    return this.http.post("/logout", {});
  }

  create = undefined;
  update = undefined;
  delete = undefined;
  request = undefined;
}
export default new AuthApi();
