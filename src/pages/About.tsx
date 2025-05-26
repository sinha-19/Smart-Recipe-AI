import React from 'react';
const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <section className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">About SmartRecipe Creator</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          An AI-powered recipe generator that helps you create delicious meals with ingredients you already have at home.
        </p>
      </section>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 animate-fade-in transition-colors duration-200">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">How It Works</h2>
        <div className="space-y-6">
          {[{
            step: 1,
            title: "Enter Your Ingredients",
            description: "Add the ingredients you have available in your kitchen to the ingredient list."
          }, {
            step: 2,
            title: "AI Magic",
            description: "Our AI analyzes your ingredients and generates personalized recipes tailored to what you have on hand."
          }, {
            step: 3,
            title: "Save and Organize",
            description: "Save your favorite recipes and organize them into meal plans for the week."
          }].map(({ step, title, description }) => (
            <div key={step} className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full">
                <span className="text-xl font-bold text-primary-600 dark:text-primary-400">{step}</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">{title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-fade-in transition-colors duration-200">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">About the Creator</h2>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src="/public/saket1.jpg"
            alt="Saket Kumar Sinha"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">Saket Kumar Sinha</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Web developer and AI enthusiast passionate about creating tools that make cooking easier and more enjoyable.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:imsaket123@gmail.com"
                className="flex items-center px-3 py-1.5 rounded-md text-sm font-medium
                          bg-gray-100 text-gray-800 hover:bg-gray-200
                          dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600
                          transition-colors duration-200"
              >
                <span>Email</span>
              </a>
              <a
                href="https://www.github.com/sinha-19"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-1.5 rounded-md text-sm font-medium
                          bg-gray-100 text-gray-800 hover:bg-gray-200
                          dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600
                          transition-colors duration-200"
              >
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/saketkumarsinha19/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-1.5 rounded-md text-sm font-medium
                          bg-gray-100 text-gray-800 hover:bg-gray-200
                          dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600
                          transition-colors duration-200"
              >
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
