// export const clearLinks =
import { elements } from "./base";

export const initialize = (navLinks, onClickNavLink) => {
  renderNavLinks(navLinks);
  // onClickNavLink(path);

  elements.navLinksParent.call().addEventListener("click", (e) => {
    const linkElements = elements.navLinks.call();
    const refElement = e.target.closest(".nav-link");
    for (let index = 0; index < linkElements.length; index++) {
      const element = linkElements[index];
      // console.log(element.classList);
      element.classList.remove("nav-link--active");
      // console.log(element.classList);
    }
    refElement.classList.add("nav-link--active");

    const pathInfo = refElement.dataset.path;
    if (pathInfo) {
      console.debug(`Found path: '${pathInfo}', invoking onClickNavLink()`);
      onClickNavLink(pathInfo);
    }
  });
};

// export const

export const renderSingleNavLink = (navLink) => {
  const markup = `
    <li class="nav-link center-horizontal ${
      navLink.isActive ? "nav-link--active" : ""
    }" data-path="${navLink.path}">
        <div class="link-box center-horizontal">
        <svg class="link-icon">
            <use xlink:href="${navLink.svgLink}"></use>
        </svg>
        </div>
        <h4 class="link-title">${navLink.sectionName}</h4>
        <div class="nav-link-bg"></div>
    </li>
  `;
  elements.navLinksParent.call().insertAdjacentHTML("beforeend", markup);
};

export const renderNavLinks = (navLinks) => {
  navLinks.forEach((element) => {
    renderSingleNavLink(element);
  });
};
