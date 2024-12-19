import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import IngredientInput from '../components/IngredientInput';
import RecipeOutput from '../components/RecipeOutput';

const HomePage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (ingredients.length === 0) {
      // Show error using toast
      toast.error('Please add some ingredients!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/recipes/generate', {
        ingredients,
      });
      setRecipe(response.data.recipe);
    } catch (error) {
      console.error(error);
      // Show error using toast
      toast.error('Error generating recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <header className="header">
        <h1>AI-Powered Recipe Generator</h1>
      </header>
      <main className="main-content">
        <IngredientInput
          ingredients={ingredients}
          setIngredients={setIngredients}
          handleGenerate={handleGenerate}
        />
        {loading && <div className="loader-overlay">
          <div className="loader"></div>
        </div>}
        {recipe && <RecipeOutput recipe={recipe} />}
      </main>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default HomePage;
