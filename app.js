const express = require("express");
const app = express();
const path = require("path");

const PORT = 3000;

app.set("view engine", "ejs");


app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Listening port ${PORT}`);
});

const creatrePath = (page) => path.resolve(__dirname, "ejs-views", `${page}.ejs`); // функция пути

// не понял про middleware, есть еще шаблонизатор ejs

// ниже роутинги с использованием express
app.get("/", (req, res) => {
  res.render(creatrePath("index"));
});
app.get("/contacts", (req, res) => {
  res.render(creatrePath("contacts"));
});
app.get("/posts/:id", (req, res) => {
  res.render(creatrePath("post"));
});
app.get("/posts", (req, res) => {
  res.render(creatrePath("posts"));
});
app.get("/add-post", (req, res) => {
  res.render(creatrePath("add-post"));
});
app.get("/about-us", (req, res) => {
  res.redirect("/contacts");
});
app.use((req, res) => {
  // именно в эксперсс вот этот перехватчик ошибок use должен быть в самом конце, потому что, после него никакие другие роутинги или редиректы не будут работать(это особенность экспресс)
  res.status(404).render(creatrePath("error"));
});
