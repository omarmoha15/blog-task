"use client";

import { useTranslation } from 'next-i18next';
import { useThemeLanguage } from '@/app/context/ThemeLanguageContext';
import { useEffect, useState } from 'react';

export default function BlogDetailModal({ blog, onClose }) {
  if (!blog) return null;

  const { t } = useTranslation('common');
  const { theme, language } = useThemeLanguage();
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    setAnimationClass('animate-slideIn');
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 relative ${language === 'ar' ? 'rtl' : 'ltr'} ${animationClass}`}
        style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
      >
        <div className="flex items-center mb-4">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">{blog.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('author')}: {blog.authorId} | {t('date_created')}: {new Date(blog.dateCreated).toLocaleDateString()}</p>
          </div>
        </div>
        
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-48 object-cover mb-4 rounded-lg shadow-md"
          />
        )}

        <p className="text-gray-700 dark:text-gray-300 mb-4">{blog.content}</p>

        <div className="text-sm text-teal-500 hover:underline cursor-pointer text-center mt-4" onClick={onClose}>
          {t('close')}
        </div>
      </div>
      <style jsx>{`
        @keyframes slideIn {
          0% {
            transform: translateY(50%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
