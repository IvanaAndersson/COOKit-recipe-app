if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//REQUIRE FUNCTIONALITY
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

//setting up express app
const app = express();

// REQUIRE MODELS
const recipeController = require("./controllers/recipeController");
const authenticationController = require("./controllers/authenticationController");

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
app.use(express.urlencoded({ limit: "10mb", extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.redirect("/recipes");
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About the app" });
});

app.get("/recipes", recipeController.recipe_index);

app.post("/recipes", recipeController.recipe_create_post);

app.get("/recipes/create", recipeController.recipe_create_get);

app.get("/recipes/:id", recipeController.recipe_details);

app.delete("/recipes/:id", recipeController.recipe_delete);

//LOGIN AND REGISTER ROUTES

app.get("/login", authenticationController.login_get);
app.post("/login", authenticationController.login_post);

app.get("/register", authenticationController.register_get);
app.post("/register", authenticationController.register_post);

app.use((req, res) => {
  res.status(404).render("404", { title: "404: Page not found" });
});
