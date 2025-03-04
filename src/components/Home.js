import React, { useEffect, useRef, useState, useContext } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowDown, Code, Server, Database, Star, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadSlim } from "tsparticles-slim";
import { Typewriter } from 'react-simple-typewriter';
import { ThemeContext } from '../context/ThemeContext';
import { useInView } from 'react-intersection-observer';

const TechIcon = ({ src, alt, delay, x, y }) => {
  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: [0, 1.2, 1],
      transition: { duration: 1.2, delay }
    },
    hover: { 
      scale: 1.2, 
      rotate: 10, 
      transition: { duration: 0.3 } 
    },
    tap: { 
      scale: 0.9,
      transition: { duration: 0.1 } 
    }
  };

  const floatVariants = {
    animate: {
      y: [y - 5, y + 5, y - 5],
      x: [x - 5, x + 5, x - 5],
      transition: {
        repeat: Infinity,
        duration: 8 + Math.random() * 4
      }
    }
  };

  return (
    <motion.div
      className="absolute"
      initial="hidden"
      animate="visible"
      variants={iconVariants}
    >
      <motion.div
        variants={floatVariants}
        animate="animate"
      >
        <motion.img 
          src={`/icons/${src}`} 
          alt={alt} 
          className="w-10 h-10 md:w-14 md:h-14 object-contain drop-shadow-xl"
          whileHover="hover"
          whileTap="tap"
        />
      </motion.div>
    </motion.div>
  );
};

