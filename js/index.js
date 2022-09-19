import NavLink from "./models/NavLink.js";
import Route from "./models/Route.js";
import * as navLinkView from "./views/navLinkView.js";
import * as mainView from "./views/mainView.js";
import * as themeView from "./views/themeView.js";
import { constants } from "./views/base.js";
import CssVariable from "./models/CssVariable.js";
import { elements } from "./views/base.js";
import PageAbstract from "./pages/PageAbstract.js";

const routes = [];

const localStorageVariables = {
  isLightThemeActive: "isLightThemeActive",
};

routes.push(
  new Route("/", ["/home"], new PageAbstract("./js/pages/home.html"), false)
);

routes.push(
  new Route(
    "/generator",
    [],
    new PageAbstract("./js/pages/generator.html"),
    false
  )
);

const navLinks = [];

const pushRoute = (path) => {
  if (!path.startsWith(`/${constants.repoName}/`)) {
    path = `/${constants.repoName}` + path;
  }
  history.pushState(null, null, path);
};

const matchRoute = (path) => {
  let foundIndex = routes.findIndex((element) => {
    return (
      path.endsWith(element.path) ||
      element.alias.findIndex((aliasMember) => {
        return path.endsWith(aliasMember);
      }) !== -1
    );
  });
  console.log(foundIndex);

  if (foundIndex === -1) {
    foundIndex = 0;
  }
  return routes[foundIndex];
};

const navigator = async (path) => {
  const refRoute = matchRoute(path);
  pushRoute(refRoute.path);
  mainView.showLoader();
  const htmlContent = await refRoute.view.getContent();
  console.log(htmlContent);
  mainView.updateContent(htmlContent);
};

document.addEventListener("DOMContentLoaded", (e) => {
  const rootElement = elements.root.call();
  const computedRootElement = getComputedStyle(rootElement);

  const cssVariables = [];
  const relevantCSSVariableNames = {
    bg_navbar_1_values: "--bg-navbar-1-values",
    bg_navbar_2_values: "--bg-navbar-2-values",
    fg_navbar_1_values: "--fg-navbar-1-values",
    bg_pages_1: "--bg-pages-1",
    fg_pages_2: "--fg-pages-2",
  };

  cssVariables.push(
    new CssVariable(
      relevantCSSVariableNames.bg_navbar_1_values,
      computedRootElement.getPropertyValue(
        relevantCSSVariableNames.bg_navbar_1_values
      ),
      "34, 34, 34"
    )
  );

  cssVariables.push(
    new CssVariable(
      relevantCSSVariableNames.bg_navbar_2_values,
      computedRootElement.getPropertyValue(
        relevantCSSVariableNames.bg_navbar_2_values
      ),
      null,
      "178, 186, 195"
    )
  );

  cssVariables.push(
    new CssVariable(
      relevantCSSVariableNames.fg_navbar_1_values,
      computedRootElement.getPropertyValue(
        relevantCSSVariableNames.fg_navbar_1_values
      ),
      "255, 255, 255"
    )
  );

  cssVariables.push(
    new CssVariable(
      relevantCSSVariableNames.bg_pages_1,
      computedRootElement.getPropertyValue(relevantCSSVariableNames.bg_pages_1),
      "#000"
    )
  );

  cssVariables.push(
    new CssVariable(
      relevantCSSVariableNames.fg_pages_2,
      computedRootElement.getPropertyValue(relevantCSSVariableNames.fg_pages_2),
      "#fff"
    )
  );

  // var rootElement = document.querySelector(":root");
  // console.log(
  //   getComputedStyle(rootElement).getPropertyValue("--bg-navbar-1-values")
  // );

  // rootElement.style.setProperty("--bg-navbar-1-values", "34, 34, 34");
  // // rootElement.style.setProperty("--fg-navbar-1-values", "150, 161, 176");
  // rootElement.style.setProperty("--fg-navbar-1-values", "255, 255, 255");

  let hashString = location.hash;
  hashString = hashString.replace("#", "/");
  console.log(hashString);
  matchRoute(hashString).isActive = true;

  navLinks.push(
    new NavLink(
      "./assets/images/svg/output.svg#icon-home",
      "Dashboard",
      routes[0]
    )
  );

  navLinks.push(
    new NavLink(
      "./assets/images/svg/output.svg#icon-generator",
      "Generator",
      routes[1]
    )
  );

  themeView.initialize(cssVariables, (toLight) => {
    localStorage.setItem(localStorageVariables.isLightThemeActive, toLight);
    console.log(localStorage.getItem(localStorageVariables.isLightThemeActive));
  });

  console.log(localStorage.getItem(localStorageVariables.isLightThemeActive));

  if (
    localStorage.getItem(localStorageVariables.isLightThemeActive) == "false"
  ) {
    themeView.changeTheme(false);
  }

  navLinkView.initialize(navLinks, navigator);
});

// document.querySelector(".theme-switch").addEventListener("click", (e) => {
//   const refElement = e.target.closest(".theme-switch-button");
//   if (!refElement) return;

//   const elements = document.querySelectorAll(".theme-switch-button");
//   elements.forEach((current) => {
//     current.classList.remove("theme-switch-button-active");
//   });
//   refElement.classList.add("theme-switch-button-active");
// });
