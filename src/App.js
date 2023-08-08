import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import BrowserRouter as Router
import RecipeList from './components/RecipeList';
import RecipeDetailsPage from './pages/RecipeDetailsPage';

function App() {
  return (
    <div>
      <div>
        {/* <Navigation /> */}
        <Routes>
          {/* Use Route component directly inside BrowserRouter */}
          <Route path="/" exact element={<RecipeList />} />
        <Route path="/recipe/:recipeId" element= {<RecipeDetailsPage />} />
        </Routes>
        {/* < RecipeList />
        <RecipeDetailsPage /> */}
      </div>
    </div>
  );
}

export default App;
