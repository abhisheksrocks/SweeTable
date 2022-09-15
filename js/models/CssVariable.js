import { elements } from "../views/base.js";

export default class CssVariable {
  constructor(
    variableName,
    lightThemeValue,
    darkThemeValue,
    isLightDefault = true
  ) {
    this.variableName = variableName;
    this.lightThemeValue = lightThemeValue;
    this.darkThemeValue = darkThemeValue;
    if (isLightDefault) {
      this.lightThemeValue = getComputedStyle(
        elements.root.call()
      ).getPropertyValue(variableName);
      return;
    }
    this.darkThemeValue = getComputedStyle(
      elements.root.call()
    ).getPropertyValue(variableName);
  }

  change(toLight) {
    if (toLight) {
      elements.root
        .call()
        .style.setProperty(this.variableName, this.lightThemeValue);
      return;
    }
    elements.root
      .call()
      .style.setProperty(this.variableName, this.darkThemeValue);
  }
}
