function activatePlaceholder(input: HTMLElement): void {
  const placeholder = input.querySelector(
    ".dynamic-input__placeholder"
  ) as HTMLElement | null;
  if (placeholder) {
    placeholder.classList.add("dynamic-input__placeholder_active");
    placeholder.style.top = "3px";
  }
}

function deactivatePlaceholder(input: HTMLElement): void {
  const placeholder = input.querySelector(
    ".dynamic-input__placeholder"
  ) as HTMLElement | null;
  if (placeholder) {
    placeholder.classList.remove("dynamic-input__placeholder_active");
    placeholder.style.top = "50%";
  }
}

const initializeInputFocusHandlers = (
  inputs: NodeListOf<HTMLElement>
): void => {
  inputs.forEach((input: HTMLElement) => {
    const inputData = input.querySelector(
      ".dynamic-input__data"
    ) as HTMLInputElement | null;
    if (inputData) {
      inputData.addEventListener("focus", () => {
        activatePlaceholder(input);
      });
      inputData.addEventListener("focusout", () => {
        if (inputData.value.length > 0) return;
        deactivatePlaceholder(input);
      });
    }
  });
};

export {
  initializeInputFocusHandlers,
  activatePlaceholder,
  deactivatePlaceholder,
};
