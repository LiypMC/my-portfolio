import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ title, description, image, link }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="bg-white p-6 rounded-lg shadow-lg"
  >
    <a href={link} target="_blank" rel="noopener noreferrer">
      <img src={image} alt={title} className="w-full h-48 object-cover mb-4 rounded" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p>{description}</p>
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
    <div className="min-h-screen p-8">
      <h2 className="text-3xl font-bold mb-8">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;