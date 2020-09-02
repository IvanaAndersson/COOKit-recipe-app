const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    picture: {
      type: Buffer,
      required: true,
    },
    pictureType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

recipeSchema.virtual("picturePath").get(function () {
  if (this.picture != null && this.pictureType != null) {
    return `data:${
      this.pictureType
    };charset=utf-8;base64,${this.picture.toString("base64")}`;
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
