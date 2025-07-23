import { router, routs } from './tools/Router.ts';
import setLogin  from './Auth/login/login.ts';
import  setChat  from './Chats/chats.ts';
import chatController from './controller/chat.controller.ts';
import setRegister from './Auth/signUp/register.ts';
import auth from './controller/auth.controller.ts';
import './styles/main.scss'
import { initializeInputFocusHandlers } from './components/dom/activateInputFocus.ts';
import './components/dom/registerComponent.ts'
import setErrorPage from './ErrorPage/error.ts';
import setProfile from './profile/profile.tmpl.ts';

window.addEventListener("DOMContentLoaded", async () => {
  router.use(routs.login, setLogin)
  .use(routs.signUp, setRegister)
  .use(routs.messenger, setChat)
  .use(routs.settings, setProfile)
  .use(routs.error, setErrorPage)
   try {
    // router.start();
    await auth.getUser();
    await chatController.fetchChats();
  } catch (e) {
    router.start();
  }

  const initializeInputs = () => {
    const inputs = document.querySelectorAll(
      ".dynamic-input"
    ) as NodeListOf<HTMLElement>;
    initializeInputFocusHandlers(inputs);
  };

  initializeInputs();

  const observer = new MutationObserver(initializeInputs);
  observer.observe(document.body, { childList: true, subtree: true });

  const textarea = document.querySelector<HTMLTextAreaElement>(
    ".dialog__input-bar__input"
  );
  if (textarea) {
    textarea.addEventListener("input", () => {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    });
  }
  router.start();
})


