import React, { useState, useEffect } from "react";
import { FaPlay, FaStop, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  checkIfRecipeIsSaved,
  saveRecipe,
  toggleSpeech,
  // unsaveRecipe,
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

  const handleSaveRecipe = async () => {
    if (!isAuthenticated) {
      setShowSignInModal(true);
      return;
    }

    if (saved) {
      // If already saved, UNSAVE it
      // const result = await unsaveRecipe(recipe);
      // if (result.success) setSaved(false);
      // toast[result.success ? "info" : "error"](result.message);
    } else {
      // Otherwise, SAVE it
      const result = await saveRecipe(recipe, setShowSignInModal);
      if (result.success) setSaved(true);
      toast[result.success ? "success" : "error"](result.message);
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
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
            {saved ? (
              <FaBookmark style={{ color: "#facc15" }} />
            ) : (
              <FaRegBookmark />
            )}
          </button>
        </div>
        <RecipeCard recipe={recipe} />
      </div>

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
