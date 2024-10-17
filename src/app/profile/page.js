"use client";

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import BlogCard from '@/app/components/BlogCard';
import BlogDetailModal from '@/app/components/BlogDetailModal';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';

// Icons for theme, language, edit, delete, and back
import { FiSun, FiMoon, FiX, FiArrowLeft } from 'react-icons/fi';
import { FaFlagUsa, FaFlag, FaEdit, FaTrashAlt } from 'react-icons/fa';

export default function ProfilePage() {
  const { t, i18n } = useTranslation('common');
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
  const [theme, setTheme] = useState('light');
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin');
    } else {
      const fetchUserBlogs = async () => {
        try {
          const response = await fetch(`/api/blogs?authorId=${session.user.id}`);
          if (response.ok) {
            const userBlogs = await response.json();
            setBlogs(userBlogs);
          } else {
            console.error('Failed to fetch user blogs:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching user blogs:', error);
        }
      };
      fetchUserBlogs();
    }
  }, [session, router]);

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

  const handleCloseModal = () => {
    setSelectedBlog(null);
  };

  const handleEditClick = (blog) => {
    setIsEditing(true);
    setEditBlog(blog);
  };

  const handleDeleteClick = async (blogId) => {
    if (confirm(t('confirm_delete'))) {
      try {
        const response = await fetch(`/api/blogs?id=${blogId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setBlogs(blogs.filter((blog) => blog.id !== blogId));
        } else {
          console.error('Failed to delete blog:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  const handleSaveEdit = async () => {
    const formData = new FormData();
    formData.append('title', editBlog.title);
    formData.append('content', editBlog.content);
    formData.append('tags', editBlog.tags);
    if (editBlog.image instanceof File) {
      formData.append('image', editBlog.image);
    }

    try {
      const response = await fetch(`/api/blogs?id=${editBlog.id}`, {
        method: 'PUT',
        body: formData,
      });
      if (response.ok) {
        const updatedBlog = await response.json();
        setBlogs(blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)));
        setIsEditing(false);
        setEditBlog(null);
      } else {
        console.error('Failed to update blog:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  if (!session) {
    return <div>{t('loading')}</div>;
  }

  return (
    <div
      className={`profile-page-container min-h-screen ${i18n.language === 'ar' ? 'rtl' : ''} ${theme} flex flex-col`}
      style={{
        backgroundColor: theme === 'light' ? '#f0f4f8' : '#1a1a1a', // Page background color based on theme
        color: theme === 'light' ? '#000000' : '#e0e0e0',
      }}
    >
      {/* Header */}
      <header
        className="flex justify-between items-center p-6 rounded-full shadow-lg w-11/12 mx-auto mt-8"
        style={{
          backgroundColor: theme === 'light' ? '#007acc' : '#334155', // Adjust header color for better contrast
          color: '#ffffff',
        }}
      >
        <div className="flex items-center">
          <button
            onClick={() => router.back()}
            className="p-3 rounded-full shadow-md hover:opacity-80 transition-colors flex items-center justify-center mr-4"
            style={{ backgroundColor: theme === 'light' ? '#005ea3' : '#475569', color: '#ffffff' }}
          >
            <FiArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-semibold tracking-wide">{t('my_blogs')}</h1>
        </div>
        <div className="flex space-x-4 items-center">
          <button
            onClick={toggleLanguage}
            className="p-3 rounded-full shadow-md hover:opacity-80 transition-colors flex items-center justify-center"
            style={{ backgroundColor: theme === 'light' ? '#005ea3' : '#475569', color: '#ffffff' }}
          >
            {i18n.language === 'en' ? <FaFlag size={20} /> : <FaFlagUsa size={20} />}
          </button>
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full shadow-md hover:opacity-80 transition-colors flex items-center justify-center"
            style={{ backgroundColor: theme === 'light' ? '#005ea3' : '#475569', color: '#ffffff' }}
          >
            {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>
          <Link href="/blog-control/create">
            <button
              className="p-3 rounded-full shadow-md hover:opacity-80 transition-colors"
              style={{ backgroundColor: theme === 'light' ? '#005ea3' : '#475569', color: '#ffffff' }}
            >
              {t('create_blog')}
            </button>
          </Link>
          <button
            onClick={() => signOut()}
            className="p-3 rounded-full shadow-md hover:opacity-80 transition-colors"
            style={{ backgroundColor: theme === 'light' ? '#005ea3' : '#475569', color: '#ffffff' }}
          >
            {t('logout')}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content p-8 w-full flex flex-col items-center flex-grow">
        {isEditing ? (
          <div
            className="edit-blog-form max-w-2xl w-full p-8 rounded-lg shadow-xl mt-6 bg-gradient-to-r from-purple-200 via-blue-200 to-blue-100"
            style={{
              color: theme === 'light' ? '#000000' : '#ffffff',
            }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">{t('edit_blog')}</h2>
            <div className="mb-4">
              <label htmlFor="title" className="block font-medium mb-2">{t('blog_title')}</label>
              <input
                id="title"
                type="text"
                value={editBlog.title}
                onChange={(e) => setEditBlog({ ...editBlog, title: e.target.value })}
                className="w-full p-3 rounded-lg mb-4 border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all"
                style={{
                  backgroundColor: theme === 'light' ? '#ffffff' : '#444444',
                  color: theme === 'light' ? '#000000' : '#ffffff',
                }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block font-medium mb-2">{t('blog_content')}</label>
              <textarea
                id="content"
                value={editBlog.content}
                onChange={(e) => setEditBlog({ ...editBlog, content: e.target.value })}
                className="w-full p-3 rounded-lg mb-4 border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all"
                rows="5"
                style={{
                  backgroundColor: theme === 'light' ? '#ffffff' : '#444444',
                  color: theme === 'light' ? '#000000' : '#ffffff',
                }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block font-medium mb-2">{t('edit_image')}</label>
              <input
                id="image"
                type="file"
                onChange={(e) => setEditBlog({ ...editBlog, image: e.target.files[0] })}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all"
                style={{
                  backgroundColor: theme === 'light' ? '#ffffff' : '#444444',
                  color: theme === 'light' ? '#000000' : '#ffffff',
                }}
              />
            </div>
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={handleSaveEdit}
                className="text-lg px-6 py-3 rounded-full shadow-md hover:opacity-90 transition-all bg-green-500 text-white font-semibold flex items-center"
              >
                <FaEdit size={20} className="mr-2" />
                {t('save')}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="text-lg px-6 py-3 rounded-full shadow-md hover:opacity-90 transition-all bg-gray-500 text-white font-semibold flex items-center"
              >
                <FiX size={20} className="mr-2" />
                {t('cancel')}
              </button>
            </div>
          </div>
        ) : (
          <div className="blogs-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 w-11/12">
            {blogs.map((blog) => (
              <div key={blog.id} className="relative transform hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:shadow-2xl">
                <BlogCard blog={blog} onClick={() => handleBlogClick(blog)} />
                <div
                  className={`absolute top-2 ${i18n.language === 'ar' ? 'left-2 flex-row-reverse' : 'right-2'} flex space-x-2 space-x-reverse`}
                >
                  <button
                    onClick={() => handleEditClick(blog)}
                    className="bg-yellow-500 text-white text-lg p-2 rounded-full shadow-md hover:bg-yellow-600 transition-colors flex items-center"
                    style={{ margin: i18n.language === 'ar' ? '0 0 0 8px' : '0 8px 0 0' }}
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(blog.id)}
                    className="bg-red-500 text-white text-lg p-2 rounded-full shadow-md hover:bg-red-600 transition-colors flex items-center"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Blog Detail Modal */}
      {selectedBlog && <BlogDetailModal blog={selectedBlog} onClose={handleCloseModal} />}
    </div>
  );
}
