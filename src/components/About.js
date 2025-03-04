import React, { useState, useContext, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Code, 
  Database, 
  Activity, 
  Server, 
  ChevronLeft, 
  ChevronRight,
  Download,
  Award,
  Book,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { ThemeContext } from '../context/ThemeContext';
import profilePic from './naolpic.jpg'; // Import profile picture

const About = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [activeCategory, setActiveCategory] = useState('all');
  const contentRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Check for mobile viewport
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Scroll to top when tab changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [activeTab]);
  
  // Parallax effect for background
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const [profileRef, profileInView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [skillRef, skillsInView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [expRef, expInView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [eduRef, eduInView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [certRef, certInView] = useInView({ triggerOnce: false, threshold: 0.1 });
  
  // Tab indicators show current progress in tab content
  const [profileProgress, setProfileProgress] = useState(0);
  const [skillsProgress, setSkillsProgress] = useState(0);
  const [expProgress, setExpProgress] = useState(0);
  const [eduProgress, setEduProgress] = useState(0);
  const [certProgress, setCertProgress] = useState(0);
  
  // Update progress on scroll
  const handleTabScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const progress = scrollTop / (scrollHeight - clientHeight);
    
    switch(activeTab) {
      case 'profile':
        setProfileProgress(progress);
        break;
      case 'skills':
        setSkillsProgress(progress);
        break;
      case 'experience':
        setExpProgress(progress);
        break;
      case 'education':
        setEduProgress(progress);
        break;
      case 'certifications':
        setCertProgress(progress);
        break;
      default:
        break;
    }
  };
  
  // Profile section
  const profile = {
    name: "Naol Alemayehu Demisse",
    title: "Full Stack Developer & Data Scientist",
    bio: "I'm a passionate developer based in Addis Ababa, Ethiopia, with expertise in both frontend and backend technologies. With a strong foundation in computer science and a keen eye for design, I create elegant, efficient, and user-centered digital experiences.",
    focus: "My focus is on developing scalable applications using modern technologies while constantly learning and adapting to the ever-evolving tech landscape.",
    interests: ["Web Development", "Machine Learning", "Data Visualization", "Mobile App Development", "UI/UX Design"],
    languages: ["English (Fluent)", "Amharic (Native)"],
    hobbies: ["Coding", "Reading Tech Blogs", "Playing Chess", "Photography", "Hiking"]
  };
  
  const skills = [
    { name: 'Python', level: 90, icon: <Code size={20} />, category: 'Programming' },
    { name: 'JavaScript', level: 85, icon: <Code size={20} />, category: 'Programming' },
    { name: 'React', level: 85, icon: <Code size={20} />, category: 'Frontend' },
    { name: 'Node.js', level: 80, icon: <Server size={20} />, category: 'Backend' },
    { name: 'Express', level: 80, icon: <Server size={20} />, category: 'Backend' },
    { name: 'PostgreSQL', level: 75, icon: <Database size={20} />, category: 'Database' },
    { name: 'MongoDB', level: 75, icon: <Database size={20} />, category: 'Database' },
    { name: 'Data Analysis', level: 85, icon: <Activity size={20} />, category: 'Data' },
    { name: 'NumPy', level: 85, icon: <Activity size={20} />, category: 'Data' },
    { name: 'Auth Systems', level: 80, icon: <Server size={20} />, category: 'Security' },
    { name: 'Full Stack Development', level: 85, icon: <Code size={20} />, category: 'Development' },
  ];

  const experiences = [
    {
      year: '2023 - Present',
      title: 'Full Stack Developer',
      company: 'Freelance',
      description: 'Building web applications using React, Node.js, and PostgreSQL. Implementing authentication systems and RESTful APIs.',
      achievements: [
        'Reduced page load time by 40% through code optimization',
        'Implemented JWT authentication system increasing security',
        'Built responsive dashboard used by 10,000+ users daily'
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'MongoDB', 'Ejs', 'Auth', 'Web3']
    }
  ];

  const education = [
    {
      year: '2023 - 2024',
      degree: 'full stack web development',
      institution: 'Udemy',
      description: 'A comprehensive course that covers both frontend and backend development, with a focus on building scalable and secure web applications.',
      courses: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Ejs', 'Auth', 'Web3']
    }
  ];

  const certifications = [
    {
      title: 'The Complete Full-Stack Web Development Bootcamp',
      organization: 'Udemy',
      date: 'Oct 15, 2024',
      skills: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Ejs', 'Auth', 'Web3']
    }
  ]

  // Group skills by category
  const skillCategories = [...new Set(skills.map(skill => skill.category))];
  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  // Tab items with icons
  const tabItems = [
    { id: 'profile', label: 'Profile', icon: <Activity size={18} /> },
    { id: 'skills', label: 'Skills', icon: <Code size={18} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={18} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={18} /> },
    { id: 'certifications', label: 'Certifications', icon: <Award size={18} /> }
  ];

  // Get progress based on active tab
  const getProgress = (tab) => {
    switch(tab) {
      case 'profile': return profileProgress;
      case 'skills': return skillsProgress;
      case 'experience': return expProgress;
      case 'education': return eduProgress;
      case 'certifications': return certProgress;
      default: return 0;
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
      className={`min-h-screen py-16 md:py-24 px-4 md:px-8 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'
      }`}
    >
      {/* Animated background elements */}
      <div className="animated-bg">
        <motion.div 
          className="animated-blob"
          style={{
            top: '20%',
            left: '10%',
            width: '300px',
            height: '300px',
            background: isDarkMode ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.07)',
            y: scrollY * -0.2
          }}
        />
        <motion.div 
          className="animated-blob"
          style={{
            top: '60%',
            right: '10%',
            width: '250px',
            height: '250px',
            background: isDarkMode ? 'rgba(124, 58, 237, 0.15)' : 'rgba(124, 58, 237, 0.07)',
            y: scrollY * -0.1
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2 
          className={`heading-xl font-bold mb-12 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
          variants={itemVariants}
        >
          About <span className="gradient-text">Me</span>
        </motion.h2>

        {/* Mobile Tabs (Dropdown on mobile) */}
        <div className="md:hidden mb-6">
          <motion.div 
            className={`card-modern rounded-xl p-4 ${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'}`}
            variants={itemVariants}
          >
            <div className={`flex items-center justify-between w-full p-2 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <div className="flex items-center space-x-2">
                {tabItems.find(tab => tab.id === activeTab)?.icon}
                <span className="capitalize font-medium">{activeTab}</span>
              </div>
              <div className="flex gap-2">
                {tabItems.map((tab, index) => (
                  <motion.button
                    key={tab.id}
                    className={`w-2 h-2 rounded-full ${
                      activeTab === tab.id
                        ? 'bg-blue-500'
                        : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Desktop Sidebar */}
          <motion.div 
            className={`hidden md:block w-full md:w-1/4 card-modern rounded-2xl p-6 h-fit sticky top-24`}
            variants={itemVariants}
          >
            <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Navigation
            </h3>
            
            <div className="space-y-3">
              {tabItems.map((tab) => (
                <motion.button
                  key={tab.id}
                  className={`w-full text-left px-4 py-3 rounded-xl flex justify-between items-center ${
                    activeTab === tab.id
                      ? isDarkMode 
                        ? 'bg-blue-600/20 text-blue-400 font-medium' 
                        : 'bg-blue-50 text-blue-600 font-medium'
                      : isDarkMode 
                        ? 'hover:bg-gray-700/50 text-gray-300' 
                        : 'hover:bg-gray-100 text-gray-700'
                  } transition-all duration-300`}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ x: 5 }}
                >
                  <span className="flex items-center">
                    <span className="mr-3">{tab.icon}</span>
                    <span className="capitalize">{tab.label}</span>
                  </span>
                  
                  {activeTab === tab.id && (
                    <span>
                      <motion.div
                        className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="w-2 h-2 rounded-full bg-white"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        />
                      </motion.div>
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
            
            {/* Resume Download Button */}
            <motion.a
              href="/Naol_Demisse_Resume.pdf"
              download
              className={`mt-6 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl ${
                isDarkMode 
                  ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              } transition-colors`}
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
            >
              <Download size={16} />
              <span>Download Resume</span>
            </motion.a>
          </motion.div>
          
          {/* Tab content area - REMOVED FIXED HEIGHT CONSTRAINT */}
          <div 
            className={`md:w-3/4 p-6 md:p-8 card-modern rounded-2xl overflow-y-visible`}
            ref={contentRef}
            onScroll={handleTabScroll}
          >
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  ref={profileRef}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabVariants}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <div className="flex flex-col lg:flex-row gap-8 items-center">
                    <motion.div
                      className="w-full lg:w-1/3 flex-shrink-0"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className={`overflow-hidden rounded-2xl border-4 ${
                        isDarkMode ? 'border-gray-700' : 'border-white'
                      } shadow-xl`}>
                        <img 
                          src={profilePic} 
                          alt="Naol Alemayehu Demisse" 
                          className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      
                      {/* Mobile Resume Download Button */}
                      <motion.a
                        href="/Naol_Demisse_Resume.pdf"
                        download
                        className={`md:hidden mt-4 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl ${
                          isDarkMode 
                            ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        } transition-colors`}
                        whileHover={{ y: -3 }}
                        whileTap={{ y: 0 }}
                      >
                        <Download size={16} />
                        <span>Download Resume</span>
                      </motion.a>
                    </motion.div>
                    
                    <div className="w-full lg:w-2/3">
                      <motion.h3 
                        className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {profile.name}
                      </motion.h3>
                      
                      <motion.p 
                        className={`text-lg font-medium mb-4 ${
                          isDarkMode ? 'text-blue-400' : 'text-blue-600'
                        }`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {profile.title}
                      </motion.p>
                      
                      <motion.p 
                        className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        {profile.bio}
                      </motion.p>
                      
                      <motion.p 
                        className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        {profile.focus}
                      </motion.p>
                    </div>
                  </div>
                  
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                      <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Areas of Interest
                      </h4>
                      <ul className="space-y-2">
                        {profile.interests.map((interest, idx) => (
                          <li key={idx} className="flex items-center">
                            <div className={`mr-3 w-1.5 h-1.5 rounded-full ${
                              isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
                            }`}></div>
                            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                              {interest}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                      <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Languages & Hobbies
                      </h4>
                      <div className="mb-4">
                        <h5 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Languages
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {profile.languages.map((lang, idx) => (
                            <span 
                              key={idx}
                              className={`px-3 py-1 rounded-full text-sm ${
                                isDarkMode 
                                  ? 'bg-gray-700 text-gray-300' 
                                  : 'bg-gray-200 text-gray-700'
                              }`}
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Hobbies
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {profile.hobbies.map((hobby, idx) => (
                            <span 
                              key={idx}
                              className={`px-3 py-1 rounded-full text-sm ${
                                isDarkMode 
                                  ? 'bg-blue-500/20 text-blue-300' 
                                  : 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {hobby}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
              
              {activeTab === 'skills' && (
                <motion.div
                  key="skills"
                  ref={skillRef}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabVariants}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex flex-wrap gap-3 mb-10">
                    <motion.button
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        activeCategory === 'all' 
                          ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                          : (isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700')
                      }`}
                      onClick={() => setActiveCategory('all')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      All Skills
                    </motion.button>
                    
                    {skillCategories.map((category, index) => (
                      <motion.button
                        key={index}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          activeCategory === category 
                            ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                            : (isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700')
                        }`}
                        onClick={() => setActiveCategory(category)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredSkills.map((skill, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group hover-lift"
                      >
                        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'} shadow-md`}>
                          <div className="flex items-center mb-4">
                            <div className={`p-2.5 rounded-lg mr-4 ${
                              isDarkMode 
                                ? 'bg-blue-500/20 text-blue-400' 
                                : 'bg-blue-100 text-blue-600'
                            } group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300`}>
                              {skill.icon}
                            </div>
                            <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {skill.name}
                            </h4>
                          </div>
                          
                          <div className="flex justify-between items-center mb-2">
                            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {skill.category}
                            </span>
                            <span className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                              {skill.level}%
                            </span>
                          </div>
                          
                          <div className="skill-bar">
                            <motion.div 
                              className="skill-progress"
                              initial={{ width: 0 }}
                              animate={skillsInView ? { width: `${skill.level}%` } : { width: 0 }}
                              transition={{ duration: 1, delay: 0.1 + index * 0.1 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'experience' && (
                <motion.div
                  key="experience"
                  ref={expRef}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabVariants}
                >
                  <h3 className="heading-md font-bold mb-10">Work Experience</h3>
                  <div className="space-y-12">
                    {experiences.map((exp, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={expInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className="relative pl-10 border-l-2 border-blue-500"
                      >
                        <div className="absolute w-5 h-5 bg-blue-500 rounded-full -left-[11px] top-1 shadow-md shadow-blue-500/50"></div>
                        <p className="text-sm font-medium text-blue-500">{exp.year}</p>
                        <h4 className="text-xl font-bold mt-1.5 mb-1">{exp.title}</h4>
                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                          {exp.company}
                        </p>
                        <p className={`mb-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {exp.description}
                        </p>
                        
                        {/* Achievements section */}
                        <div className="mb-6">
                          <h5 className="font-semibold mb-3">Key Achievements:</h5>
                          <ul className="space-y-2.5 ml-2">
                            {exp.achievements.map((achievement, i) => (
                              <motion.li 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={expInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                                className={`flex items-start ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                              >
                                <span className={`inline-flex items-center justify-center rounded-full p-1 ${
                                  isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-600'
                                } mr-2 mt-1 flex-shrink-0`}>
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                  </svg>
                                </span>
                                {achievement}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Technologies section */}
                        <div>
                          <h5 className="font-semibold mb-3">Technologies:</h5>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, i) => (
                              <motion.span 
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={expInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                                className={`px-3 py-1.5 rounded-full text-sm ${
                                  isDarkMode 
                                    ? 'bg-gray-800 text-blue-400 border border-blue-500/30' 
                                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                                }`}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'education' && (
                <motion.div
                  key="education"
                  ref={eduRef}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabVariants}
                >
                  <h3 className="heading-md font-bold mb-10">Education</h3>
                  <div className="space-y-10">
                    {education.map((edu, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={eduInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className={`p-8 rounded-xl card-modern relative`}
                      >
                        <div className={`absolute top-6 right-6 w-14 h-14 flex items-center justify-center rounded-full ${
                          isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'
                        }`}>
                          <motion.div 
                            animate={{ 
                              rotate: [0, 10, 0, -10, 0],
                              scale: [1, 1.1, 1, 1.1, 1]
                            }}
                            transition={{ 
                              duration: 5, 
                              repeat: Infinity, 
                              repeatType: 'loop'
                            }}
                          >
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M22 10L12 4L2 10L12 16L22 10ZM22 10V14" stroke={isDarkMode ? '#60A5FA' : '#3B82F6'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M6 12V17C6 17.5304 6.21071 18.0391 6.58579 18.4142C6.96086 18.7893 7.46957 19 8 19H16C16.5304 19 17.0391 18.7893 17.4142 18.4142C17.7893 18.0391 18 17.5304 18 17V12" stroke={isDarkMode ? '#60A5FA' : '#3B82F6'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </motion.div>
                        </div>
                        
                        <p className="text-sm font-medium text-blue-500 mb-3">{edu.year}</p>
                        <h4 className="text-xl font-bold mb-2">{edu.degree}</h4>
                        <p className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mb-5`}>
                          {edu.institution}
                        </p>
                        <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {edu.description}
                        </p>
                        
                        <div>
                          <h5 className="font-semibold mb-3">Key Courses:</h5>
                          <div className="flex flex-wrap gap-2">
                            {edu.courses.map((course, i) => (
                              <motion.span 
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={eduInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                                className={`px-3 py-1.5 rounded-full text-sm ${
                                  isDarkMode 
                                    ? 'bg-gray-800 text-blue-400 border border-blue-500/30' 
                                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                                }`}
                              >
                                {course}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'certifications' && (
                <motion.div
                  key="certifications"
                  ref={certRef}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabVariants}
                >
                  <h3 className="heading-md font-bold mb-10">Certifications</h3>
                  <div className="space-y-8">
                    {certifications.map((cert, index) => (
                      <motion.div 
                        key={index}
                        className="card-modern p-6 md:p-8 rounded-xl flex flex-col md:flex-row gap-6 items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ y: -5, transition: { duration: 0.3 } }}
                      >
                        <div className="flex-shrink-0">
                          <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center 
                            ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            >
                              <svg width="45" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke={isDarkMode ? '#60A5FA' : '#3B82F6'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M20 12H21M3 12H4M12 20V21M12 3V4M17.6569 17.6569L18.364 18.364M5.63604 5.63604L6.34315 6.34315M6.34315 17.6569L5.63604 18.364M18.364 5.63604L17.6569 6.34315" stroke={isDarkMode ? '#60A5FA' : '#3B82F6'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </motion.div>
                          </div>
                        </div>
                        
                        <div className="flex-grow text-center md:text-left">
                          <h4 className="text-xl font-bold mb-2">{cert.title}</h4>
                          <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {cert.organization} | {cert.date}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mt-3">
                            {cert.skills.map((skill, i) => (
                              <motion.span 
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={certInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                                className={`px-3 py-1.5 rounded-full text-sm ${
                                  isDarkMode 
                                    ? 'bg-gray-800 text-blue-400 border border-blue-500/30' 
                                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                                }`}
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                        
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex-shrink-0"
                        >
                          <a 
                            href="http://udemy.com/certificate/UC-4cbcd42b-4c3a-4f63-8923-4bb2697e9a12/" 
                            className={`p-3 rounded-full flex items-center justify-center ${
                              isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                            } transition-colors`}
                          >
                            <ExternalLink size={20} className={isDarkMode ? 'text-blue-300' : 'text-blue-600'} />
                          </a>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;