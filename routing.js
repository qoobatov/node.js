const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 3000;

const server = http.createServer((request, response) => {
  console.log("Server request ");
  console.log(request.url, request.method);

  response.setHeader("Content-Type", "text/html;", "charset=utf-8;"); // Настройка хедера,

  const creatrePath = (page) =>
    path.resolve(__dirname, "views", `${page}.html`);

  let basePath = "";

  switch (request.url) {
    case "/":
      basePath = creatrePath("index");
      response.statusCode = 200;
      break;
    case "/contacts":
      basePath = creatrePath("contacts");
      response.statusCode = 200;

      break;
    default:
      basePath = creatrePath("error");
      response.statusCode = 404;

      break;
  }

  fs.readFile(basePath, (err, data) => {
    if (err) {
      console.log(err);
      response.statusCode = 505;

      response.end();
    } else {
      response.write(data);
      response.end();
    }
  });
});

server.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Listening port ${PORT}`);
});
