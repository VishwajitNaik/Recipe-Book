import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetailsPage.css'; // Import your CSS file for styling

const RecipeDetailsPage = () => {
  const { recipeId } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch detailed recipe information from Spoonacular API
    axios
      .get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
        params: {
          apiKey: 'ba18f2f2647f4db7a5fccf239d9c0585',
        },
      })
      .then(response => {
        setRecipeDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching recipe details:', error);
      });
  }, [recipeId]);

  if (error) {
    return <div className="recipe-details error">{error}</div>;
  }

  if (!recipeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-details">
      <h1 className="recipe-title">{recipeDetails.title}</h1>
      <div className="recipe-content">
        <div className="recipe-image">
          <img src={recipeDetails.image} alt={recipeDetails.title} />
        </div>
        <div className="recipe-info">
          <h2>Ingredients:</h2>
          <ul>
            {recipeDetails.extendedIngredients.map(ingredient => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
          <h2>Instructions:</h2>
          <div dangerouslySetInnerHTML={{ __html: recipeDetails.instructions }} />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
