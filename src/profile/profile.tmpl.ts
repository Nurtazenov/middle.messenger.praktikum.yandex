import Block from '../tools/Block';
import store, { withStore } from '../tools/Store';
import './Profile.scss'
import template from "./profile.hbs";
import union from '../pictures/avatrar.jpg'
import { IUser } from '../api/user.interface';
import arrowBtn from './../pictures/arrowBtn.png'
import { api_url } from '../api/api.const';
import { router, routs } from '../tools/Router';
import ErrorModal from '../components/Modal/ErrorModal';
import userController from '../controller/user.controller';
import auth from '../controller/auth.controller';
import Button from '../components/Button/Button';
import { validateForm } from '../Auth/validate';
import { createButtons, createInputs } from '../const/profile/profile';

const avatarPath =  `${api_url}/resources/`; 
class setProfile extends Block {
  constructor() {
    const state = store.getState();

    const currentUserData = state.user || {};

    super({
      currentUserData: currentUserData,
      avatar:
        currentUserData.avatar !== null
          ? `${avatarPath}${currentUserData.avatar}`
          : union,
      avatarChangeVisibility: "hidden",
      passwordChangeVisibility: "hidden",
      onAvatarChange: (e: Event) => this.handleChangeAvatar(e),
      onAvatarClick: () => this.handleAvatarClick(),
      onPasswordToggle: () => this.handleChangePasswordClick(),
    });

    this.props.isEditing = false;

    this.props.buttons = createButtons(
      this.toggleEditing.bind(this),
      this.handleChangePasswordClick.bind(this)
    );
    this.props.inputs = createInputs(currentUserData, this.props.isEditing);
    this.props.union = union;
    this.props.arrowBtn = arrowBtn;
    this.props.saveChanges = this.saveChanges.bind(this);

    this.props.onChangePage = (e: MouseEvent) => {
      e.preventDefault();
      router.go(routs.messenger);
    };
  }

  toggleEditing() {
    this.setProps({ isEditing: !this.props.isEditing });
  }

  handleChangeAvatar = async (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const avatarInput = form.querySelector(
      'input[name="avatar"]'
    ) as HTMLInputElement;
    if (avatarInput && avatarInput.files?.length) {
      const avatarFile = avatarInput.files[0];

      const MAX_FILE_SIZE = 5 * 1024 * 1024;
      if (avatarFile.size > MAX_FILE_SIZE) {
          ErrorModal(`Размер файла слишком велик. Максимальный размер 5 МБ.`)
        return;
      }

      await userController.updateUserAvatar(form);
      this.setProps({ avatarChangeVisibility: "hidden" });
    } else {
          ErrorModal(`Файл для аватара не выбран`)
    }
  };

  handleAvatarClick = () => {
    this.setProps({
      avatarChangeVisibility:
        this.props.avatarChangeVisibility === "visible" ? "hidden" : "visible",
    });

  };

  handleChangePasswordClick = () => {
    this.setProps({
      passwordChangeVisibility:
        this.props.passwordChangeVisibility === "visible"
          ? "hidden"
          : "visible",
    });
  }

  saveChanges(e: MouseEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const formIsValid = validateForm(form);
    if (formIsValid) {
      const formData = new FormData(form);

      if (formData.get("oldPassword")) {
        userController.changePassword(form);

        this.setProps({
          inputs: createInputs(
            this.props.currentUserData,
            this.props.isEditing
          ),
        });

        this.setProps({
          buttons: createButtons(
            this.toggleEditing.bind(this),
            this.handleChangePasswordClick.bind(this)
          ),
        });
        this.setProps({ passwordChangeVisibility: "hidden" });
        this.setProps({ avatarChangeVisibility: "hidden" });
        return;
      }
      userController.updateUserInfo(form);
      this.setProps({
        inputs: createInputs(this.props.currentUserData, this.props.isEditing),
      });

      this.setProps({
        buttons: createButtons(
          this.toggleEditing.bind(this),
          this.handleChangePasswordClick.bind(this)
        ),
      });

      this.setProps({ isEditing: false });
    } else {
      throw new Error("Form is invalid");
    }
  }

  async init() {
    try {
      const userState = await auth.getUser();
      if (userState) {
        store.set("user", userState);
        this.setProps({
          avatar:
            userState.avatar !== null
              ? `${avatarPath}${userState.avatar}`
              : union,
        });
      }
    } catch (error) {
      // console.error("Ошибка данных пользователя:", error);
    }
  }

  render() {
    const isEditing = this.props.isEditing;
    const buttons = isEditing
      ? [
          new Button({
            buttonText: "Сохранить изменения",
            buttonClass: "button_primary",
            buttonType: "submit",
          }),
        ]
      : this.props.buttons;

    const inputs = createInputs(this.props.currentUserData || {}, isEditing);

    return this.compile(template, {
      ...this.props,
      buttons,
      inputs,
      avatarChangeVisibility: this.props.avatarChangeVisibility,
    });
  }
}

const mapStateToProps = (state: { user: IUser }) => {
  return {
    currentUserData: state.user || {},
  };
};
export default withStore(mapStateToProps)(setProfile);
