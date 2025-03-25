import axios from "axios";

const API_URL = "http://localhost:5000/api/recipes"; // Backend API endpoint

// Check if user is signed in
export const isUserSignedIn = () => {
  return !!localStorage.getItem("token");
};

// Get auth headers for API requests
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Save recipe to backend & localStorage
export const saveRecipe = async (recipe, openSignInModal) => {
  if (!isUserSignedIn()) {
    openSignInModal(true); // Trigger Sign-In Modal if user isn't signed in
    return { success: false, message: "Please sign in to save recipes." };
  }

  try {
    // Send recipe to backend
    const response = await axios.post(`${API_URL}/save`, recipe, {
      headers: getAuthHeaders(),
    });

    // Update localStorage for quick UI updates
    let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    savedRecipes.push(recipe);
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));

    return { success: true, message: response.data.message };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || "Failed to save recipe.",
    };
  }
};

// Fetch saved recipes from the backend
export const fetchUserRecipes = async () => {
  if (!isUserSignedIn()) return [];

  try {
    const response = await axios.get(`${API_URL}/saved`, {
      headers: getAuthHeaders(),
    });

    // Save fetched recipes to localStorage for caching
    localStorage.setItem("savedRecipes", JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user recipes:",
      error.response?.data || error
    );
    return [];
  }
};

// Check if a recipe is saved
export const checkIfRecipeIsSaved = (recipe) => {
  const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
  return savedRecipes.some((r) => r.title === recipe?.title);
};

// Text-to-speech functionality
export const toggleSpeech = (isPlaying, recipe, setIsPlaying) => {
  if (isPlaying) {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  } else {
    startReading(recipe, setIsPlaying);
  }
};

const startReading = (recipe, setIsPlaying) => {
  const speech = new SpeechSynthesisUtterance();
  const textToRead = `Recipe for ${
    recipe.title
  }. Ingredients: ${recipe.ingredients.join(
    ", "
  )}. Instructions: ${recipe.instructions.join(", ")}. ${
    recipe.notes ? `Notes: ${recipe.notes}` : ""
  }`;

  speech.text = textToRead;
  speech.lang = "en-US";
  window.speechSynthesis.speak(speech);

  speech.onend = () => {
    setIsPlaying(false);
  };

  setIsPlaying(true);
};

export const getSavedRecipes = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return [];

    const response = await axios.get(`${API_URL}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching saved recipes:", error);
    return [];
  }
};
