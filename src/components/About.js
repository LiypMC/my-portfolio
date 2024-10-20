import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-8"
    >
      <h2 className="text-3xl font-bold mb-4">About Me</h2>
      <div className="flex flex-col md:flex-row items-center">
        <motion.img 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          src="/139908666.jpg" 
          alt="Naol" 
          className="rounded-full w-64 h-64 object-cover mb-4 md:mr-8"
        />
        <motion.p 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-lg"
        >
          I am a python developer and a Full Stack Developer, who is invested with AI and software development, currently working with python but working on to get my knowledge up.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default About;
