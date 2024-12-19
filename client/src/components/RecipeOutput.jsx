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
      <h2 className="recipe-title">{title}</h2>
    
      <div className="recipe-meta">
        {prepTime && (
          <p><FaClock className="icon" /> <strong>Prep Time:</strong> {prepTime}</p>
        )}
        {cookTime && (
          <p><GiHotMeal className="icon"/> <strong>Cook Time:</strong> {cookTime}</p>
        )}
        {totalTime && (
          <p><FaClock className="icon" /> <strong>Total Time:</strong> {totalTime}</p>
        )}
        {servings && (
          <p><FaUtensils  className="icon"/> <strong>Servings:</strong> {servings}</p>
        )}
        {difficulty && (
          <p><FaThumbsUp  className="icon"/> <strong>Difficulty:</strong> {difficulty}</p>
        )}
        {dietaryInfo && (
          <p><FaInfoCircle className="icon"/> <strong>Dietary Info:</strong> {dietaryInfo}</p>
        )}
      </div>
      <div className="recipe-details">
        <h3>Ingredients</h3>
        <ul className="ingredients-list">
          {ingredients?.map((ingredient, index) => (
            <li key={index} className="ingredient-item">{ingredient}</li>
          ))}
        </ul>
        <h3>Instructions</h3>
        <ol className="instructions-list">
          {instructions.map((step, index) => (
            <li key={index} className="instruction-item">{step}</li>
          ))}
        </ol>
        {notes && (
          <>
            <h3>Notes</h3>
            <p className="recipe-notes">{notes}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeOutput;
