// export const clearLinks =
import { elements } from "./base.js";

export const initialize = (navLinks, onClickNavLink) => {
  renderNavLinks(navLinks);
  // onClickNavLink(location.pathname);
  let hashString = location.hash;
  hashString = hashString.replace("#", "/");
  console.log(hashString);
  onClickNavLink(hashString);

  elements.navLinksParent.call().addEventListener("click", (e) => {
    e.preventDefault();
    const linkElements = elements.navLinks.call();
    const refElement = e.target.closest(".nav-link");
    if (!refElement) return;
    for (let index = 0; index < linkElements.length; index++) {
      const element = linkElements[index];
      // console.log(element.classList);
      element.classList.remove("nav-link--active");
      // console.log(element.classList);
    }
    refElement.classList.add("nav-link--active");

    const hasLink = refElement.dataset.link.length === 0;
    // console.log(refElement.dataset.link);
    if (hasLink) {
      console.debug(
        `Found path: '${refElement.href}', invoking onClickNavLink()`
      );
      onClickNavLink(refElement.href);
    }
  });
};

// export const

export const renderSingleNavLink = (navLink) => {
  console.log(navLink);

  const markup = `
  <a href="${navLink.route.path}" class='nav-link ${
    navLink.route.isActive ? "nav-link--active" : ""
  }' data-link>
    <li class="center-horizontal" >
        <div class="link-box center-horizontal">
        <svg class="link-icon">
            <use xlink:href="${navLink.svgLink}"></use>
        </svg>
        </div>
        <h4 class="link-title">${navLink.sectionName}</h4>
        <div class="nav-link-bg"></div>
    </li>
    </a>
  `;
  elements.navLinksParent.call().insertAdjacentHTML("afterbegin", markup);
};

export const renderNavLinks = (navLinks) => {
  for (let index = 0; index < navLinks.length; index++) {
    const element = navLinks[navLinks.length - (index + 1)];
    renderSingleNavLink(element);
  }
  // navLinks.forEach((element) => {
  //   renderSingleNavLink(element);
  // });
};
