import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { RecipeProvider } from './contexts/RecipeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import SavedRecipes from './pages/SavedRecipes';
import MealPlanner from './pages/MealPlanner';
function App() {
  return (
    <ThemeProvider>
      <RecipeProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/saved-recipes" element={<SavedRecipes />} />
              <Route path="/meal-planner" element={<MealPlanner />} />
            </Routes>
          </Layout>
        </Router>
      </RecipeProvider>
    </ThemeProvider>
  );
}
export default App;