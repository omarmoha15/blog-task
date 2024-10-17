"use client";

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import BlogCard from '@/app/components/BlogCard';
import BlogDetailModal from '@/app/components/BlogDetailModal';
import AuthButtons from "@/app/components/AuthButtons";
import { useTranslation } from 'next-i18next';
import { useThemeLanguage } from '@/app/context/ThemeLanguageContext';
import { useRouter } from 'next/navigation';

// Updated imports from react-icons
import { FiSun, FiMoon, FiUser, FiFlag } from 'react-icons/fi';

export default function HomePage() {
  const { t, i18n } = useTranslation('common');
  const { theme, toggleTheme, language, toggleLanguage } = useThemeLanguage();
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState([]);
  const [visibleBlogs, setVisibleBlogs] = useState(5);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        if (response.ok) {
          const blogsData = await response.json();
          setBlogs(blogsData);
        } else {
          console.error('Failed to fetch blogs:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage).then(() => {
        setIsReady(true);
      });
    } else {
      setIsReady(true);
    }
  }, [i18n]);

  if (!isReady) {
    return <div>Loading...</div>; // Ensure the language is ready before rendering the component
  }

  const handleSeeMore = () => {
    setVisibleBlogs((prev) => prev + 5);
  };

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

  const handleCloseModal = () => {
    setSelectedBlog(null);
  };

  return (
    <div className={`min-h-screen ${theme} ${language === 'ar' ? 'rtl' : ''} flex flex-col`}
      style={{
        backgroundColor: theme === 'light' ? '#f0f4f8' : '#0f172a', // Consistent with the dark mode color
        color: theme === 'light' ? '#000000' : '#ffffff',
      }}>
      
      {/* Header */}
      <header className="flex justify-between items-center p-6 rounded-full shadow-lg w-11/12 mx-auto mt-8"
        style={{
          backgroundColor: theme === 'light' ? '#007acc' : '#334155', // Light blue for light mode, darker blue for dark mode
          color: '#ffffff',
        }}>
        <h1 className="text-3xl font-light">{t('my_blog_platform')}</h1>
        <div className="flex space-x-4 items-center">
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
          {session ? (
            <>
              <Link href="/profile">
                <button className="p-3 rounded-full shadow-md hover:opacity-80 transition-colors flex items-center justify-center"
                  style={{ backgroundColor: theme === 'light' ? '#005ea3' : '#475569', color: '#ffffff' }}>
                  <FiUser size={20} />
                </button>
              </Link>
              <button onClick={() => signOut()} className="text-lg p-3 rounded-full shadow-md hover:opacity-80 transition-colors"
                style={{ backgroundColor: theme === 'light' ? '#005ea3' : '#475569', color: '#ffffff' }}>
                {t('logout')}
              </button>
            </>
          ) : (
            <AuthButtons />
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content p-8 w-full flex flex-col items-center flex-grow">
        <div className="blogs-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-11/12">
          {blogs.slice(0, visibleBlogs).map((blog) => (
            <div
              key={blog.id}
              className="relative transform hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:shadow-2xl"
              style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#1a1a1a', color: theme === 'light' ? '#000000' : '#e0e0e0' }}
            >
              <BlogCard blog={blog} onClick={() => handleBlogClick(blog)} />
            </div>
          ))}
        </div>
        {visibleBlogs < blogs.length && (
          <div className="see-more text-center mt-8">
            <button className="text-lg p-3 rounded-full shadow-md hover:opacity-80 transition-colors"
              style={{ backgroundColor: theme === 'light' ? '#005ea3' : '#475569', color: '#ffffff' }}
              onClick={handleSeeMore}>
              {t('see_more')}
            </button>
          </div>
        )}
      </main>

      {/* Blog Detail Modal */}
      {selectedBlog && (
        <BlogDetailModal blog={selectedBlog} onClose={handleCloseModal} />
      )}
    </div>
  );
}
