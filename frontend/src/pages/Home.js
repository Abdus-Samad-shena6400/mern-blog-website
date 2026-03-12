import React, { useState, useEffect, useCallback } from 'react';
import BlogCard from '../components/BlogCard';
import { getAllBlogs } from '../utils/blogApi';
import './Home.css';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllBlogs({ search, page, limit: 9 });
      setBlogs(response?.data?.blogs || []);
      setTotalPages(response?.data?.pagination?.pages || 1);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      const errorMessage = err?.response?.data?.message || 
                          err?.message || 
                          'Failed to fetch blogs. Is the backend server running?';
      setError(errorMessage);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <div className="home">
      <div className="hero-section">
        <h1>Welcome to BlogHub</h1>
        <p>Discover amazing stories and insights from our community</p>
      </div>

      <div className="search-section">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading blogs...</p>
        </div>
      ) : blogs.length === 0 ? (
        <div className="no-blogs">
          <p>No blogs found. Start creating your own!</p>
        </div>
      ) : (
        <>
          <div className="blogs-grid">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              <span className="page-info">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
