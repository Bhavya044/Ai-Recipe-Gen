import React, { useState } from "react";
import axios from "axios";
import "./IngredientInput.css";

const IngredientInput = ({ ingredients, setIngredients, handleGenerate }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim()) {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://ai-recipe-gen-iota.vercel.app/api/recipes/suggestions",
          {
            value,
          }
        );
        setSuggestions(response.data?.ingredients);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
      setLoading(false);
    }
  };

  const handleAddIngredient = (ingredient) => {
    if (!ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
    }
    setInput("");
    setSuggestions([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && input.trim()) {
      handleAddIngredient(input.trim());
    }
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  return (
    <div className="ingredient-input">
      <h3 className="input-title">Add Ingredients</h3>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type an ingredient"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="ingredient-input-field"
        />
        {loading ? (
          <span className="loader"></span>
        ) : (
          <button
            onClick={() => handleAddIngredient(input)}
            className="add-button"
          >
            Add
          </button>
        )}
      </div>
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((ingredient, index) => (
            <li
              key={index}
              onClick={() => handleAddIngredient(ingredient)}
              className="suggestion-item"
            >
              {ingredient}
            </li>
          ))}
        </ul>
      )}
      <div className="ingredient-list">
        {ingredients?.map((ingredient, index) => (
          <div key={index} className="ingredient-tag">
            <div>{ingredient}</div>
            <button
              onClick={() => removeIngredient(index)}
              className="remove-button"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <button onClick={handleGenerate}>Generate Recipe</button>
    </div>
  );
};

export default IngredientInput;
