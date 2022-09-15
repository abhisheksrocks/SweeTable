export const elements = {
  root: {
    selector: ":root",
    call: function () {
      return querySelector(this.selector);
    },
  },
  navLinksParent: {
    selector: ".nav-links",
    call: function () {
      return querySelector(this.selector);
    },
  },
  navLinks: {
    selector: ".nav-link",
    call: function () {
      return querySelectorAll(this.selector);
    },
  },
  mainContent: {
    selector: "main",
    call: function () {
      return querySelector(this.selector);
    },
  },
  themeSwitchButtonContainer: {
    selector: ".theme-switch",
    call: function () {
      return querySelector(this.selector);
    },
  },
  themeSwitchButtons: {
    selector: ".theme-switch-button",
    call: function () {
      return querySelectorAll(this.selector);
    },
  },
};

export const constants = {
  repoName: "SweeTable",
};

// document.se
const querySelector = (className) => document.querySelector(className);
const querySelectorAll = (className) => document.querySelectorAll(className);
