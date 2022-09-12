import NavLink from "./models/NavLink.js";
import Route from "./models/Route.js";
import * as navLinkView from "./views/navLinkView.js";
import * as mainView from "./views/mainView.js";
import { constants } from "./views/base.js";

// const myFunction = async () => {
//   await fetch("");
// };

// console.log(location.pathname);

const routes = [];

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
  let hashString = location.hash;
  hashString = hashString.replace("#", "/");
  console.log(hashString);
  matchRoute(hashString).isActive = true;

  navLinks.push(
    new NavLink(
      "/assets/images/svg/output.svg#icon-home",
      "Dashboard",
      routes[0]
    )
  );

  navLinks.push(
    new NavLink(
      "/assets/images/svg/output.svg#icon-generator",
      "Generator",
      routes[1]
    )
  );

  navLinkView.initialize(navLinks, navigator);
});
