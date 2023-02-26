const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");


const PORT = 3000;

app.set("view engine", "ejs");

const creatrePath = (page) =>
  path.resolve(__dirname, "ejs-views", `${page}.ejs`); // функция пути

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Listening port ${PORT}`);
});

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

app.use(express.static('styles'));






// ниже роутинги с использованием express
app.get("/", (req, res) => {
  const title = "Home";
  res.render(creatrePath("index"), { title });
});
app.get("/contacts", (req, res) => {
  const title = "Contacts";
  const contacts = [
    { name: "Github", link: "http://github.com/qoobatov" },
    { name: "Twitter", link: "http://twitter.com/home" },
  ];
  res.render(creatrePath("contacts"), { contacts, title });
});

app.get("/posts/:id", (req, res) => {
  const title = "Posts";
  res.render(creatrePath("post"), { title });
});

app.get("/posts", (req, res) => {
  const title = "Posts";
  res.render(creatrePath("posts"), { title });
});

app.get("/add-post", (req, res) => {
  const title = "add-post";
  res.render(creatrePath("add-post"), { title });
});
app.get("/about-us", (req, res) => {
  const title = "contacts";
  res.redirect("/contacts");
});
app.use((req, res) => {
  const title = "error";
  // именно в эксперсс вот этот перехватчик ошибок use должен быть в самом конце, потому что, после него никакие другие роутинги или редиректы не будут работать(это особенность экспресс)
  res.status(404).render(creatrePath("error"), { title });
});
