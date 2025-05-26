import { Recipe } from '../types';
const SPOONACULAR_API_KEY = '42c5297208c94b2790606fb5fc8512d1';
const BASE_URL = 'https://api.spoonacular.com/recipes';
export const generateRecipesFromIngredients = async (ingredients: string[]): Promise<Recipe[]> => {
  try {
    const searchResponse = await fetch(
      `${BASE_URL}/findByIngredients?apiKey=${SPOONACULAR_API_KEY}&ingredients=${ingredients.join(',')}&number=3&ranking=2`,
      { method: 'GET' }
    );
    if (!searchResponse.ok) {
      const errorData = await searchResponse.json();
      throw new Error(errorData.message || 'Failed to fetch recipes');
    }
    const searchResults = await searchResponse.json();
    const recipes = await Promise.all(
      searchResults.map(async (result: any) => {
        const detailResponse = await fetch(
          `${BASE_URL}/${result.id}/information?apiKey=${SPOONACULAR_API_KEY}`,
          { method: 'GET' }
        );
        if (!detailResponse.ok) {
          const errorData = await detailResponse.json();
          throw new Error(errorData.message || `Failed to fetch recipe details for ${result.id}`);
        }
        const details = await detailResponse.json();
        return {
          id: `recipe-${Date.now()}-${result.id}`,
          title: details.title,
          ingredients: details.extendedIngredients.map((ing: any) => ing.original),
          instructions: details.analyzedInstructions[0]?.steps.map((step: any) => step.step) || 
                       details.instructions?.split('.').filter(Boolean).map((step: string) => step.trim()) || [],
          prepTime: `${details.preparationMinutes || 15} minutes`,
          cookTime: `${details.cookingMinutes || 20} minutes`,
          servings: details.servings || 4,
          tips: [
            'Season to taste with salt and pepper',
            details.tips || 'Prep all ingredients before starting to cook',
            details.sourceName ? `Recipe adapted from ${details.sourceName}` : null
          ].filter(Boolean),
          createdAt: Date.now()
        };
      })
    );
    return recipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch recipes: ${error.message}`);
    }
    throw new Error('Failed to fetch recipes. Please try again later.');
  }
};