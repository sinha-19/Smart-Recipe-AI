import React from 'react';
import IngredientInput from '../components/IngredientInput';
import RecipeCard from '../components/RecipeCard';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import { useRecipes } from '../contexts/RecipeContext';
import { useNavigate } from 'react-router-dom';
const Home: React.FC = () => {
  const { 
    recipes, 
    loading, 
    error, 
    generateRecipes, 
    saveRecipe,
    savedRecipes,
  } = useRecipes();
  const navigate = useNavigate();
  const handleGenerateRecipes = (ingredients: string[]) => {
    generateRecipes(ingredients);
  };
  const handleSaveRecipe = (recipe: any) => {
    saveRecipe(recipe);
  };
  const isRecipeSaved = (id: string) => {
    return savedRecipes.some(recipe => recipe.id === id);
  };
  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">SmartRecipe Creator</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Turn your available ingredients into delicious meals with AI-powered recipe suggestions.
        </p>
      </section>
      <IngredientInput onSubmit={handleGenerateRecipes} />
      <section>
        {loading ? (
          <LoadingState />
        ) : error ? (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-700 dark:text-red-300">
            <p>{error}</p>
            <p className="text-sm mt-2">Please try again or contact support if the problem persists.</p>
          </div>
        ) : recipes.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Your Recipe Suggestions</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {recipes.map(recipe => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  isSaved={isRecipeSaved(recipe.id)}
                  onSave={handleSaveRecipe}
                />
              ))}
            </div>
          </div>
        ) : (
          <EmptyState
            title="No recipes yet"
            message="Add some ingredients you have in your kitchen, and we'll create personalized recipes for you!"
            actionLabel="View Saved Recipes"
            onAction={() => navigate('/saved-recipes')}
          />
        )}
      </section>
    </div>
  );
};
export default Home;