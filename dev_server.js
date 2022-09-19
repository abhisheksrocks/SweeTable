import fs from "fs";
import http from "http";
import url from "url";
import path from "path";
import { fileURLToPath } from "url";
import mime from "mime";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// console.log("directory-name 👉️", __dirname);
// console.log("file-name 👉️", __filename);

const jsonFile = fs.readFileSync(`./package.json`);
const jsonParsed = JSON.parse(jsonFile);

let homepageURL = jsonParsed.homepage;
if (!homepageURL.endsWith("/")) {
  homepageURL += "/";
}
const urlPostFix = url.parse(homepageURL).path;
const urlPostFixWithoutSlash = urlPostFix.substring(0, urlPostFix.length - 1);
// console.log(homepageURL.href);
// console.log(jsonParsed.url);

const server = http.createServer((req, res) => {
  const currentURL = new url.URL(req.url, `http://${req.headers.host}`);

  if (currentURL.pathname === urlPostFixWithoutSlash) {
    res.writeHead(301, {
      location: urlPostFix,
    });
    res.end();
    return;
  }

  if (!currentURL.pathname.startsWith(urlPostFix)) {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("404 page not found", "utf-8");
    return;
  }

  const newPathname = currentURL.pathname.substring(urlPostFix.length - 1);
  let filePath = "." + newPathname;

  if (filePath === "./") {
    filePath = "./index.html";
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.log("ERROR OCCURRED! for filepath: " + filePath);
      const handleContent = (content) => {
        res.writeHead(404, { "Content-type": "text/html" });
        res.end(content, "utf-8");
      };

      if (fs.existsSync(`./404.html`)) {
        handleContent(fs.readFileSync("./404.html"));
      } else {
        handleContent("404 page not found");
      }
      return;
    }

    let contentType = mime.getType(filePath);
    if (!contentType) {
      contentType = "text/html";
    }

    res.writeHead(200, { "Content-type": contentType });
    res.end(content, "utf-8");
  });
});

server.listen(1337, "127.0.0.1", () => {
  const serverAddress = server.address();
  console.log(
    "Server started at " +
      serverAddress.address +
      ":" +
      serverAddress.port +
      urlPostFix
  );
});
