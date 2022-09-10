export const elements = {
  navLinksParent: {
    className: ".nav-links",
    call: function () {
      return querySelector(this.className);
    },
  },
  navLinks: {
    className: ".nav-link",
    call: function () {
      return querySelectorAll(this.className);
    },
  },
};

const querySelector = (className) => document.querySelector(className);
const querySelectorAll = (className) => document.querySelectorAll(className);