const Home = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { scrollYProgress } = useScroll();
  const mainRef = useRef(null);
  const [mainInViewRef, mainInView] = useInView({ threshold: 0.1, triggerOnce: false });
  const [projectInViewRef, projectInView] = useInView({ threshold: 0.1, triggerOnce: false });
  const [skillsInViewRef, skillsInView] = useInView({ threshold: 0.1, triggerOnce: false });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacitySection = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.8], [1, 1, 0.6, 0]);
  
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const iconPositions = [
    { src: 'react.svg', alt: 'React', delay: 0.2, x: -120, y: -140 },
    { src: 'python.svg', alt: 'Python', delay: 0.3, x: 120, y: -100 },
    { src: 'javascript.svg', alt: 'JavaScript', delay: 0.4, x: -180, y: 80 },
    { src: 'node.svg', alt: 'Node.js', delay: 0.5, x: 180, y: 120 },
    { src: 'mongodb.svg', alt: 'MongoDB', delay: 0.6, x: 60, y: -160 },
    { src: 'postgres.svg', alt: 'PostgreSQL', delay: 0.7, x: -80, y: 160 },
  ];

  const skills = [
    { name: 'React', level: 90, icon: <Code size={24} /> },
    { name: 'JavaScript', level: 85, icon: <Code size={24} /> },
    { name: 'Node.js', level: 80, icon: <Server size={24} /> },
    { name: 'Python', level: 90, icon: <Code size={24} /> },
    { name: 'MongoDB', level: 75, icon: <Database size={24} /> },
    { name: 'PostgreSQL', level: 80, icon: <Database size={24} /> },
  ];

  const featuredProjects = [
    {
      title: 'Weather App',
      description: 'Real-time weather forecasting with location services and beautiful visualizations',
      image: '/Screenshot from 2024-10-20 09-46-47.png',
      link: '/projects',
      tags: ['EJS', 'OpenWeather API', 'CSS', "Node.js", "Express", "MongoDB"]
    },
    {
      title: 'Dream Forex',
      description: 'Interactive platform for learning forex trading strategies with real-time market data',
      image: '/Screenshot from 2024-10-20 09-49-05.png',
      link: '/projects',
      tags: ['EJS', 'CSS', "Node.js", "Express", "MongoDB"]
    }
  ];

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: isDarkMode 
        ? "0 10px 25px rgba(96, 165, 250, 0.4)" 
        : "0 10px 25px rgba(59, 130, 246, 0.4)"
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className={`relative ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: isDarkMode ? "#0f172a" : "#f8fafc",
              },
            },
            fpsLimit: 60,
            particles: {
              color: {
                value: isDarkMode ? "#60a5fa" : "#3b82f6",
              },
              links: {
                color: isDarkMode ? "#60a5fa" : "#3b82f6",
                distance: 150,
                enable: true,
                opacity: 0.3,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 1.5,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.4,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
            detectRetina: true,
          }}
          className="absolute inset-0 z-0"
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          style={{ opacity: opacitySection }}
          className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center"
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {iconPositions.map((icon, index) => (
              <TechIcon 
                key={index} 
                src={icon.src} 
                alt={icon.alt} 
                delay={icon.delay} 
                x={icon.x} 
                y={icon.y}
              />
            ))}
          </div>

          <div className="text-center px-8 max-w-4xl relative z-20">
            <motion.div
              variants={childVariants}
              className="mb-8"
            >
              <h1 className="display-text text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 mb-4">
                Hi, I'm <span className="font-bold">Naol Demisse</span>
              </h1>
              <div className="text-xl md:text-3xl text-gray-300 h-12 md:h-14">
                <Typewriter
                  words={[
                    'Full Stack Developer',
                    'Python Specialist',
                    'JavaScript Enthusiast',
                    'Problem Solver',
                    'UI/UX Designer'
                  ]}
                  loop={0}
                  cursor
                  cursorStyle='|'
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </div>
            </motion.div>

            <motion.p
              variants={childVariants}
              className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              I build exceptional digital experiences with modern technologies.
              My focus is creating elegant solutions for complex problems.
            </motion.p>

            <motion.div
              variants={childVariants}
              className="flex flex-col md:flex-row items-center justify-center gap-6"
            >
              <Link to="/projects">
                <motion.button
                  className="btn-primary flex items-center"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  See my work
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className="ml-2" size={20} />
                  </motion.div>
                </motion.button>
              </Link>
              
              <Link to="/contact">
                <motion.button
                  className="btn-secondary"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Get in touch
                </motion.button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              y: [0, 10, 0],
              transition: { 
                opacity: { delay: 2, duration: 1 },
                y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } 
              }
            }}
            onClick={() => {
              mainRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Scroll to explore</p>
            <motion.div 
              className="flex justify-center"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowDown className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} size={24} />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Expertise Section */}
      <motion.section 
        ref={mainRef}
        style={{ y: backgroundY }}
        className={`py-24 px-6 sm:px-8 ${isDarkMode ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'}`}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            ref={mainInViewRef}
            initial={{ opacity: 0, y: 40 }}
            animate={mainInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className={`heading-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              My <span className="gradient-text">Expertise</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              With a strong foundation in both frontend and backend technologies, I create complete, 
              scalable solutions that deliver exceptional user experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={skillsInViewRef}>
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, boxShadow: isDarkMode ? '0 20px 30px rgba(0, 0, 0, 0.3)' : '0 20px 30px rgba(0, 0, 0, 0.1)' }}
                className={`p-8 rounded-2xl card-modern ${isDarkMode ? 'bg-gray-800/80' : 'bg-white/90'}`}
              >
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg mr-4 ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                    {skill.icon}
                  </div>
                  <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{skill.name}</h3>
                </div>
                
                <div className="skill-bar mb-2">
                  <motion.div 
                    className="skill-progress"
                    initial={{ width: 0 }}
                    animate={skillsInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1.2, delay: 0.2 + index * 0.1 }}
                  />
                </div>
                
                <div className="flex justify-between text-xs">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Proficiency</span>
                  <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>{skill.level}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Projects Section */}
      <section className={`py-24 px-6 sm:px-8 relative ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <motion.div 
            ref={projectInViewRef}
            initial={{ opacity: 0, y: 40 }}
            animate={projectInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className={`heading-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              A glimpse of my recent work. Visit the projects page to see more of what I've built.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {featuredProjects.map((project, index) => (
              <Link to={project.link} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={projectInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.7, delay: 0.2 + index * 0.2 }}
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: isDarkMode 
                      ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)" 
                      : "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                  className="rounded-2xl overflow-hidden card-modern"
                >
                  <div className="relative overflow-hidden group">
                    <div className="aspect-video">
                      <motion.img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80"></div>
                    </div>
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={projectInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.4 + index * 0.2 }}
                      >
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag, idx) => (
                            <span 
                              key={idx} 
                              className={`text-xs px-3 py-1 rounded-full ${
                                isDarkMode 
                                  ? 'bg-blue-500/30 text-blue-200' 
                                  : 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                          {project.title}
                        </h3>
                        
                        <p className="text-gray-300 mb-4">
                          {project.description}
                        </p>
                        
                        <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                          <span className="mr-2 text-sm font-medium">View project</span>
                          <ExternalLink size={16} />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={projectInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-center mt-16"
          >
            <Link to="/projects">
              <motion.button
                className="btn-secondary"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: isDarkMode ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                View all projects
                <ArrowRight className="ml-2" size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Make sure content ends with enough space for footer to display properly */}
      <div className="h-12"></div>
      
      {/* Scroll To Top Button */}
      <ScrollToTopButton isDarkMode={isDarkMode} />
    </div>
  );
};

const ScrollToTopButton = ({ isDarkMode }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(v => {
      setVisible(v > 0.1);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg z-50 
            ${isDarkMode 
              ? 'bg-blue-600 hover:bg-blue-500 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Star size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default Home;