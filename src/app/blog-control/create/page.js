"use client";

import { useThemeLanguage } from '@/app/context/ThemeLanguageContext';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

// Updated imports from react-icons
import { FiSun, FiMoon, FiFlag, FiArrowLeft } from 'react-icons/fi';

export default function CreateBlogPage() {
  const { theme, toggleTheme, language, toggleLanguage } = useThemeLanguage();
  const { t } = useTranslation('common');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);

  const handleCreateBlog = async () => {
    // Blog creation logic here
    alert(t('blog_saved')); // Notify user that the blog has been saved successfully
  };

  return (
    <div
      className={`min-h-screen ${theme} ${language === 'ar' ? 'rtl' : 'ltr'} flex flex-col items-center`}
      style={{
        backgroundColor: theme === 'light' ? '#f0f4f8' : '#0f172a', // Updated colors for consistency
        color: theme === 'light' ? '#000000' : '#ffffff',
        direction: language === 'ar' ? 'rtl' : 'ltr',
      }}
    >
      {/* Header */}
      <header className="flex justify-between items-center p-6 w-11/12 mt-8 rounded-full shadow-lg"
        style={{ backgroundColor: theme === 'light' ? '#007acc' : '#334155', color: '#ffffff' }}
      >
        <div className="flex items-center">
          <button
            onClick={() => history.back()}
            className="p-3 rounded-full shadow-md hover:opacity-80 transition-colors flex items-center justify-center mr-4"
            style={{ backgroundColor: theme === 'light' ? '#005ea3' : '#475569', color: '#ffffff' }}
          >
            <FiArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-light">{t('create_blog')}</h1>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={toggleLanguage}
            className="p-3 rounded-full shadow-md hover:opacity-80 transition-colors flex items-center justify-center"
            style={{ backgroundColor: theme === 'light' ? '#005ea3' : '#475569', color: '#ffffff' }}
          >
            {language === 'en' ? <FiFlag size={20} title="Arabic" /> : <FiFlag size={20} title="English" />}
          </button>
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full shadow-md hover:opacity-80 transition-colors flex items-center justify-center"
            style={{ backgroundColor: theme === 'light' ? '#005ea3' : '#475569', color: '#ffffff' }}
          >
            {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-11/12 p-10 bg-white dark:bg-gray-800 rounded-lg shadow-xl mt-10"
        style={{
          backgroundColor: theme === 'light' ? '#ffffff' : '#1a1a1a',
          color: theme === 'light' ? '#000000' : '#e0e0e0',
        }}
      >
        <div className="mb-6">
          <label htmlFor="title" className="block text-lg font-semibold mb-2">{t('blog_title')}</label>
          <input
            id="title"
            type="text"
            placeholder={t('blog_title')}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 rounded-lg border-2 border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:outline-none transition-all"
            style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#333333', color: theme === 'light' ? '#000000' : '#ffffff' }}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="content" className="block text-lg font-semibold mb-2">{t('blog_content')}</label>
          <textarea
            id="content"
            placeholder={t('blog_content')}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 rounded-lg border-2 border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:outline-none transition-all"
            rows="6"
            style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#333333', color: theme === 'light' ? '#000000' : '#ffffff' }}
          ></textarea>
        </div>
        <div className="mb-6">
          <label htmlFor="tags" className="block text-lg font-semibold mb-2">{t('blog_tags')}</label>
          <input
            id="tags"
            type="text"
            placeholder={t('blog_tags')}
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-4 rounded-lg border-2 border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:outline-none transition-all"
            style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#333333', color: theme === 'light' ? '#000000' : '#ffffff' }}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="image" className="block text-lg font-semibold mb-2">{t('blog_image')}</label>
          <input
            id="image"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-4 rounded-lg border-2 border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:outline-none transition-all"
            style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#333333', color: theme === 'light' ? '#000000' : '#ffffff' }}
          />
        </div>
        <div className="flex justify-center">
          <button onClick={handleCreateBlog} className="text-lg px-8 py-4 rounded-full shadow-md hover:opacity-90 transition-all bg-green-500 text-white font-semibold flex items-center">
            {t('save')}
          </button>
        </div>
      </main>
    </div>
  );
}
