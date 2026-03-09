import React from 'react';
import { Link } from 'react-router-dom';
import './BlogCard.css';

const BlogCard = ({ blog }) => {
  const truncateDescription = (text, maxLength = 100) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Link to={`/blog/${blog._id}`} className="blog-card">
      <div className="blog-image-container">
        <img
          src={blog.image}
          alt={blog.title}
          className="blog-image"
          onError={(e) => {
            // fallback to an inline SVG image (no network request)
            e.target.onerror = null; // prevent infinite loop
            const placeholder =
              'data:image/svg+xml;charset=UTF-8,' +
              encodeURIComponent(
                '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">' +
                  '<rect width="400" height="200" fill="#ccc"/>' +
                  '<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#333" font-family="Arial" font-size="20">Blog Image</text>' +
                '</svg>'
              );
            e.target.src = placeholder;
          }}
        />
        <div className="blog-views">{blog.views} views</div>
      </div>

      <div className="blog-content">
        <h3 className="blog-title">{blog.title}</h3>
        <p className="blog-description">
          {truncateDescription(blog.description)}
        </p>

        <div className="blog-meta">
          <div className="blog-author">
            <span className="author-name">by {blog.authorName}</span>
          </div>
          <span className="blog-date">{formatDate(blog.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
