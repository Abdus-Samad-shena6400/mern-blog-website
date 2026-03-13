import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-profile">
          <div className="profile-image-container">
            <img
              src="/images/profile.jpeg"
              alt="Abdus Samad"
              className="profile-image"
            />
          </div>
          <div className="profile-info">
            <h3>Created by Abdus Samad</h3>
            <p>Full Stack Developer & MERN Stack Enthusiast</p>
            <p>Passionate about creating beautiful and functional web applications</p>
            <div className="footer-links">
              <a href="https://github.com/abdus-samad" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="https://linkedin.com/in/abdus-samad" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href="mailto:abdus.samad@example.com">
                Email
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 BlogHub. All rights reserved.</p>
          <p>Made with ❤️ using MERN Stack</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;