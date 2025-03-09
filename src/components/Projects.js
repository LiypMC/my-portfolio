import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Globe, ExternalLink, Code, Server, Database, ArrowLeft, ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { ThemeContext } from '../context/ThemeContext';

// Import Tilt with fallback for browser environments
let Tilt;
if (typeof window !== 'undefined') {
  try {
    // Import dynamically to avoid SSR issues
    Tilt = require('react-tilt').Tilt;
  } catch (e) {
    // Fallback if module loading fails
    Tilt = ({ children, options }) => <div>{children}</div>;
  }
} else {
  // Create a placeholder component for SSR
  Tilt = ({ children }) => <div>{children}</div>;
}

const defaultTiltOptions = {
  reverse: false,
  max: 12,
  perspective: 1000,
  scale: 1.04,
  speed: 1200,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

const ProjectModal = ({ project, onClose, isDarkMode, currentIndex, totalProjects, navigateProject }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    // Save the current overflow style
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden';
    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: 'spring', 
        damping: 20 
      }
    },
    exit: { opacity: 0, scale: 0.9 }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
  <motion.div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 backdrop-blur-md bg-black/60"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={modalVariants}
      onClick={onClose}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <motion.div 
        className={`relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } flex flex-col`}
        variants={contentVariants}
        onClick={handleModalClick}
      >
        {/* Header with close button */}
        <div className="relative">
          <div className="w-full h-64 md:h-80 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
            <motion.img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover object-center"
              initial={{ scale: 1.1, filter: 'blur(8px)' }}
              animate={{ scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6 }}
            />
            
            {/* Project title and info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags?.map((tech, index) => (
                  <span 
                    key={index} 
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isDarkMode ? 'bg-blue-500/30 text-blue-100' : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-1">
                {project.title}
              </h2>
              
              <p className="text-base text-gray-200 max-w-2xl">
                {project.category}
              </p>
            </div>
            
            {/* Close button */}
            <motion.button 
              className={`absolute top-4 right-4 z-50 p-3 rounded-full ${
                isDarkMode 
                  ? 'bg-gray-900/50 hover:bg-gray-900/70 text-white' 
                  : 'bg-white/70 hover:bg-white/90 text-gray-800'
              }`}
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </motion.button>
          </div>
        </div>

        {/* Content area with scrolling */}
        <div className={`p-8 md:p-10 overflow-y-auto flex-grow ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          <p className="text-lg leading-relaxed mb-8">
            {project.description}
          </p>
          
          {project.features && (
            <div className="mb-8">
              <h3 className={`text-xl font-semibold mb-5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Key Features
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className={`inline-flex items-center justify-center rounded-full p-1 ${
                      isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-600'
                    } mr-3 mt-1.5 flex-shrink-0`}>
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </span>
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Footer with action buttons */}
        <div className={`px-8 md:px-10 py-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} flex flex-wrap items-center gap-4`}>
          {project.demoUrl && (
            <motion.a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`inline-flex items-center px-5 py-2.5 rounded-lg ${
                isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'
              } text-white shadow-md transition-colors`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe size={18} className="mr-2" />
              View Live Demo
            </motion.a>
          )}
          
          {project.githubUrl && (
            <motion.a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`inline-flex items-center px-5 py-2.5 rounded-lg ${
                isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              } ${isDarkMode ? 'text-white' : 'text-gray-800'} transition-colors`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={18} className="mr-2" />
              View Source Code
            </motion.a>
          )}
          
          {/* Navigation between projects */}
          {totalProjects > 1 && (
            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm mr-2">
                {currentIndex + 1} of {totalProjects}
              </span>
              
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateProject('prev');
                }}
                className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeft size={16} />
              </motion.button>
              
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateProject('next');
                }}
                className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowRight size={16} />
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard = ({ project, onClick, isDarkMode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const getIconByTech = (tech) => {
    if (tech.toLowerCase().includes('express') || 
        tech.toLowerCase().includes('ejs') || 
        tech.toLowerCase().includes('html') ||
        tech.toLowerCase().includes('css') ||
        tech.toLowerCase().includes('frontend')) {
      return <Code size={14} />;
    } else if (tech.toLowerCase().includes('node') || 
              tech.toLowerCase().includes('express') ||
              tech.toLowerCase().includes('backend') ||
              tech.toLowerCase().includes('server')) {
      return <Server size={14} />;
    } else if (tech.toLowerCase().includes('mongodb') || 
              tech.toLowerCase().includes('database')) {
      return <Database size={14} />;
    }
    return null;
  };

  // Safeguard against undefined technologies
  const technologies = project.tags || [];

  // Use conditional to handle Tilt component safely
  const CardWrapper = Tilt ? Tilt : ({ children }) => <div>{children}</div>;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      className="h-full"
    >
      <CardWrapper options={defaultTiltOptions}>
        <motion.div
          className={`h-full overflow-hidden rounded-2xl card-modern shadow-lg cursor-pointer`}
          whileHover={{ y: -10 }}
          onClick={() => onClick(project)}
        >
          <div className="relative h-56 overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 p-6">
              <p className={`text-xs font-medium px-2.5 py-1 rounded-full inline-block mb-3 ${
                isDarkMode 
                  ? 'bg-blue-500/40 text-blue-100' 
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {project.category}
              </p>
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
            </div>
          </div>
          
          <div className="p-6">
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-3 mb-5 text-sm`}>
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {technologies.slice(0, 3).map((tech, index) => (
                <span 
                  key={index} 
                  className={`text-xs px-3 py-1.5 rounded-full flex items-center ${
                    isDarkMode 
                      ? 'bg-gray-700 text-gray-300' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {getIconByTech(tech) && <span className="mr-1.5">{getIconByTech(tech)}</span>}
                  {tech}
                </span>
              ))}
              
              {technologies.length > 3 && (
                <span className={`text-xs px-3 py-1.5 rounded-full ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300' 
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  +{technologies.length - 3} more
                </span>
              )}
            </div>
            
            <div className={`mt-5 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}>
              <motion.span 
                className={`text-xs flex items-center ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}
                whileHover={{ x: 3 }}
              >
                View Details
                <ExternalLink size={12} className="ml-1" />
              </motion.span>
              
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`p-1.5 rounded-full ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                >
                  <Github size={14} />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </CardWrapper>
  </motion.div>
);
};

const Projects = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Updated projects with Express, MongoDB, EJS and CSS stack
  const projects = [
    { 
      id: 1,
      title: 'Weather App',
      category: 'Web Development',
      description: 'Real-time weather forecasting application built with Express.js on the backend and EJS templates with custom CSS on the frontend. This server-rendered application provides accurate weather data with an intuitive interface.',
      image: '/Screenshot from 2024-10-20 09-46-47.png', 
      tags: ['Express.js', 'MongoDB', 'EJS', 'CSS', 'Weather API'],
      features: [
        'Server-rendered views with EJS templating engine',
        'Location-based weather data using Express routes',
        'Data visualization with custom CSS and vanilla JavaScript',
        'Mobile-responsive layout without any frontend frameworks',
        'MongoDB database for saving user preferences and locations'
      ],
      githubUrl: "https://github.com/ProgNaol/weatherapp",
      demoUrl: "https://weather.naol.pro"
    },
    {
      id: 2,
      title: 'Dream Forex', 
      category: 'Finance',
      description: 'Interactive platform for learning forex trading strategies with real-time market data. Built with Express.js and MongoDB for the backend and EJS templates with custom CSS styling for the frontend.',
      image: '/Screenshot from 2024-10-20 09-49-05.png', 
      tags: ['Express.js', 'MongoDB', 'EJS', 'CSS', 'Finance API'],
      features: [
        'Server-side rendered educational content using EJS',
        'Financial data visualization with vanilla JavaScript',
        'User authentication and session management with Express',
        'MongoDB database for storing user progress and preferences',
        'Custom CSS animations and transitions for interactive elements'
      ],
      githubUrl: "https://github.com/ProgNaol/dreamfx",
      demoUrl: "https://dreamfx-0ode.onrender.com/"
    }
  ];

  // Get unique categories for the filter
  const categories = ['all', ...new Set(projects.map(project => project.category))];

  // Filter projects based on active category
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  // Handle closing the modal
  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  // Handle clicking on a project card
  const handleProjectClick = (project) => {
    const index = filteredProjects.findIndex(p => p.id === project.id);
    setSelectedIndex(index);
    setSelectedProject(project);
  };

  // Navigate between projects in the modal
  const navigateProject = (direction) => {
    const totalProjects = filteredProjects.length;
    let newIndex;

    if (direction === 'next') {
      newIndex = (selectedIndex + 1) % totalProjects;
    } else {
      newIndex = (selectedIndex - 1 + totalProjects) % totalProjects;
    }

    setSelectedIndex(newIndex);
    setSelectedProject(filteredProjects[newIndex]);
  };

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        when: "beforeChildren" 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`min-h-screen py-24 px-6 md:px-8 ${
        isDarkMode ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'
      } transition-colors duration-300`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className={`heading-xl font-bold mb-16 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
          variants={itemVariants}
          ref={ref}
        >
          My <span className="gradient-text">Projects</span>
        </motion.h2>
        
          <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          variants={itemVariants}
        >
          {categories.map((category, index) => (
            <motion.button
            key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeCategory === category 
                  ? isDarkMode 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                    : 'bg-blue-500 text-white shadow-md shadow-blue-500/20'
                  : isDarkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-all duration-300`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={handleProjectClick} 
              isDarkMode={isDarkMode}
            />
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div 
            className="text-center py-20"
            variants={itemVariants}
          >
            <p className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject}
            onClose={handleCloseModal}
            isDarkMode={isDarkMode}
            currentIndex={selectedIndex}
            totalProjects={filteredProjects.length}
            navigateProject={navigateProject}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Projects;