import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyBlogs, deleteBlog, fixImageUrl } from '../utils/blogApi';
import './MyBlogs.css';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await getMyBlogs();
      setBlogs(response.data.blogs);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch your blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        setDeletingId(blogId);
        await deleteBlog(blogId);
        setBlogs(blogs.filter((blog) => blog._id !== blogId));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete blog');
      } finally {
        setDeletingId(null);
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="my-blogs-container">
      <div className="my-blogs-header">
        <h1>My Blogs</h1>
        <Link to="/create-blog" className="create-new-btn">
          + Create New Blog
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading your blogs...</p>
        </div>
      ) : blogs.length === 0 ? (
        <div className="no-blogs">
          <h2>You haven't created any blogs yet!</h2>
          <p>Start sharing your thoughts and create your first blog.</p>
          <Link to="/create-blog" className="create-btn">
            Create First Blog
          </Link>
        </div>
      ) : (
        <div className="blogs-list">
          {blogs.map((blog) => (
            <div key={blog._id} className="blog-item">
              <div className="blog-item-image">
                <img
                  src={fixImageUrl(blog.image)}
                  alt={blog.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    const placeholder =
                      'data:image/svg+xml;charset=UTF-8,' +
                      encodeURIComponent(
                        '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150">' +
                          '<rect width="200" height="150" fill="#ccc"/>' +
                          '<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#333" font-family="Arial" font-size="16">Blog</text>' +
                        '</svg>'
                      );
                    e.target.src = placeholder;
                  }}
                />
              </div>

              <div className="blog-item-content">
                <h3>{blog.title}</h3>
                <p>{blog.description.substring(0, 100)}...</p>
                <div className="blog-item-meta">
                  <span className="views">{blog.views} views</span>
                  <span className="date">{formatDate(blog.createdAt)}</span>
                </div>
              </div>

              <div className="blog-item-actions">
                <Link to={`/blog/${blog._id}`} className="view-btn">
                  View
                </Link>
                <Link to={`/edit-blog/${blog._id}`} className="edit-btn">
                  Edit
                </Link>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(blog._id)}
                  disabled={deletingId === blog._id}
                >
                  {deletingId === blog._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
