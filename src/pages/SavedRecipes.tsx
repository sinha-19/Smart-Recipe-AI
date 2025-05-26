import React, { useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import EmptyState from '../components/EmptyState';
import { useRecipes } from '../contexts/RecipeContext';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const SavedRecipes: React.FC = () => {
  const { savedRecipes, deleteRecipe } = useRecipes();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const filteredRecipes = savedRecipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your Saved Recipes</h1>    
        {savedRecipes.length > 0 && (
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search recipes by title or ingredient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                        focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 
                        dark:text-white transition-colors duration-200"
            />
          </div>
        )}
      </section>
      <section>
        {savedRecipes.length === 0 ? (
          <EmptyState
            title="No saved recipes"
            message="You haven't saved any recipes yet. Generate some recipes and save your favorites!"
            actionLabel="Create Recipes"
            onAction={() => navigate('/')}
          />
        ) : filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 mb-4">No recipes match your search.</p>
            <button
              onClick={() => setSearchTerm('')}
              className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 
                        font-medium transition-colors duration-200"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredRecipes.map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                isSaved={true}
                onDelete={deleteRecipe}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
export default SavedRecipes;