import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or system preference with fallback
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    
    // If no saved preference, check system preference
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // Default to light theme if neither is available
    return false;
  });

  // Apply theme class to document as soon as possible
  useEffect(() => {
    document.documentElement.classList.toggle('dark-theme', isDarkMode);
    document.body.className = isDarkMode ? 'theme-dark' : 'theme-light';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Apply smooth transition after initial render
    setTimeout(() => {
      document.documentElement.classList.add('theme-transition');
    }, 100);
    
    return () => {
      document.documentElement.classList.remove('theme-transition');
    };
  }, [isDarkMode]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only update if user hasn't set a preference yet
      if (!localStorage.getItem('theme')) {
        setIsDarkMode(e.matches);
      }
    };
    
    // Add listener with fallbacks for older browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Deprecated but needed for backward compatibility
      mediaQuery.addListener(handleChange);
    }
    
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Deprecated but needed for backward compatibility
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Expose theme status and toggle function
  return (
    <ThemeContext.Provider value={{ 
      isDarkMode, 
      toggleTheme, 
      setIsDarkMode 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};