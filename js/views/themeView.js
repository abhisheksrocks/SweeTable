import { elements } from "./base.js";

let cssVariables = [];

// const themeChangeHandler = (refElement, postChangeCallback) => {
//   if (refElement.classList.contains("theme-switch-button-dark")) {
//     postChangeCallback(false);
//   }
//   if (refElement.classList.contains("theme-switch-button-light")) {
//     postChangeCallback(true);
//   }
// };

export const initialize = (variableList, onThemeChange) => {
  cssVariables = variableList;

  const activeButton = document.querySelector(".theme-switch-button-active");
  if (activeButton.classList.contains("theme-switch-button-light")) {
    changeTheme(true);
  }
  if (activeButton.classList.contains("theme-switch-button-dark")) {
    changeTheme(false);
  }

  elements.themeSwitchButtonContainer.call().addEventListener("click", (e) => {
    const refElement = e.target.closest(".theme-switch-button");

    if (!refElement) return;
    if (refElement.classList.contains("theme-switch-button-light")) {
      changeTheme(true);
      onThemeChange(true);
    }
    if (refElement.classList.contains("theme-switch-button-dark")) {
      changeTheme(false);
      onThemeChange(false);
    }

    // const elements = document.querySelectorAll(".theme-switch-button");
    // elements.forEach((current) => {
    //   current.classList.remove("theme-switch-button-active");
    // });

    // themeChangeHandler(refElement, (toLight) => {
    //   refElement.classList.add("theme-switch-button-active");
    //   onThemeChange(toLight);
    //   //   changeTheme(toLight);
    // });
  });
};

export const changeTheme = (toLight = true) => {
  const refBtn = document.querySelector(
    toLight ? ".theme-switch-button-light" : ".theme-switch-button-dark"
  );
  if (!refBtn) return;
  const elements = document.querySelectorAll(".theme-switch-button");
  elements.forEach((current) => {
    current.classList.remove("theme-switch-button-active");
  });
  refBtn.classList.add("theme-switch-button-active");

  cssVariables.forEach((element) => {
    element.change(toLight);
  });
};
