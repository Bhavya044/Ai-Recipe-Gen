// === server/routes/recipeRoutes.js ===
const express = require("express");
const {
  getRecipe,
  getIngredients,
  saveRecipe,
  getUserRecipes,
} = require("../controllers/recipeController");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

router.post("/generate", getRecipe);
router.post("/suggestions", getIngredients);

router.post("/save", authMiddleware, saveRecipe);
router.get("/", authMiddleware, getUserRecipes);

module.exports = router;
