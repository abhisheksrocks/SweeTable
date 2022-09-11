export default class Route {
  constructor(path, alias, view, isActive) {
    this.path = path;
    this.alias = alias;
    this.view = view;
    this.isActive = isActive;
  }
}
