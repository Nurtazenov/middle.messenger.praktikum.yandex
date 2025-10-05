import Modal from "./modal.ts";

function ErrorModal(err:string){
 const errorModal = new Modal({
    visibility: "visible",
    modalClassName: "modal__error modal_min modal_min-top-right",
    errorMessage: err,
  });

  const appElement = document.querySelector("#app");  
  let modalContent: HTMLElement | null = null;

  if (appElement) {
    modalContent = errorModal.getContent();

    if (modalContent) {
      appElement.appendChild(modalContent);
    } else {
      console.error("Ошибка: не удалось получить содержимое модального окна.");
    }
  }

  setTimeout(() => {
    errorModal.setProps({ visibility: "hidden" });
    if (modalContent && modalContent.parentNode) {
      modalContent.parentNode.removeChild(modalContent);
    }
  }, 5000);
}
export default ErrorModal;

