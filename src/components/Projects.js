import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ title, description, image, link }) => (
  <motion.div 
    whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }}
    className="bg-white p-6 rounded-lg shadow-lg transition duration-300"
  >
    <a href={link} target="_blank" rel="noopener noreferrer" className="block">
      <motion.img 
        src={image} 
        alt={title} 
        className="w-full h-48 object-cover mb-4 rounded"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <motion.div 
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        View Project
      </motion.div>
    </a>
  </motion.div>
);

const Projects = () => {
  const projects = [
    { 
      title: 'Weather app', 
      description: 'Full Weather app with Auth functionality', 
      image: '/Screenshot from 2024-10-20 09-46-47.png', 
      link: 'https://weatherapp-sjep.onrender.com'
    },
    { 
      title: 'Dream Forex', 
      description: 'Dream forex is a website that we can learn how to forex trade', 
      image: '/Screenshot from 2024-10-20 09-49-05.png', 
      link: 'https://dreamfx-0ode.onrender.com'
    },
  ];

  return (
    <motion.div 
      className="min-h-screen p-8 bg-gradient-to-b from-gray-100 to-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;