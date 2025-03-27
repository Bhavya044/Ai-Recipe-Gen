// === server/controllers/recipeController.js ===
const {
  generateRecipe,
  getIngredientSuggestions,
} = require("../utils/openaiClient");

const Recipe = require("../models/Recipe");
const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");
exports.getRecipe = async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || !ingredients.length) {
    return res.status(400).json({ error: "Ingredients are required" });
  }

  try {
    const recipe = await generateRecipe(ingredients);
    console.log("recipe", recipe);
    res.json({ recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating recipe" });
  }
};

exports.getIngredients = async (req, res) => {
  console.log("Req body", req.body);
  const { value } = req.body;
  try {
    const recipe = await getIngredientSuggestions(value);
    res.json({ ingredients: recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating recipe" });
  }
};

// Save a recipe to the authenticated user's account
exports.saveRecipe = async (req, res) => {
  try {
    const userId = req.user.id; // Extract userId from authenticated request

    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User ID is missing" });
    }

    const recipeData = { ...req.body, userId }; // Ensure userId is included

    const recipe = new Recipe(recipeData);
    await recipe.save();

    res.status(201).json({ message: "Recipe saved successfully!" });
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).json({ error: "Failed to save recipe" });
  }
};

// Get all saved recipes for the authenticated user
exports.getUserRecipes = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from token

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const recipes = await Recipe.find({ userId: new ObjectId(userId) });

    res.json(recipes);
  } catch (error) {
    console.error("Error fetching user recipes:", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
};
