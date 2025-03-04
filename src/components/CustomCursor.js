import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(true);
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    // Function to update mouse position
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Function to handle mouse click
    const onMouseDown = () => {
      setClicked(true);
    };

    // Function to handle mouse release
    const onMouseUp = () => {
      setClicked(false);
    };

    // Functions to show/hide cursor
    const onMouseEnter = () => {
      setHidden(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    // Function to detect when mouse is over clickable elements
    const addLinkHoverListeners = () => {
      const handleLinkMouseEnter = () => setLinkHovered(true);
      const handleLinkMouseLeave = () => setLinkHovered(false);

      // Target all interactive elements
      document.querySelectorAll('a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])').forEach(el => {
        el.addEventListener('mouseenter', handleLinkMouseEnter);
        el.addEventListener('mouseleave', handleLinkMouseLeave);
      });

      return () => {
        document.querySelectorAll('a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])').forEach(el => {
          el.removeEventListener('mouseenter', handleLinkMouseEnter);
          el.removeEventListener('mouseleave', handleLinkMouseLeave);
        });
      };
    };

    // Check if we're in a browser and not on a touch device before adding listeners
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      
      const cleanupLinkListeners = addLinkHoverListeners();
      setHidden(false);

      // Cleanup function to remove all event listeners
      return () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mouseenter', onMouseEnter);
        document.removeEventListener('mouseleave', onMouseLeave);
        cleanupLinkListeners();
      };
    }
    // If not in browser or on touch device, do nothing
    return undefined;
  }, []);  // Empty dependency array means this runs once on mount

  // Skip rendering cursor on touch devices
  if (typeof navigator !== 'undefined' && (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)
  )) {
    return null;
  }

  return (
    <div
      className="cursor-custom"
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: linkHovered ? '40px' : '32px',
        height: linkHovered ? '40px' : '32px',
        borderRadius: '50%',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.2s ease-out, height 0.2s ease-out, background-color 0.2s ease-out, opacity 0.2s ease-out, transform 0.1s ease-out',
        zIndex: 9999,
        opacity: hidden ? 0 : 1,
        backgroundColor: clicked ? 
          (isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(59, 130, 246, 0.2)') : 
          'transparent',
        border: `2px solid ${isDarkMode ? '#ffffff' : '#3B82F6'}`,
        boxShadow: `0 0 10px rgba(${isDarkMode ? '255, 255, 255' : '59, 130, 246'}, 0.5)`,
        mixBlendMode: isDarkMode ? 'difference' : 'normal',
        transform: `translate(-50%, -50%) scale(${clicked ? 0.8 : 1})`,
      }}
    >
      {/* Small inner dot */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          backgroundColor: isDarkMode ? '#ffffff' : '#3B82F6',
          transform: 'translate(-50%, -50%)',
          opacity: clicked ? 0.8 : 0.6,
        }}
      />
    </div>
  );
};

export default CustomCursor;