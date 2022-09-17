import { elements } from "./base.js";

export const updateContent = (htmlContent) => {
  elements.mainContent.call().innerHTML = htmlContent;
};

export const showLoader = () => {
  elements.mainContent.call().innerHTML = `
    <style>
      .page {
        position: relative;
        margin-left: var(--navbar-current-width);

      }

      .center {
        position: absolute;
        left: 50%;
        top: 50%;

        transform: translate(-50%, -50%);
      }
    </style>
    <div class="page">
      <div class="center">
        <svg class="loader">
          <use xlink:href="./assets/images/svg/output.svg#loader"></use>
        </svg>
      </div>
    </div>
  `;
};
