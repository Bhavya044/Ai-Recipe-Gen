import React, { useState, useEffect } from "react";
import { getSavedRecipes } from "../services/recipeService";
import RecipeCard from "./RecipeCard";

const SavedRecipes = () => {
  const token = localStorage.getItem("token");
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    if (token) {
      const fetchSavedRecipes = async () => {
        const recipes = await getSavedRecipes();
        setSavedRecipes(recipes);
      };

      fetchSavedRecipes();
    } else {
      setSavedRecipes([]);
    }
  }, [token]);

  return (
    <div>
      <h1>Saved Recipes</h1>
      {(token && savedRecipes?.length === 0) || !token ? (
        <p>No saved recipes yet.</p>
      ) : (
        <ul>
          {savedRecipes.map((recipe, index) => (
            <RecipeCard recipe={recipe} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedRecipes;
