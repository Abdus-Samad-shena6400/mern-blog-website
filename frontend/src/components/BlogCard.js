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
            e.target.src = 'https://via.placeholder.com/400x200?text=Blog+Image';
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
