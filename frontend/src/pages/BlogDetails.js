import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBlogById, deleteBlog } from '../utils/blogApi';
import { useAuth } from '../context/AuthContext';
import './BlogDetails.css';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await getBlogById(id);
      setBlog(response.data.blog);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load blog');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        setDeleting(true);
        await deleteBlog(id);
        navigate('/my-blogs');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete blog');
        setDeleting(false);
      }
    }
  };

  const isAuthor = isAuthenticated && user && blog && user._id === blog.author._id;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading blog...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="error-container">
        <h2>Error Loading Blog</h2>
        <p>{error || 'Blog not found'}</p>
        <Link to="/" className="back-link">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="blog-details-container">
      <div className="blog-details-header">
        <Link to="/" className="back-link">← Back to Blogs</Link>
        
        {isAuthor && (
          <div className="blog-actions">
            <Link to={`/edit-blog/${id}`} className="edit-btn">
              Edit
            </Link>
            <button
              className="delete-btn"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        )}
      </div>

      <article className="blog-details">
        <img
          src={blog.image}
          alt={blog.title}
          className="blog-hero-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/800x400?text=Blog+Image';
          }}
        />

        <div className="blog-details-content">
          <h1 className="blog-details-title">{blog.title}</h1>

          <div className="blog-details-meta">
            <div className="author-info">
              <span className="author-name">{blog.author.name}</span>
              <span className="author-email">{blog.author.email}</span>
            </div>
            <div className="meta-info">
              <span className="publish-date">{formatDate(blog.createdAt)}</span>
              <span className="views-count">{blog.views} views</span>
            </div>
          </div>

          <div className="blog-body">
            {blog.description}
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetails;
