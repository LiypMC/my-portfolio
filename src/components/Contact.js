import React, { useState, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, AlertTriangle, MapPin, Phone, Mail, Clock, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import emailjs from '@emailjs/browser';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [touched, setTouched] = useState({});
  const [activeField, setActiveField] = useState(null);
  const formRef = useRef();
  const { isDarkMode } = useContext(ThemeContext);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setActiveField(null);
  };

  const handleFocus = (field) => {
    setActiveField(field);
  };

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.message) errors.message = 'Message is required';
    return errors;
  };

  const errors = validate();
  const isFormValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      // Mark all fields as touched to show all errors
      setTouched({
        name: true,
        email: true,
        message: true
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Add the destination email as a hidden field
      const templateParams = {
        to_email: 'naol@naol.pro',
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message
      };
      
      // Replace these IDs with your actual EmailJS credentials
      await emailjs.send(
        'service_sky8gq6', // Create service on emailjs.com and get your service ID
        'template_s669wyj', // Create email template and get template ID
        templateParams,
        'pdnAuEv2s3pV0femb' // Get your public key from EmailJS account
      );
      
      setSubmitStatus('success');
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      setTouched({});
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Clear status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const formFieldVariants = {
    focus: { 
      scale: 1.02,
      transition: { duration: 0.3 }
    },
    blur: {
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`min-h-screen py-24 px-6 md:px-8 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'
      } transition-colors duration-300`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className={`heading-xl font-bold mb-20 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
          variants={childVariants}
        >
          Get in <span className="gradient-text">Touch</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10" ref={ref}>
          <motion.div
            variants={childVariants}
            className="card-modern rounded-2xl overflow-hidden shadow-xl"
          >
            <div className={`p-8 ${isDarkMode ? 'bg-gray-800/80' : 'bg-white/90'}`}>
              <h3 className={`text-2xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Send a Message</h3>
              
              <form onSubmit={handleSubmit} ref={formRef}>
                <div className="space-y-5">
                  <motion.div 
                    variants={formFieldVariants}
                    animate={activeField === 'name' ? 'focus' : 'blur'}
                    className="relative"
                  >
                    <label 
                      htmlFor="name" 
                      className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={() => handleFocus('name')}
                      className={`w-full p-3.5 rounded-lg border ${
                        touched.name && errors.name 
                          ? (isDarkMode ? 'border-red-500' : 'border-red-500') 
                          : (isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                            : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500')
                      } focus:outline-none focus:ring-2 ${
                        touched.name && errors.name 
                          ? 'focus:ring-red-200' 
                          : 'focus:ring-blue-200'
                      } transition-colors`}
                      placeholder="John Doe"
                    />
                    {touched.name && errors.name && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-500 flex items-center"
                      >
                        <AlertTriangle size={14} className="mr-1" /> {errors.name}
                      </motion.p>
                    )}
                  </motion.div>
                  
                  <motion.div 
                    variants={formFieldVariants}
                    animate={activeField === 'email' ? 'focus' : 'blur'}
                    className="relative"
                  >
                    <label 
                      htmlFor="email" 
                      className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={() => handleFocus('email')}
                      className={`w-full p-3.5 rounded-lg border ${
                        touched.email && errors.email 
                          ? (isDarkMode ? 'border-red-500' : 'border-red-500') 
                          : (isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                            : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500')
                      } focus:outline-none focus:ring-2 ${
                        touched.email && errors.email 
                          ? 'focus:ring-red-200' 
                          : 'focus:ring-blue-200'
                      } transition-colors`}
                      placeholder="johndoe@example.com"
                    />
                    {touched.email && errors.email && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-500 flex items-center"
                      >
                        <AlertTriangle size={14} className="mr-1" /> {errors.email}
                      </motion.p>
                    )}
                  </motion.div>
                  
                  <motion.div 
                    variants={formFieldVariants}
                    animate={activeField === 'message' ? 'focus' : 'blur'}
                    className="relative"
                  >
                    <label 
                      htmlFor="message" 
                      className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={() => handleFocus('message')}
                      className={`w-full p-3.5 rounded-lg border ${
                        touched.message && errors.message 
                          ? (isDarkMode ? 'border-red-500' : 'border-red-500') 
                          : (isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                            : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500')
                      } focus:outline-none focus:ring-2 ${
                        touched.message && errors.message 
                          ? 'focus:ring-red-200' 
                          : 'focus:ring-blue-200'
                      } transition-colors`}
                      placeholder="How can I help you?"
                    />
                    {touched.message && errors.message && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-500 flex items-center"
                      >
                        <AlertTriangle size={14} className="mr-1" /> {errors.message}
                      </motion.p>
                    )}
                  </motion.div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full p-4 rounded-lg font-medium flex items-center justify-center ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'btn-primary'
                    } shadow-lg transition-all duration-300`}
                    whileHover={isSubmitting ? {} : { scale: 1.02, y: -2 }}
                    whileTap={isSubmitting ? {} : { scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="mr-2">Sending...</span>
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={18} className="ml-2" />
                      </>
                    )}
                  </motion.button>
                </div>
                
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-6 p-4 rounded-lg bg-green-100 text-green-800 flex items-center shadow-md"
                    >
                      <Check size={20} className="mr-3 flex-shrink-0" />
                      <p>Your message has been sent successfully! I'll get back to you soon.</p>
                    </motion.div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-6 p-4 rounded-lg bg-red-100 text-red-800 flex items-center shadow-md"
                    >
                      <AlertTriangle size={20} className="mr-3 flex-shrink-0" />
                      <p>There was an error sending your message. Please try again later or contact me directly via email.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
          
          <motion.div
            variants={childVariants}
            className="h-full"
          >
            <div className="h-full rounded-2xl overflow-hidden shadow-xl">
              <div className="h-full relative bg-gradient-to-br from-blue-500 to-purple-600">
                {/* Decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div 
                    className="absolute top-20 left-20 w-40 h-40 rounded-full bg-white/10"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 180, 270, 360]
                    }}
                    transition={{ 
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <motion.div 
                    className="absolute bottom-40 right-30 w-60 h-60 rounded-full bg-white/5"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      x: [0, 30, 0],
                      y: [0, 20, 0]
                    }}
                    transition={{ 
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
                </div>
                
                <div className="relative h-full p-10 flex flex-col">
                  <h3 className="text-2xl font-bold mb-8 text-white">Contact Information</h3>
                  
                  <div className="space-y-8 flex-grow">
                    <div className="flex items-start text-white">
                      <div className="bg-white/20 p-3 rounded-lg mr-4 backdrop-blur-sm">
                        <MapPin size={22} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Location</h4>
                        <p className="opacity-90">Addis Ababa, Ethiopia</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start text-white">
                      <div className="bg-white/20 p-3 rounded-lg mr-4 backdrop-blur-sm">
                        <Mail size={22} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Email</h4>
                        <a 
                          href="mailto:naol@naol.pro" 
                          className="opacity-90 hover:opacity-100 transition-opacity flex items-center"
                        >
                          dl.naolalemayehu@yahoo.com
                          <ExternalLink size={14} className="ml-2" />
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start text-white">
                      <div className="bg-white/20 p-3 rounded-lg mr-4 backdrop-blur-sm">
                        <Phone size={22} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Phone</h4>
                        <a 
                          href="tel:+251912345678" 
                          className="opacity-90 hover:opacity-100 transition-opacity flex items-center"
                        >
                          +251 912 345 678
                          <ExternalLink size={14} className="ml-2" />
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start text-white">
                      <div className="bg-white/20 p-3 rounded-lg mr-4 backdrop-blur-sm">
                        <Clock size={22} className="text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <motion.div 
                      className="relative bg-white/10 p-6 rounded-xl backdrop-blur-md group"
                      whileHover={{ y: -5 }}
                    >
                      <motion.div 
                        className="absolute -top-2 -right-2"
                        animate={{ rotate: [0, 10, 0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                      >
                        <Sparkles size={18} className="text-yellow-300" />
                      </motion.div>
                      
                      <p className="text-white text-center">
                        "I'm currently available for freelance work and full-time positions. Let's build something amazing together!"
                      </p>
                      
                      <motion.a 
                        href="#"
                        className="mt-4 text-white/80 hover:text-white text-sm flex items-center justify-center transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        View my resume
                        <ArrowRight size={14} className="ml-1" />
                      </motion.a>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;