const Recipe = require("../models/recipe");

const recipe_index = (req, res) => {
  Recipe.find()
    .sort({ createdAt: -1 })
    .then((result) =>
      res.render("index", { title: "All Recipes", recipes: result })
    )
    .catch((err) => console.log(err));
};

const recipe_details = (req, res) => {
  const id = req.params.id;
  Recipe.findById(id)
    .then((result) => {
      res.render("details", { recipe: result, title: "Recipe details" });
    })
    .catch((err) =>
      res.status(404).render("404", { title: "Recipe not found" })
    );
};

const recipe_create_get = (req, res) => {
  res.render("create", { title: "Add new recipe" });
};

const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];

const savePicture = (recipe, pictureEncoded) => {
  if (pictureEncoded === null) return;
  const picture = JSON.parse(pictureEncoded);
  if (picture != null && imageMimeTypes.includes(picture.type)) {
    recipe.picture = new Buffer.from(picture.data, "base64");
    recipe.pictureType = picture.type;
  }
};

const recipe_create_post = (req, res) => {
  const recipe = new Recipe(req.body);
  savePicture(recipe, req.body.cover);
  recipe
    .save()
    .then((result) => {
      res.redirect("/recipes");
    })
    .catch((err) => console.error(err));
};

const recipe_delete = (req, res) => {
  const id = req.params.id;

  Recipe.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/recipes" });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  recipe_index,
  recipe_details,
  recipe_create_get,
  recipe_create_post,
  recipe_delete,
};
