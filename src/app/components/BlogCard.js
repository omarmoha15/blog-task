// src/app/components/BlogCard.js - BlogCard Component
"use client";

export default function BlogCard({ blog, onClick }) {
  return (
    <div 
      className="blog-card flex flex-col bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300"
      onClick={onClick}
      style={{ height: '450px', width: '100%' }} // Set fixed height and width for consistent size
    >
      {/* Blog Image */}
      <div className="relative" style={{ height: '50%' }}>
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Blog Content */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">{blog.title}</h3>
          <p className="text-sm text-gray-500 mb-2">هذا يشرح البطاقة بتفصيل أكبر</p>
          <p className="text-gray-600 mb-4">{blog.content.substring(0, 100)}...</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {blog.tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-400">{new Date(blog.dateCreated).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
