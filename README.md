# SmartRecipe Creator

A modern web application that helps you discover recipes based on ingredients you have at home. Built with React, TypeScript, and Tailwind CSS.

![SmartRecipe Creator](https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Features

- 🧪 **Ingredient-Based Recipe Generation**: Enter ingredients you have, and get personalized recipe suggestions
- 💾 **Save Favorite Recipes**: Keep track of recipes you love
- 📅 **Meal Planning**: Create and manage weekly meal plans
- 🌓 **Dark Mode Support**: Comfortable viewing experience in any lighting condition
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🔍 **Recipe Search**: Search through your saved recipes by title or ingredients

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **API Integration**: Spoonacular API
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/smart-recipe-creator.git
   cd smart-recipe-creator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Spoonacular API key:
   ```
   VITE_SPOONACULAR_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/        # Reusable UI components
├── contexts/         # React context providers
├── pages/           # Page components
├── services/        # API and other services
├── types/           # TypeScript type definitions
└── main.tsx         # Application entry point
```

## Features in Detail

### Recipe Generation
- Enter ingredients you have available
- Get recipe suggestions based on your ingredients
- View detailed instructions, cooking times, and servings

### Recipe Management
- Save favorite recipes for later
- Search through saved recipes
- Delete recipes you no longer want

### Meal Planning
- Create weekly meal plans
- Assign recipes to different meals and days
- Save multiple meal plans
- Edit and delete meal plans

### User Interface
- Responsive design for all screen sizes
- Dark mode support
- Animated transitions
- Loading states and error handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Recipe data provided by [Spoonacular API](https://spoonacular.com/food-api)
- Icons by [Lucide](https://lucide.dev/)
- UI inspiration from various cooking and recipe websites

## Contact

Saket Kumar Sinha - [LinkedIn](https://linkedin.com) - linkedin.com/in/saketkumarsinha19

Project Link: https://smart-recipe-ai-eosin.vercel.app/
