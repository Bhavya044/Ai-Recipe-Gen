import React, { useState, useCallback } from "react";
import axios from "axios";
import "./IngredientInput.css";
import { debounce } from "../utils/functions";

const IngredientInput = ({ ingredients, setIngredients, handleGenerate }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (value) => {
    if (!value.trim()) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://ai-recipe-gen-iota.vercel.app/api/recipes/suggestions",
        { value }
      );
      setSuggestions(response.data?.ingredients || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounced version
  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 400),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    debouncedFetchSuggestions(value);
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
        {loading ? <span className="loader"></span> : null}
      </div>

      {suggestions?.length ? (
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
      ) : null}

      {ingredients?.length ? (
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
      ) : null}

      <button onClick={handleGenerate} class="generate-button">
        <svg
          height="24"
          width="24"
          fill="#FFFFFF"
          viewBox="0 0 24 24"
          data-name="Layer 1"
          id="Layer_1"
          class="sparkle"
        >
          <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
        </svg>

        <span class="text">Generate</span>
      </button>
    </div>
  );
};

export default IngredientInput;
