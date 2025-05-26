import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from '../contexts/ThemeContext';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme(); 
  return (
    <div className={`min-h-screen flex flex-col ${
      theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    } transition-colors duration-200`}>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6">
        {children}
      </main>
      <Footer />
    </div>
  );
};
export default Layout;