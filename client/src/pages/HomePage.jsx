import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IngredientInput from "../components/IngredientInput";
import RecipeOutput from "../components/RecipeOutput";
import "./HomePage.css";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (ingredients.length === 0) {
      toast.error("Please add some ingredients!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://ai-recipe-gen-iota.vercel.app/api/recipes/generate",
        {
          ingredients,
        }
      );
      setRecipe(response.data.recipe);
    } catch (error) {
      console.error(error);
      toast.error("Error generating recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <div className="main-content">
        {/* Ingredients Section */}
        <div className="ingredient-section">
          <IngredientInput
            ingredients={ingredients}
            setIngredients={setIngredients}
            handleGenerate={handleGenerate}
          />
        </div>

        {/* Recipe Section */}

        {loading && (
          <div className="loader-overlay">
            <div className="loader"></div>
          </div>
        )}
        {recipe && (
          <div className="recipe-section">
            {" "}
            <RecipeOutput recipe={recipe} />{" "}
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default HomePage;
