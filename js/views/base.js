export const elements = {
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
};

// document.se
const querySelector = (className) => document.querySelector(className);
const querySelectorAll = (className) => document.querySelectorAll(className);
