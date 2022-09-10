import NavLink from "./models/NavLink";
import * as navLinkView from "./views/navLinkView";

const navLinks = [
  new NavLink("./assets/images/svg/output.svg#icon-home", "Home", "home", true),
  new NavLink(
    "./assets/images/svg/output.svg#icon-generator",
    "Generator",
    "generator",
    false
  ),
];

navLinkView.initialize(navLinks, (path) => {});
