const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Post = require("./models/post");
const Contact = require("./models/contact");

const PORT = 3000;
const db =
  "mongodb+srv://Erkin:yXWke3ehz.Z$!Ve@cluster0.eqh8txw.mongodb.net/my-personal-blog?retryWrites=true&w=majority";
mongoose
  .connect(db)
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error connecting to DB");
  });

app.set("view engine", "ejs");

const creatrePath = (page) =>
  path.resolve(__dirname, "ejs-views", `${page}.ejs`); // функция пути

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Listening port ${PORT}`);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(express.urlencoded({ extended: false })); // body parser

app.use(express.static("styles"));

// ниже роутинги с использованием express
app.get("/", (req, res) => {
  const title = "Home";
  res.render(creatrePath("index"), { title });
});

app.get("/contacts", (req, res) => {
  const title = "Contacts";
  Contact.find().then((contacts) =>
    res.render(creatrePath("contacts"), { contacts, title })
    
  )  .catch((error) => {
    console.log(error);
    res.render(creatrePath("error"), { title: "Error" });
  });
});

app.get("/posts/:id", (req, res) => {
  const title = "Posts";
  const post = {
    id: 1,
    title: "title",
    text: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid, lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid",
    date: "23/02/2023",
    author: "qoobatov",
  };
  res.render(creatrePath("post"), { title, post });
});

app.get("/posts", (req, res) => {
  const title = "Posts";
  const posts = [
    {
      id: 1,
      title: "title",
      text: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid, lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid",
      date: "23/02/2023",
      author: "qoobatov",
    },
    {
      id: 2,
      title: "title",
      text: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid, lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid",
      date: "23/02/2023",
      author: "qoobatov",
    },
  ];
  res.render(creatrePath("posts"), { title, posts });
});

app.post("/add-post", (req, res) => {
  const { title, text, author } = req.body;
  const post = new Post({ title, text, author });
  post
    .save()
    .then((result) => res.send(result))
    .catch((error) => {
      console.log(error);
      res.render(creatrePath("error"), { title: "Error" });
    });
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
