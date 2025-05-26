import React, { useState } from 'react';
import { BookmarkPlus, BookmarkCheck, Clock, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { Recipe } from '../types';
interface RecipeCardProps {
  recipe: Recipe;
  isSaved?: boolean;
  onSave?: (recipe: Recipe) => void;
  onDelete?: (id: string) => void;
}
const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  isSaved = false, 
  onSave, 
  onDelete 
}) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const handleSave = () => {
    if (onSave) {
      onSave(recipe);
    }
  };
  const handleDelete = () => {
    if (onDelete) {
      onDelete(recipe.id);
    }
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 
                  hover:shadow-lg border border-gray-100 dark:border-gray-700 animate-slide-up">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{recipe.title}</h3>
        
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-300">
          {recipe.prepTime && (
            <div className="flex items-center">
              <Clock size={16} className="mr-1 text-primary-500" />
              <span>Prep: {recipe.prepTime}</span>
            </div>
          )}
          {recipe.cookTime && (
            <div className="flex items-center">
              <Clock size={16} className="mr-1 text-secondary-500" />
              <span>Cook: {recipe.cookTime}</span>
            </div>
          )}
          {recipe.servings && (
            <div className="flex items-center">
              <Users size={16} className="mr-1 text-accent-500" />
              <span>Serves: {recipe.servings}</span>
            </div>
          )}
        </div>
        <div className="mb-4">
          <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-200">Ingredients:</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
            {recipe.ingredients.slice(0, expanded ? recipe.ingredients.length : 5).map((ingredient, index) => (
              <li key={index} className="text-sm">{ingredient}</li>
            ))}
            {!expanded && recipe.ingredients.length > 5 && (
              <li className="text-sm text-primary-600 dark:text-primary-400">
                ...and {recipe.ingredients.length - 5} more ingredients
              </li>
            )}
          </ul>
        </div>
        {expanded && (
          <div className="animate-fade-in">
            <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-200">Instructions:</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="text-sm">{step}</li>
              ))}
            </ol>
            {recipe.tips && recipe.tips.length > 0 && (
              <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-900/30 rounded-md">
                <h4 className="font-medium mb-1 text-gray-700 dark:text-gray-200">Tips:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {recipe.tips.map((tip, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-300">{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <button
            onClick={toggleExpand}
            className="text-sm font-medium text-accent-600 dark:text-accent-400 hover:text-accent-800 dark:hover:text-accent-300 
                      flex items-center transition-colors duration-200"
          >
            {expanded ? (
              <>
                <ChevronUp size={18} className="mr-1" />
                <span>Show Less</span>
              </>
            ) : (
              <>
                <ChevronDown size={18} className="mr-1" />
                <span>Show More</span>
              </>
            )}
          </button>
          
          {isSaved ? (
            <button
              onClick={handleDelete}
              className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 
                        flex items-center transition-colors duration-200"
            >
              <BookmarkCheck size={18} className="mr-1" />
              <span>Remove</span>
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 
                        flex items-center transition-colors duration-200"
            >
              <BookmarkPlus size={18} className="mr-1" />
              <span>Save Recipe</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default RecipeCard;