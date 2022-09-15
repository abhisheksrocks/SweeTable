import NavLink from "./models/NavLink.js";
import Route from "./models/Route.js";
import * as navLinkView from "./views/navLinkView.js";
import * as mainView from "./views/mainView.js";
import * as themeView from "./views/themeView.js";
import { constants } from "./views/base.js";
import CssVariable from "./models/CssVariable.js";

// const myFunction = async () => {
//   await fetch("");
// };

// console.log(location.pathname);

const routes = [];

const localStorageVariables = {
  isLightThemeActive: "isLightThemeActive",
};

routes.push(
  new Route(
    "/",
    ["/home"],
    () => {
      console.log("Viewing Root");
      return `
      <div class="home">
      <h1>Hello World</h1>
      </div>
      `;
    },
    false
  )
);

routes.push(
  new Route(
    "/generator",
    [],
    () => {
      console.log("Viewing Generator");
      return `
        <div class="generator-foreground"></div>
        <div class="generator">
          <h1>Generator View</h1>
          <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quaerat id placeat, mollitia nesciunt culpa vel totam tempore nostrum eveniet maiores.
          </p>
        </div>
      `;
    },
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
  mainView.updateContent(refRoute.view());
};

document.addEventListener("DOMContentLoaded", (e) => {
  const cssVariables = [];
  const relevantCSSVariableNames = {
    bg_navbar_1_values: "--bg-navbar-1-values",
    bg_navbar_2_values: "--bg-navbar-2-values",
    fg_navbar_1_values: "--fg-navbar-1-values",
  };

  cssVariables.push(
    new CssVariable(
      relevantCSSVariableNames.bg_navbar_1_values,
      null,
      "34, 34, 34",
      true
    )
  );

  cssVariables.push(
    new CssVariable(
      relevantCSSVariableNames.bg_navbar_2_values,
      null,
      "178, 186, 195",
      true
    )
  );

  cssVariables.push(
    new CssVariable(
      relevantCSSVariableNames.fg_navbar_1_values,
      null,
      "255, 255, 255",
      true
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
