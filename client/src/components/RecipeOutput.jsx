import React from "react";
import { FaClock, FaUtensils, FaInfoCircle, FaThumbsUp } from "react-icons/fa";
import { GiHotMeal } from "react-icons/gi";
import "./RecipeOutput.css";

const RecipeOutput = ({ recipe }) => {
  if (!recipe) {
    return (
      <div className="recipe-output modern-card">
        <h2>Your Recipe:</h2>
        <p className="placeholder">Your recipe will appear here...</p>
      </div>
    );
  }

  const { title, ingredients, instructions, notes, prepTime, cookTime, totalTime, servings, difficulty, dietaryInfo } = recipe;

  return (
    <div className="recipe-output modern-card">
      <div className="recipe-header">
        <h2 className="recipe-title">{title}</h2>
      </div>

      <div className="recipe-meta">
        <div className="meta-item">
          {prepTime && (
            <div><FaClock className="icon" /> <span>Prep Time:</span> {prepTime}</div>
          )}
        </div>
        <div className="meta-item">
          {cookTime && (
            <div><GiHotMeal className="icon"/> <span>Cook Time:</span> {cookTime}</div>
          )}
        </div>
        <div className="meta-item">
          {totalTime && (
            <div><FaClock className="icon" /> <span>Total Time:</span> {totalTime}</div>
          )}
        </div>
        <div className="meta-item">
          {servings && (
            <div><FaUtensils className="icon"/> <span>Servings:</span> {servings}</div>
          )}
        </div>
        <div className="meta-item">
          {difficulty && (
            <div><FaThumbsUp className="icon"/> <span>Difficulty:</span> {difficulty}</div>
          )}
        </div>
        <div className="meta-item">
          {dietaryInfo && (
            <div><FaInfoCircle className="icon"/> <span>Dietary Info:</span> {dietaryInfo}</div>
          )}
        </div>
      </div>

      <div className="recipe-details">
        <div className="section ingredients">
          <h3>Ingredients</h3>
          <ul className="ingredients-list">
            {ingredients?.map((ingredient, index) => (
              <li key={index} className="ingredient-item">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className="section instructions">
          <h3>Instructions</h3>
          <ol className="instructions-list">
            {instructions.map((step, index) => (
              <li key={index} className="instruction-item">
                {step}
              </li>
            ))}
          </ol>
        </div>

        {notes && (
          <div className="section notes">
            <h3>Notes</h3>
            <p className="recipe-notes">{notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeOutput;
