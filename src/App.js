import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import './App.css';

function App() {
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    // Apply theme class to body
    document.body.className = isDarkMode ? 'theme-dark' : 'theme-light';
  }, [isDarkMode]);

  return (
    <div className={`app ${isDarkMode ? 'theme-dark' : 'theme-light'}`}>
      {/* CustomCursor should be here at the top level */}
      <CustomCursor />
      
      <Navbar />
      
      <main className="relative min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      
      {/* Footer with explicit z-index to ensure it's always visible */}
      <Footer />
    </div>
  );
}

export default App;