const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const recipeController = require("./controllers/recipeController");

//setting up express app
const app = express();

const dbURI =
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/express-tutorial?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";

const port = process.env.PORT || 3000;

//connect to mongodb
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(port))
  .catch((err) => console.error(err));

//register view engine
app.set("view engine", "ejs");

//middleware and static files;
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
// app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/recipes");
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/recipes", recipeController.recipe_index);

app.post("/recipes", recipeController.recipe_create_post);

app.get("/recipes/create", recipeController.recipe_create_get);

app.get("/recipes/:id", recipeController.recipe_details);

app.delete("/recipes/:id", recipeController.recipe_delete);

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
