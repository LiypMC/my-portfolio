import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const skills = ['Python', 'JavaScript', 'React', 'Node.js', 'Express', 'Postgres Sql', 'Full Stack Development', 'Auth', 'Mongo databases'];

  return (
    <motion.div 
      className="min-h-screen p-8 bg-gradient-to-b from-gray-100 to-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">About Me</h2>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
          <motion.div 
            className="w-64 h-64 relative overflow-hidden rounded-lg shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src="/naolpic.jpg" // Replace with your actual image path
              alt="Naol's Profile Picture"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          <motion.div 
            className="flex-1"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-gray-700 mb-6">
              I am a passionate Python developer and Full Stack Developer, deeply invested in AI and software development. 
              Currently focusing on Python, I'm constantly expanding my knowledge and skills in the ever-evolving world of technology. 
              My goal is to create innovative solutions that make a positive impact on the digital landscape.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <motion.span
                  key={index}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;