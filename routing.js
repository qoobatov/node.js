const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 3000;

const server = http.createServer((request, response) => {
  console.log(request.url);
  console.log("Server request ");
  console.log("url и метод =>", request.method);

  response.setHeader("Content-Type", "text/html;", "charset=utf-8;"); // Настройка хедера,

  const creatrePath = (page) =>
    path.resolve(__dirname, "views", `${page}.html`); // установка запрашиваемого url с настройками

  let basePath = "";

  switch (request.url) {
    case "/":
    case "/home":
    case "/index.html":
      basePath = creatrePath("index");
      response.statusCode = 200;
      break;
    case "/about-us":    // Вот здесь идет редирект из старой страницы на новый, если кто-то перейдет по старому адресу
      response.statusCode = 301;
      response.setHeader("Location", "/contacts");
      response.end();
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
