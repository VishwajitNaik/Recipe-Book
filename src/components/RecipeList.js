import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css'; // Import your CSS file for styling

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes from Spoonacular API
    axios
      .get('https://api.spoonacular.com/recipes/random', {
        params: {
          apiKey: 'ba18f2f2647f4db7a5fccf239d9c0585',
          number: 10, // Number of recipes to fetch
        },
      })
      .then(response => {
        setRecipes(response.data.recipes);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
  }, []);

  console.log(recipes);

  useEffect(() => {
    // Filter recipes based on search query
    if (searchQuery === '') {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
  }, [searchQuery, recipes]);

  return (
    <div className="homepage">
      <h1>Recipe Book</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        </div>
      <div className="recipe-list">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.title} />
            <h2>{recipe.title}</h2>
            
            <div>Likes {recipe.aggregateLikes}</div>
            <Link to={`/recipe/${recipe.id}`}>View Recipe</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
