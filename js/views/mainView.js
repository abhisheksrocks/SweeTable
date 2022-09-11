import { elements } from "./base.js";

export const updateContent = (htmlContent) => {
  elements.mainContent.call().innerHTML = htmlContent;
};
