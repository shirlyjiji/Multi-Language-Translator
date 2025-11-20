import React, { useEffect, useRef } from 'react';
import { SiNeutralinojs } from "react-icons/si";
import { TbAnalyze } from "react-icons/tb";
import { BsLightningCharge } from "react-icons/bs";
import '../About.css';


const AboutUs = () => {
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
        <div className="about-us-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="row align-items-center min-vh-100">
                        <div className="col-lg-6">
                            <div className="hero-content">
                                <h1 className="hero-title">
                                    Breaking Language
                                    <span className="highlight"> Barriers</span>
                                    <div className="title-underline "></div>
                                </h1>
                                <p className="hero-subtitle">
                                    At Translita, we believe communication should have no boundaries.
                                    Our AI-powered translation studio connects cultures and enables
                                    seamless global conversations.
                                </p>
                                
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="hero-visual">
                                <div className="language-orbits">
                                    <div className="central-orb">
                                        <span>🌍</span>
                                    </div>
                                    <div className="orbit orbit-1">
                                        <div className="language-node">EN</div>
                                    </div>
                                    <div className="orbit orbit-2">
                                        <div className="language-node">ES</div>
                                    </div>
                                    <div className="orbit orbit-4">
                                        <div className="language-node">DE</div>
                                    </div>
                                    <div className="orbit orbit-5">
                                        <div className="language-node">IN</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section ref={addToRefs} className="mission-section">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center mb-5">
                            <h2 className="section-title">Our Mission</h2>
                            <div className="title-underline-center"></div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="mission-cards">
                                <div className="mission-card card-1">
                                    <div className="card-icon">🚀</div>
                                    <h4>Innovation First</h4>
                                    <p>Pioneering the next generation of AI translation technology</p>
                                </div>
                                <div className="mission-card card-2">
                                    <div className="card-icon">🌐</div>
                                    <h4>Global Reach</h4>
                                    <p>Supporting 100+ with cultural sensitivity</p>
                                </div>
                                <div className="mission-card card-3">
                                    <div className="card-icon">💡</div>
                                    <h4>Smart Solutions</h4>
                                    <p>Context-aware translations that understand nuance</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="mission-content">
                                <h3>Redefining Translation Excellence</h3>
                                <p>
                                    Translita combines cutting-edge artificial intelligence with
                                    human linguistic expertise to deliver translations that are
                                    not just accurate, but culturally relevant and contextually
                                    perfect.
                                </p>
                                <div className="stats-container">
                                    <div className="stat-item">
                                        <div className="stat-number" data-count="150">3</div>
                                        <div className="stat-label">Languages</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-number" data-count="50M">50</div>
                                        <div className="stat-label">Translations</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-number" data-count="99">99</div>
                                        <div className="stat-label">% Accuracy</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technology Section */}
            <section ref={addToRefs} className="technology-section">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center mb-5">
                            <h2 className="section-title-ad">Advanced Technology</h2>
                            <div className="title-underline-center"></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="tech-card">
                                <div className="tech-icon"><SiNeutralinojs /></div>
                                <h5>Neural Networks</h5>
                                <p>Deep learning models trained on millions of multilingual documents</p>
                                <div className="tech-wave"></div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="tech-card">
                                <div className="tech-icon"><TbAnalyze /></div>
                                <h5>Context Analysis</h5>
                                <p>Advanced context understanding for accurate meaning preservation</p>
                                <div className="tech-wave"></div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="tech-card">
                                <div className="tech-icon"><BsLightningCharge /></div>
                                <h5>Real-time Processing</h5>
                                <p>Lightning-fast translations without compromising quality</p>
                                <div className="tech-wave"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section ref={addToRefs} className="team-section">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center mb-5">
                            <h2 className="section-title-vi">Our Vision</h2>
                            <div className="title-underline-center"></div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <div className="vision-content">
                                <div className="vision-glow"></div>
                                <h3 className='vision-glow-h3'>A World Without Language Barriers</h3>
                                <p className="lead">
                                    We envision a future where people can communicate freely across
                                    languages, where businesses can expand globally without linguistic
                                    constraints, and where cultural exchange flourishes through
                                    perfect understanding.
                                </p>
                                <div className="cta-section">
                                    <button className="btn btn-primary btn-glow" 
                                    onClick={() => (window.location.href = "/translator")} >
                                        Join Our Journey
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;