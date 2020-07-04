const express = require("express");
const mongoose = require("mongoose");
const blogController = require("./controllers/blogController");

//setting up express app
const app = express();

//connect to mongodb
const dbURI =
  "mongodb://localhost:27017/express-tutorial?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
//listening for requests only after we have the connection to the database

//register view engine
app.set("view engine", "ejs");
/*
By default Express looks for ejs files in the views folder, but if we would like to change the
folder, where we store our views, we can rename it like this:
*/
//app.set('views', 'myviews');

//listen for requests
//app.listen(3000);

//middleware and static files;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "Blog Title 2",
    snippet: "About my new blog 2 ",
    body: "More about my new blog 2",
  });

  blog
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
//getting all the blogs
app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
//getting a single blog post
app.get("/single-blog", (req, res) => {
  Blog.findById("5f0039ba0b7b02272c9a9024")
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/", (req, res) => {
  res.redirect("/blogs");
  //sending basic html code  res.send("<p>home page</p>");
  //Sending html pages  res.sendFile("./views/index.html", { root: __dirname });
  // const blogs = [
  //   {
  //     title: "Title 1",
  //     snippet:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates",
  //   },
  //   {
  //     title: "Title 2",
  //     snippet:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates",
  //   },
  //   {
  //     title: "Title 3",
  //     snippet:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates",
  //   },
  // ];
  // //rendering a view
  // res.render("index", { title: "Home", blogs: blogs });
});
app.get("/about", (req, res) => {
  // res.send("<p>about page</p>");
  //res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

//redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

app.get("/blogs", blogController.blog_index);

app.post("/blogs", blogController.blog_create_post);

app.get("/blogs/create", blogController.blog_create_get);

app.get("/blogs/:id", blogController.blog_details);

app.delete("/blogs/:id", blogController.blog_delete);

//404
//should go on the bottom as a fallback if it doesn't find any of the other routes
app.use((req, res) => {
  // res.status(404).sendFile("./views/404.html", { root: __dirname });
  res.status(404).render("404", { title: "404" });
});
