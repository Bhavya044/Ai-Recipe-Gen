import React, { useState, useEffect } from "react";
import {
  FaClock,
  FaUtensils,
  FaInfoCircle,
  FaThumbsUp,
  FaPlay,
  FaStop,
  FaBookmark,
} from "react-icons/fa";
import { GiHotMeal } from "react-icons/gi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  checkIfRecipeIsSaved,
  saveRecipe,
  toggleSpeech,
} from "../services/recipeService";
import "./RecipeOutput.css";
import AuthModal from "./Authentication/AuthModal";
import RecipeCard from "./RecipeCard";

const RecipeOutput = ({ recipe }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    setSaved(checkIfRecipeIsSaved(recipe));
  }, [recipe]);

  const handleSaveRecipe = () => {
    if (!isAuthenticated) {
      setShowSignInModal(true);
      return;
    }
    const result = saveRecipe(recipe, setShowSignInModal);
    if (result.success) setSaved(true);
    toast[result.success ? "success" : "info"](result.message);
  };
  return (
    <>
      <div className="top-actions dark-theme">
        <button
          onClick={() => toggleSpeech(isPlaying, recipe, setIsPlaying)}
          className="play-pause-btn dark-btn"
        >
          {isPlaying ? <FaStop /> : <FaPlay />}
        </button>
        <button
          onClick={handleSaveRecipe}
          className={`save-recipe-btn dark-btn ${saved ? "saved" : ""}`}
        >
          <FaBookmark />
        </button>
      </div>
      <RecipeCard recipe={recipe} />

      <AuthModal
        showModal={showSignInModal}
        setShowModal={setShowSignInModal}
        setIsAuthenticated={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
      />
    </>
  );
};

export default RecipeOutput;
