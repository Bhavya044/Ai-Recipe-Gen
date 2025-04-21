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
        <div className="top-actions">
          <button
            onClick={() => toggleSpeech(isPlaying, recipe, setIsPlaying)}
            className="play-pause-btn dark-btn"
          >
            {isPlaying ? <FaStop /> : <FaPlay />}
          </button>

          {saved ? (
            <button onClick={handleSaveRecipe} className="btn saved">
              <svg
                className="btn-icon"
                xmlns="http://www.w3.org/2000/svg"
                width={30}
                height={30}
                viewBox="0 0 17.503 15.625"
              >
                <path
                  id="Fill"
                  d="M8.752,15.625h0L1.383,8.162a4.824,4.824,0,0,1,0-6.762,4.679,4.679,0,0,1,6.674,0l.694.7.694-.7a4.678,4.678,0,0,1,6.675,0,4.825,4.825,0,0,1,0,6.762L8.752,15.624ZM4.72,1.25A3.442,3.442,0,0,0,2.277,2.275a3.562,3.562,0,0,0,0,5l6.475,6.556,6.475-6.556a3.563,3.563,0,0,0,0-5A3.443,3.443,0,0,0,12.786,1.25h-.01a3.415,3.415,0,0,0-2.443,1.038L8.752,3.9,7.164,2.275A3.442,3.442,0,0,0,4.72,1.25Z"
                  transform="translate(0 0)"
                ></path>
              </svg>
            </button>
          ) : (
            <button onClick={handleSaveRecipe} className="btn unsaved">
              <svg
                className="btn-icon"
                xmlns="http://www.w3.org/2000/svg"
                width={30}
                height={30}
                viewBox="0 0 17.503 15.625"
              >
                <path
                  id="Fill"
                  d="M8.752,15.625h0L1.383,8.162a4.824,4.824,0,0,1,0-6.762,4.679,4.679,0,0,1,6.674,0l.694.7.694-.7a4.678,4.678,0,0,1,6.675,0,4.825,4.825,0,0,1,0,6.762L8.752,15.624ZM4.72,1.25A3.442,3.442,0,0,0,2.277,2.275a3.562,3.562,0,0,0,0,5l6.475,6.556,6.475-6.556a3.563,3.563,0,0,0,0-5A3.443,3.443,0,0,0,12.786,1.25h-.01a3.415,3.415,0,0,0-2.443,1.038L8.752,3.9,7.164,2.275A3.442,3.442,0,0,0,4.72,1.25Z"
                  transform="translate(0 0)"
                ></path>
              </svg>
            </button>
          )}
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
