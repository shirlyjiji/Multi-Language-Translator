import React, { useEffect, useRef, useState } from "react";
import { TiWorld } from "./icons";
import { BsTranslate } from "react-icons/bs";
import { MdAnalytics } from "react-icons/md";
import { TfiLoop } from "react-icons/tfi";
import { IoIosCloudUpload } from "react-icons/io";
import { HiTranslate } from "react-icons/hi";
import { FaDownload } from "react-icons/fa6";
import { HiOutlineSparkles } from "react-icons/hi2";




import '../home.css';

const Home = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="home-container">
      {/* Geometric Hero Section */}
      <header className="geometric-hero">
        <div className="geometric-background">
          <div className="geo-shape geo-1"></div>
          <div className="geo-shape geo-2"></div>
          <div className="geo-shape geo-3"></div>
          <div className="geo-shape geo-4"></div>
        </div>

        <div className="hero-content">
          <div className="floating-text">
            <h1 className="hero-title">
              <span className="title-line">AI Multi-Language</span>
              <span className="title-line accent">Translation Studio</span>
            </h1>
          </div>

          <div className="hero-subtitle-container">
            <p className="hero-description">
              Break language barriers with AI-powered translation that preserves your
              content's structure and meaning across Spanish, German, and Hindi.
            </p>
          </div>

          <div className="hero-actions">
            <button
              className="magnetic-btn"
              onClick={() => (window.location.href = "/translator")}
            >
              <span className="btn-text">Start Translating</span>
              <div className="btn-orb"></div>
            </button>
          </div>

        </div>

        <div className="scroll-prompt">
          <div className="scroll-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      </header>

      {/* Animated Feature Cards */}
      <section ref={addToRefs} className="features-matrix">
        <div className="matrix-container">
          <div className="matrix-header">
            <h2 className="matrix-title">Next-Gen Translation</h2>
            <div className="matrix-underline"></div>
          </div>

          <div className="matrix-grid">
            <div className="matrix-card" onMouseEnter={() => setActiveStep(0)}>
              <div className="card-hologram"></div>
              <div className="card-icon"><BsTranslate /></div>
              <div className="card-content">
                <h3>Neural Translation</h3>
                <p>Advanced AI models understand context and nuance for accurate translations across Spanish, German, and Hindi</p>
              </div>
              <div className="card-glow"></div>
            </div>

            <div className="matrix-card" onMouseEnter={() => setActiveStep(1)}>
              <div className="card-hologram"></div>
              <div className="card-icon"><MdAnalytics /></div>
              <div className="card-content">
                <h3>Format Preservation</h3>
                <p>Maintain original layout, chapters, and structure across all translations</p>
              </div>
              <div className="card-glow"></div>
            </div>

            <div className="matrix-card" onMouseEnter={() => setActiveStep(2)}>
              <div className="card-hologram"></div>
              <div className="card-icon"><TfiLoop /></div>
              <div className="card-content">
                <h3>Instant Processing</h3>
                <p>Lightning-fast translation with real-time progress tracking</p>
              </div>
              <div className="card-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Process Flow */}
      <section ref={addToRefs} className="process-flow">
        <div className="flow-container">
          <h2 className="flow-title">Seamless Workflow</h2>

          <div className="flow-steps">
            <div className={`flow-step ${activeStep >= 0 ? 'active' : ''}`}>
              <div className="step-visual">
                <div className="step-orb">
                  <div className="step-icon"><IoIosCloudUpload /></div>
                </div>
                <div className="step-pulse"></div>
              </div>
              <div className="step-info">
                <h4>Upload</h4>
                <p>Drag & drop your document</p>
              </div>
            </div>

            <div className="flow-connector"></div>

            <div className={`flow-step ${activeStep >= 1 ? 'active' : ''}`}>
              <div className="step-visual">
                <div className="step-orb">
                  <div className="step-icon"><HiTranslate /></div>
                </div>
                <div className="step-pulse"></div>
              </div>
              <div className="step-info">
                <h4>Translate</h4>
                <p>AI processes your content into Spanish, German, or Hindi</p>
              </div>
            </div>

            <div className="flow-connector"></div>

            <div className={`flow-step ${activeStep >= 2 ? 'active' : ''}`}>
              <div className="step-visual">
                <div className="step-orb">
                  <div className="step-icon"><FaDownload /></div>
                </div>
                <div className="step-pulse"></div>
              </div>
              <div className="step-info">
                <h4>Download</h4>
                <p>Get translated files in multiple formats</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Language Galaxy - X Pattern Rotation */}
      <section ref={addToRefs} className="language-galaxy">
        <div className="galaxy-container">
          <h2 className="galaxy-title">Our Language Network</h2>

          <div className="x-pattern-orbit">
            <div className="central-hub">
              <div className="hub-icon"><TiWorld /></div> {/* Added this line back */}
              <div className="hub-glow"></div>
            </div>

            {/* X Pattern Layout */}
            {[
              { name: "Spanish", code: "ES", flag: "🇪🇸", position: "top-left" },
              { name: "German", code: "DE", flag: "🇩🇪", position: "top-right" },
              { name: "Hindi", code: "HI", flag: "🇮🇳", position: "bottom-center" }
            ].map((lang, index) => (
              <div
                key={lang.code}
                className={`x-orb x-${lang.position}`}
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div className="x-orb-core">
                  <span className="x-orb-flag">{lang.flag}</span>
                  <div className="x-orb-trail"></div>
                </div>
                <div className="x-orb-info">
                  <span>{lang.name}</span>
                </div>
                <div className="x-connection-line"></div>
              </div>
            ))}

            {/* X Pattern Lines */}
            <div className="x-line x-diagonal-1"></div>
            <div className="x-line x-diagonal-2"></div>
            <div className="x-line x-vertical"></div>
            <div className="x-line x-horizontal"></div>
          </div>
        </div>
      </section>

      {/* Stats Hologram - Updated language count */}
      <section ref={addToRefs} className="stats-hologram">
        <div className="hologram-container">
          <div className="hologram-grid">
            <div className="hologram-stat">
              <div className="stat-value" data-count="3">3</div>
              <div className="stat-label">Languages</div>
              <div className="stat-aura"></div>
            </div>
            <div className="hologram-stat">
              <div className="stat-value" data-count="99.9">99.9</div>
              <div className="stat-label">Accuracy</div>
              <div className="stat-aura"></div>
            </div>
            <div className="hologram-stat">
              <div className="stat-value" data-count="10000">50</div>
              <div className="stat-label">Documents</div>
              <div className="stat-aura"></div>
            </div>
            <div className="hologram-stat">
              <div className="stat-value" data-count="24">24</div>
              <div className="stat-label">Hours Saved</div>
              <div className="stat-aura"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Particle CTA */}
      <section className="particle-cta">
        <div className="particle-background">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="particle" style={{ animationDelay: `${i * 0.1}s` }}></div>
          ))}
        </div>
        <div className="cta-content">
          <div className="cta-text">
            <h2>Ready to Break Language Barriers?</h2>
            <p>Transform your content across Spanish, German, and Hindi instantly</p>
          </div>
          <div className="cta-actions">
            <button
              className="magnetic-particle-btn"
              onClick={() => (window.location.href = "/translator")}
            >

              <span className="btn-text">Launch Translator</span>
              <div className="btn-ripple"></div>
            </button>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;