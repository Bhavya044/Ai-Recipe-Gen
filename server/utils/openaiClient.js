const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = "gemini-1.5-flash";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

exports.generateRecipe = async (ingredients) => {
  const prompt = `
  Create a detailed recipe using the following ingredients: ${ingredients.join(', ')}. 
  Format the response as JSON with the following structure:
  {
    "title": "Recipe Title",
    "ingredients": ["ingredient1", "ingredient2", "ingredient3"],
    "instructions": ["Step 1", "Step 2", "Step 3"],
    "notes": "Optional notes or serving suggestions",
    "prepTime": "Preparation time in minutes",
    "cookTime": "Cooking time in minutes",
    "totalTime": "Total time in minutes",
    "servings": "Number of servings",
    "difficulty": "Difficulty level (e.g., Easy, Medium, Hard)",
    "dietaryInfo": "Information such as Vegetarian, Vegan, Gluten-Free, etc.",
  }`;

  try {
    const response = (await model.generateContent(prompt)).response.text();
    const startIndex = response.indexOf('{');
    const endIndex = response.lastIndexOf('}');
    if (startIndex === -1 || endIndex === -1) {
      throw new Error('Invalid JSON response from API');
    }
    const jsonString = response.substring(startIndex, endIndex + 1);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error in OpenAI API request:', error.message);
    throw new Error('Failed to generate recipe using OpenAI API');
  }
};

exports.getIngredientSuggestions=(async (text)=>{
  try {
    const prompt = `
      Provide a list of ingredients related to the query: "${text}". 
      Format the response as a JSON array of ingredient names.
    `;

    const response = await model.generateContent(prompt);
    const responseText = response.response.text(); // Get the generated text

    const startIndex = responseText.indexOf('[');
    const endIndex = responseText.lastIndexOf(']');
    if (startIndex === -1 || endIndex === -1) {
      throw new Error('Invalid JSON response from API');
    }
    console.log("Raw API response:", responseText);
  
    const jsonMatch = responseText.match(/\[.*?\]/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from API');
    }
  
    const jsonString = jsonMatch[0]; // The first match is the JSON array
    const ingredients = JSON.parse(jsonString);

    return ingredients
  } catch (error) {
    console.log("ERROR",error)
    throw new Error('Failed to generate recipe using OpenAI API');
  }
})