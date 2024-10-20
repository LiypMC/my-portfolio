import React from 'react';
import { motion } from 'framer-motion';

const ProjectItem = ({ title, description, image, link }) => (
  <motion.div 
    className="group"
    whileHover={{ y: -5 }}
    transition={{ duration: 0.3 }}
  >
    <motion.img 
      src={image} 
      alt={title} 
      className="w-full h-64 object-cover rounded-lg shadow-md transition-shadow duration-300 group-hover:shadow-xl"
      whileHover={{ scale: 1.02 }}
    />
    <div className="mt-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-3">{description}</p>
      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-blue-500 font-medium hover:text-blue-600 transition duration-300"
        whileHover={{ x: 5 }}
      >
        View Project <span aria-hidden="true">&rarr;</span>
      </motion.a>
    </div>
  </motion.div>
);

const Projects = () => {
  const projects = [
    { 
      title: 'Weather App', 
      description: 'Real-time weather data with sleek UI and user authentication.', 
      image: '/Screenshot from 2024-10-20 09-46-47.png', 
      link: 'https://weatherapp-sjep.onrender.com'
    },
    { 
      title: 'Dream Forex', 
      description: 'Interactive platform for mastering forex trading strategies.', 
      image: '/Screenshot from 2024-10-20 09-49-05.png', 
      link: 'https://dreamfx-0ode.onrender.com'
    },
  ];

  return (
    <motion.section 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold mb-16 text-center text-gray-800"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Recent Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <ProjectItem {...project} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;