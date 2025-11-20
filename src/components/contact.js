import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { RiCustomerService2Fill, RiLightbulbFlashLine } from 'react-icons/ri';
import { IoChatbubbleEllipses, IoTime } from 'react-icons/io5';
import '../ContactUs.css';

const ContactUs = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const contactMethods = [
        {
            icon: <FaWhatsapp />,
            title: 'WhatsApp Chat',
            description: 'Instant messaging support',
            details: '+1 (555) 123-4567',
            color: '#25D366',
            delay: 0
        },
        {
            icon: <FaEnvelope />,
            title: 'Email Us',
            description: 'Detailed inquiries',
            details: 'support@translita.com',
            color: '#EA4335',
            delay: 200
        },
        {
            icon: <FaPhone />,
            title: 'Call Us',
            description: 'Phone support',
            details: '+1 (555) 987-6543',
            color: '#4285F4',
            delay: 300
        }
    ];

    const inquiryTypes = [
        { id: 'general', label: 'General Inquiry', icon: <RiCustomerService2Fill /> },
        { id: 'technical', label: 'Technical Support', icon: <RiLightbulbFlashLine /> },
        { id: 'enterprise', label: 'Enterprise', icon: <IoTime /> },
        { id: 'partnership', label: 'Partnership', icon: <FaLinkedin /> }
    ];

    return (
        <div className="contact-page">
            {/* Floating Particles Background */}
            <div className="particles-background">
                {[...Array(15)].map((_, i) => (
                    <div key={i} className="particle" style={{ animationDelay: `${i * 0.5}s` }}></div>
                ))}
            </div>

            {/* Hexagonal Grid Header */}
            <section className="contact-hero">
                <div className="hexagon-grid">
                    <div className="hexagon hex-1"></div>
                    <div className="hexagon hex-2"></div>
                    <div className="hexagon hex-3"></div>
                    <div className="hexagon hex-4"></div>
                    <div className="hexagon hex-5"></div>
                </div>

                <div className="container">
                    <div className="hero-content">
                        <div className="hero-badge">
                            <span> Get Instant Support</span>
                        </div>
                        <h1 className="hero-title">
                            Let's Start Your
                            <span className="title-accent"> Translation Journey</span>
                        </h1>
                        <p className="hero-subtitle">
                            Our team is ready to help you break language barriers and transform your content globally.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Methods Grid */}
            <section ref={addToRefs} className="contact-methods">
                <div className="container">
                    <div className="methods-grid">
                        {contactMethods.map((method, index) => (
                            <div
                                key={index}
                                className="method-card"
                                style={{
                                    '--method-color': method.color,
                                    animationDelay: `${method.delay}ms`
                                }}
                            >
                                <div className="method-icon" style={{ backgroundColor: method.color }}>
                                    {method.icon}
                                </div>
                                <h3>{method.title}</h3>
                                <p>{method.description}</p>
                                <div className="method-detail">{method.details}</div>
                                <div className="method-glow"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive Contact Form Section */}
            <section ref={addToRefs} className="contact-form-section">
                <div className="container">
                    <div className="form-container">
                        {/* Left Side - Inquiry Types */}
                        <div className="inquiry-sidebar">
                            <h3>What can we help you with?</h3>
                            <div className="inquiry-tabs">
                                {inquiryTypes.map((type) => (
                                    <button
                                        key={type.id}
                                        className={`inquiry-tab ${activeTab === type.id ? 'active' : ''}`}
                                        onClick={() => setActiveTab(type.id)}
                                    >
                                        <span className="tab-icon">{type.icon}</span>
                                        <span className="tab-label">{type.label}</span>
                                        <div className="tab-indicator"></div>
                                    </button>
                                ))}
                            </div>

                            <div className="support-info">
                                <div className="support-card">
                                    <div className="support-badge">⚡</div>
                                    <div className="support-content">
                                        <h4>Fast Response</h4>
                                        <p>Average reply time: 1 hour</p>
                                    </div>
                                </div>
                                <div className="support-card">
                                    <div className="support-badge">🌍</div>
                                    <div className="support-content">
                                        <h4>Global Support</h4>
                                        <p>Available in multiple languages</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Contact Form */}
                        <div className="form-content">
                            <div className="form-header">
                                <h2>Send us a message</h2>
                                <p>We'll get back to you within hours</p>
                            </div>

                            <form onSubmit={handleSubmit} className="dynamic-form">
                                <div className="input-group">
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="form-input"
                                        />
                                        <label className="input-label">Full Name</label>
                                        <div className="input-highlight"></div>
                                    </div>

                                    <div className="input-field">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="form-input"
                                        />
                                        <label className="input-label">Email Address</label>
                                        <div className="input-highlight"></div>
                                    </div>
                                </div>

                                <div className="input-field">
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                    />
                                    <label className="input-label">Subject</label>
                                    <div className="input-highlight"></div>
                                </div>

                                <div className="input-field">
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="form-textarea"
                                        rows="5"
                                    ></textarea>
                                    <label className="input-label">Your Message</label>
                                    <div className="input-highlight"></div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                                >
                                    <span className="button-text">
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </span>
                                    <div className="button-icon">
                                        <FaPaperPlane />
                                    </div>
                                    <div className="button-shine"></div>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social & Location Section */}
            <section ref={addToRefs} className="social-location">
                <div className="container">
                    <div className="social-grid">
                        {/* Social Media */}
                        <div className="social-section">
                            <h3>Follow Our Journey</h3>
                            <p>Stay updated with the latest in translation technology</p>

                            <div className="social-links">
                                <a href="#" className="social-link linkedin">
                                    <FaLinkedin />
                                    <span>LinkedIn</span>
                                </a>
                                <a href="#" className="social-link twitter">
                                    <FaTwitter />
                                    <span>Twitter</span>
                                </a>
                                <a href="#" className="social-link instagram">
                                    <FaInstagram />
                                    <span>Instagram</span>
                                </a>
                            </div>
                        </div>

                        {/* Office Location */}
                        <div className="location-section">
                            <h3>Visit Our Office</h3>
                            <div className="location-card">
                                <div className="location-icon">
                                    <FaMapMarkerAlt />
                                </div>
                                <div className="location-info">
                                    <h4>Translita Headquarters</h4>
                                    <p>123 Innovation Drive</p>
                                    <p>Tech Valley, TV 10101</p>
                                    <p>United States</p>
                                </div>
                                <div className="location-glow"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Quick Section */}
            <section ref={addToRefs} className="faq-quick">
                <div className="container">
                    <h3>Quick Questions?</h3>
                    <div className="faq-grid">
                        <div className="faq-item">
                            <h4>How fast is your translation service?</h4>
                            <p>Most documents are translated within 24 hours. Rush services available.</p>
                        </div>
                        <div className="faq-item">
                            <h4>Do you support all file formats?</h4>
                            <p>Yes! We support PDF, DOCX, TXT, EPUB, and many more formats.</p>
                        </div>
                        <div className="faq-item">
                            <h4>Can I request multiple languages?</h4>
                            <p>Absolutely! Translate your content into Spanish, German, and Hindi simultaneously.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;