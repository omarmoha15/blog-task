// src/app/context/ThemeLanguageContext.js
"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';
import i18n from '@/i18n'; // Make sure this is the initialized instance

export const ThemeLanguageContext = createContext();

export const ThemeLanguageProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');

  // Load saved theme and language from localStorage on first load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedLanguage = localStorage.getItem('language');
    if (savedTheme) setTheme(savedTheme);
    if (savedLanguage) {
      setLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  // Function to toggle the theme between light and dark
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Function to toggle the language between English and Arabic
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <ThemeLanguageContext.Provider value={{ theme, toggleTheme, language, toggleLanguage }}>
      {children}
    </ThemeLanguageContext.Provider>
  );
};

export const useThemeLanguage = () => useContext(ThemeLanguageContext);
