import React from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">Naol A. Demisse</h2>
          <p className="text-gray-400">Full Stack & Python Developer</p>
        </div>
        <div className="flex space-x-4">
          <a href="https://www.linkedin.com/in/naol-demisse-871b8b28a/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-300">
            <Linkedin size={24} />
          </a>
          <a href="https://github.com/ProgNaol" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-300">
            <Github size={24} />
          </a>
          <a href="mailto:ndemisse2007@outlook.com" className="hover:text-blue-400 transition duration-300">
            <Mail size={24} />
          </a>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Naol A. Demisse. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;