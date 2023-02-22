const http = require("http");
const PORT = 3000;

const server = http.createServer((request, response) => {
  console.log("Server request ");
  console.log(request.url, request.method);

  response.setHeader("Content-Type", "application/json;", "charset=utf-8;");
  //   response.write("<h1>hello world<h1>");
  const data = JSON.stringify([
    {
      name: "Tom",
      skill: "fullstack",
    },
  ]);

  response.end(data);
});

server.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Listening port ${PORT}`);
});
