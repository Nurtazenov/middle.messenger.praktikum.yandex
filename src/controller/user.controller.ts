import resourcersApi from "../api/resourcers-api";
import store from "../tools/Store";
import userApi from "../api/user-api";
import ErrorModal from "../components/Modal/ErrorModal";
import { validateForm } from "../Auth/validate";
import { IUser } from "../api/user.interface";

class UsersController {
public async updateUserInfo(form: HTMLFormElement) {
    try {
      const formIsValid = validateForm(form);

      if (!formIsValid) {
        throw new Error("User data is invalid to update");
      }

      const formData = new FormData(form);
      const data = {
        id: formData.get("id") as unknown as number,
        first_name: formData.get("first_name") as string,
        second_name: formData.get("second_name") as string,
        login: formData.get("login") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        display_name: formData.get("display_name") as string,
        password: formData.get("password") as string,
        avatar: formData.get("avatar") as string
      };

      const user = await userApi.update(data);
      store.set("user", user);
    } catch (e) {
      // ErrorModal(`${e}`);
    }
  }

  public async updateUserAvatar(form: HTMLFormElement) {
    try {
      const formData = new FormData(form);

      const response = await userApi.updateAvatar(formData) as IUser;
      if (response) {
        if (response && response.avatar) {
          store.set("user.avatar", response.avatar);
        }
      }
    } catch (e) {
      // ErrorModal(`${e}`);
    }
  }

  public async getUserAvatar(id: string) {
    try {
      const avatarPath = await resourcersApi.getAvatar(id);
      store.set("user.avatar", avatarPath);
    } catch (e) {
      // ErrorModal(`${e}`);
    }
  }

  public async changePassword(form: HTMLFormElement) {
    try {
      const formIsValid = validateForm(form);

      if (!formIsValid) {
        throw new Error("password data is invalid to update");
      }

      const formData = new FormData(form);
      const data = {
        oldPassword: formData.get("oldPassword") as string,
        newPassword: formData.get("newPassword") as string,
      };

      await userApi.changePassword(data);
    } catch (e) {
      // ErrorModal(`${e}`);
    }
  }

  public async searchUsers(login: string): Promise<IUser[]> {
    try {
      const res = await userApi.searchUsers(login);
      return res;
    } catch (e) {
      // ErrorModal(`${e}`);
      throw e;
    }
  }
}


export default new UsersController();


