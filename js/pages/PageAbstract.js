export default class PageAbstract {
  constructor(filePath) {
    this.filePath = filePath;
  }

  makeKey() {
    let string = `${PageAbstract.name}${this.filePath}`;
    string = string.replaceAll("/", "");
    string = string.replaceAll(".", "");
    console.log(`makeKey: ${string}`);
    return string;
  }

  async getContent() {
    const key = this.makeKey();
    let stateData = localStorage.getItem(key);
    if (!stateData) {
      const fileData = await fetch(this.filePath);
      const text = await fileData.text();
      try {
        localStorage.setItem(key, text);
      } catch (error) {
        console.log(`ERROR: ${error}`);
      }
      stateData = text;
    }
    return stateData;
  }
}
