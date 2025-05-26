import React, { useState } from 'react';
import { useRecipes } from '../contexts/RecipeContext';
import { useNavigate } from 'react-router-dom';
import { Calendar, Edit, Save, X, Plus, Trash2 } from 'lucide-react';
import EmptyState from '../components/EmptyState';
const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];
const meals = ['breakfast', 'lunch', 'dinner'];
const MealPlanner: React.FC = () => {
  const { savedRecipes, mealPlans, saveMealPlan, deleteMealPlan } = useRecipes();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(() => {
    return mealPlans.length > 0 ? mealPlans[0] : {
      id: `plan-${Date.now()}`,
      name: 'My Meal Plan',
      days: daysOfWeek.reduce((acc, day) => {
        acc[day] = { breakfast: '', lunch: '', dinner: '' };
        return acc;
      }, {} as Record<string, { breakfast?: string; lunch?: string; dinner?: string }>),
      createdAt: Date.now()
    };
  });
  const handleSavePlan = () => {
    saveMealPlan(currentPlan);
    setIsEditing(false);
  };
  const handleChangeMeal = (day: string, meal: string, recipeId: string) => {
    setCurrentPlan(prev => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: {
          ...prev.days[day],
          [meal]: recipeId
        }
      }
    }));
  };
  const getRecipeTitleById = (id: string) => {
    const recipe = savedRecipes.find(r => r.id === id);
    return recipe ? recipe.title : '';
  };
  if (savedRecipes.length === 0) {
    return (
      <EmptyState
        title="No saved recipes to plan meals"
        message="You need to save some recipes before you can create a meal plan."
        actionLabel="Go to Recipes"
        onAction={() => navigate('/')}
      />
    );
  }
  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Meal Planner</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Plan your meals for the week using your saved recipes.
          </p>
        </div>     
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSavePlan}
                className="flex items-center px-3 py-2 bg-primary-500 text-white rounded-md 
                          hover:bg-primary-600 transition-colors duration-200"
              >
                <Save size={16} className="mr-1" />
                <span>Save Plan</span>
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center px-3 py-2 bg-gray-200 text-gray-800 rounded-md 
                          hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 
                          transition-colors duration-200"
              >
                <X size={16} className="mr-1" />
                <span>Cancel</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-3 py-2 bg-accent-500 text-white rounded-md 
                        hover:bg-accent-600 transition-colors duration-200"
            >
              <Edit size={16} className="mr-1" />
              <span>Edit Plan</span>
            </button>
          )}
        </div>
      </section>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300
                    border border-gray-100 dark:border-gray-700 animate-fade-in">
        <div className="p-4 bg-primary-50 dark:bg-primary-900/30 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center">
            <Calendar size={20} className="mr-2 text-primary-600 dark:text-primary-400" />
            {isEditing ? (
              <input
                type="text"
                value={currentPlan.name}
                onChange={(e) => setCurrentPlan(prev => ({ ...prev, name: e.target.value }))}
                className="font-bold text-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                          rounded px-2 py-1 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            ) : (
              <h2 className="font-bold text-lg text-gray-800 dark:text-white">{currentPlan.name}</h2>
            )}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400 w-1/4">Day</th>
                <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400 w-1/4">Breakfast</th>
                <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400 w-1/4">Lunch</th>
                <th className="py-3 px-4 font-medium text-gray-500 dark:text-gray-400 w-1/4">Dinner</th>
              </tr>
            </thead>
            <tbody>
              {daysOfWeek.map((day) => (
                <tr key={day} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="py-4 px-4 font-medium text-gray-800 dark:text-white">{day}</td>
                  {meals.map((meal) => (
                    <td key={meal} className="py-4 px-4">
                      {isEditing ? (
                        <select
                          value={currentPlan.days[day]?.[meal] || ''}
                          onChange={(e) => handleChangeMeal(day, meal, e.target.value)}
                          className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                                    rounded px-2 py-1 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="">Select a recipe</option>
                          {savedRecipes.map((recipe) => (
                            <option key={recipe.id} value={recipe.id}>
                              {recipe.title}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-gray-700 dark:text-gray-300">
                          {currentPlan.days[day]?.[meal] 
                            ? getRecipeTitleById(currentPlan.days[day][meal] || '') 
                            : <span className="text-gray-400 dark:text-gray-500">No recipe selected</span>}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {mealPlans.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Saved Meal Plans</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {mealPlans.map(plan => (
              <div key={plan.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">{plan.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(plan.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setCurrentPlan(plan);
                      setIsEditing(false);
                    }}
                    className="p-2 rounded-md text-accent-600 hover:bg-accent-50 dark:text-accent-400 dark:hover:bg-accent-900/20"
                  >
                    <Calendar size={18} />
                  </button>
                  <button
                    onClick={() => deleteMealPlan(plan.id)}
                    className="p-2 rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default MealPlanner;