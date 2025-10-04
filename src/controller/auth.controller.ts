import authApi from "../api/auth-api.ts"; 
import { router, routs } from "../tools/Router.ts";
import ErrorModal from "../components/Modal/ErrorModal.ts";
import chatController from "./chat.controller.ts";
import store from "../tools/Store.ts";
import { IUser } from "../api/user.interface.ts";
import { validateForm } from "../Auth/validate.ts";

class AuthController {
    public async login(form: HTMLFormElement) {
    try {
      const formIsValid = validateForm(form);

      if (!formIsValid) {
        ErrorModal(`Login data is invalid`);
        return;
      }

      const formData = new FormData(form);

      const data = {
        login: formData.get("login") as string,
        password: formData.get("password") as string,
      };

      await authApi
        .signin(data)
        .then(async () => {
          await this.getUser();
          await chatController.fetchChats();
          router.go(routs.messenger);
        })
        .catch((error) => {
          if (error.reason === "Пользователь уже в системе") {
            router.go(routs.messenger); 
          } else if (error.reason) {
            ErrorModal(error.reason);
          } else {
            ErrorModal("Неправильный логин или пароль");
          }
        });
    } catch (e) {
      ErrorModal(`${e}`);
    }
  }

  public async signup(form: HTMLFormElement) {
    try {
      const formIsValid = validateForm(form);

      if (!formIsValid) {
        ErrorModal(`Signup data is invalid`);
        return;
      }

      const formData = new FormData(form);
      const data = {
        first_name: formData.get("first_name") as string,
        second_name: formData.get("second_name") as string,
        login: formData.get("login") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        password: formData.get("password") as string,
      };

      await authApi.signup(data)
      .then( async () => {
        await this.getUser();  
        router.go(routs.messenger);
      })
      .catch((error) => {
        if (error.reason) {
          ErrorModal(error.reason);
        } else {
          ErrorModal("Некорректные данные: логин или email уже используются");
        }
      });
    } catch (e) {
      ErrorModal(`${e}`);
    }
  }

  async logout() {
    try {
      await authApi.logout();
      store.set("user", "");
      router.go("/");
    } catch (e) {
      ErrorModal(`${e}`);
    }
  }

  async getUser(): Promise<IUser | undefined> {
    try {
      const user = await authApi.getUser();
      store.set("user", user);
      return user;
    } catch (e) {
      return undefined;
    }
  }
}

const auth = new AuthController();
export default auth;
