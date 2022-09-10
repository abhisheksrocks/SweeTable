export default class NavLink {
  constructor(svgLink, sectionName, path, isActive) {
    this.svgLink = svgLink;
    this.sectionName = sectionName;
    this.path = path;
    this.isActive = isActive;
  }
}
