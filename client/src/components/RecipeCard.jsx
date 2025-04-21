import React from "react";
import { FaClock, FaUtensils, FaThumbsUp, FaInfoCircle } from "react-icons/fa";
import { GiHotMeal } from "react-icons/gi";
import "./RecipeOutput.css";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <div className="recipe-header">
        <h2 className="recipe-title">{recipe.title}</h2>
      </div>

      <div className="recipe-meta">
        {recipe.prepTime && (
          <div>
            <FaClock className="icon" /> <span>Prep Time:</span>{" "}
            {recipe.prepTime}
          </div>
        )}
        {recipe.cookTime && (
          <div>
            <GiHotMeal className="icon" /> <span>Cook Time:</span>{" "}
            {recipe.cookTime}
          </div>
        )}
        {recipe.totalTime && (
          <div>
            <FaClock className="icon" /> <span>Total Time:</span>{" "}
            {recipe.totalTime}
          </div>
        )}
        {recipe.servings && (
          <div>
            <FaUtensils className="icon" /> <span>Servings:</span>{" "}
            {recipe.servings}
          </div>
        )}
        {recipe.difficulty && (
          <div>
            <FaThumbsUp className="icon" /> <span>Difficulty:</span>{" "}
            {recipe.difficulty}
          </div>
        )}
        {recipe.dietaryInfo && (
          <div>
            <FaInfoCircle className="icon" /> <span>Dietary Info:</span>{" "}
            {recipe.dietaryInfo}
          </div>
        )}
      </div>

      <div className="recipe-details">
        <div className="section ingredients">
          <h3>Ingredients</h3>
          <ul className="ingredients-list">
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={index} className="ingredient-item">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className="section instructions">
          <h3>Instructions</h3>
          <ol className="instructions-list">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="instruction-item">
                {step}
              </li>
            ))}
          </ol>
        </div>

        {recipe.notes && (
          <div className="section notes">
            <h3>Notes</h3>
            <p className="recipe-notes">{recipe.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
