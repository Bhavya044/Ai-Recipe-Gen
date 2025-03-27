const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: [String], required: true },
  notes: { type: String },
  prepTime: { type: String },
  cookTime: { type: String },
  totalTime: { type: String },
  servings: { type: String },
  difficulty: { type: String },
  dietaryInfo: { type: String },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
