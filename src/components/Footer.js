import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section about">
          <h3>AI Translation Studio</h3>
          <p>
            Translate your eBooks into multiple languages while keeping structure and style.  
            Export in DOCX, PDF, and EPUB formats seamlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/translator">Translator</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p>📧 support@aitranslationstudio.com</p>
          <p>🌍 www.aitranslationstudio.com</p>
          <div className="social-icons">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} AI Multi-Language Translation Studio | Built with ❤️ using LangGraph & Featherless AI
        </p>
      </div>
    </footer>
  );
};

export default Footer;
