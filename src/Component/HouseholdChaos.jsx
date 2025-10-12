import React, { useState, useEffect } from 'react';
import Footer from './Footer.jsx'; // Import Footer
import './HouseholdChaos.css';

const HouseholdChaos = ({ 
  onClose, 
  onOpenWasteManagement, 
  onOpenQueue, 
  onOpenFamilyApp, 
  onOpenComingSoon,
  onOpenTeamPage
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'services', 'contact'];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };

    document.documentElement.style.scrollBehavior = 'smooth';
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const ServiceCard = ({ 
    title, 
    description, 
    onClick, 
    status,
    icon, 
    color = 'primary',
    features = []
  }) => (
    <div className={`service-card service-card--${color} ${status === 'Available' ? 'service-card--featured' : 'service-card--upcoming'}`}>
      <div className="service-card__header">
        <div className="service-card__icon">
          <span className="service-icon">{icon}</span>
        </div>
        {/* Use the new status badge */}
        <div className={`status-badge status-badge--${status.toLowerCase()}`}>
          {status === 'Available' ? 'Available' : 'Upcoming'}
        </div>
      </div>
      
      <div className="service-card__content">
        <h3 className="service-card__title">{title}</h3>
        <p className="service-card__description">{description}</p>
        
        <div className="service-card__features">
            {features.map((tag) => <div key={tag} className="feature-tag">{tag}</div>)}
        </div>
        
        {onClick && (
          <button 
            onClick={onClick} 
            className={`service-card__button service-card__button--${color} ${status !== 'Available' ? 'service-card__button--disabled' : ''}`}
            disabled={status !== 'Available'}
          >
            <span>{status === "Available" ? "Get Started" : "Coming Soon"}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17l9.2-9.2M17 17V7H7"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );

  const serviceCards = [
    {
      title: "Waste Management",
      description: "Revolutionary AI-powered waste management with smart sorting, recycling optimization, carbon tracking, and community impact metrics.",
      icon: "♻️",
      color: "green",
      status: "Available",
      onClick: onOpenWasteManagement,
      features: ["AI-Powered", "Eco-Tracking", "Smart Sorting"]
    },
    {
      title: "Queue Management",
      description: "Optimize your household chores and tasks with intelligent scheduling, priority handling, and real-time updates.",
      icon: "⏳",
      color: "blue",
      status: "Available",
      onClick: onOpenQueue,
      features: ["Smart Queue", "Real-time", "Optimization"]
    },
    {
      title: "Family Chaos Manager",
      description: "Transform chaos into calm with a central dashboard for shared chores, room clutter monitoring, and conflict resolution.",
      icon: "🏠",
      color: "purple",
      status: "Available",
      onClick: onOpenFamilyApp,
      features: ["Family Tasks", "Conflict Solver", "Calendar Sync"]
    },
    {
      title: "Water Conservation AI",
      description: "Intelligent monitoring and leak detection system to track, analyze, and reduce your daily household water usage.",
      icon: "💧",
      color: "cyan", // New color for visual distinction
      status: "Upcoming",
      onClick: onOpenComingSoon,
      features: ["Leak Detection", "Smart Metering", "Usage Analysis"]
    },
    {
      title: "Solar Panel Installation",
      description: "Harness renewable energy with our premium solar solutions. Professional installation, smart monitoring, and guaranteed savings.",
      icon: "☀️",
      color: "yellow",
      status: "Upcoming",
      onClick: onOpenComingSoon,
      features: ["Expert Install", "Cost Savings", "Monitoring"]
    },
    {
      title: "Smart Home Integration",
      description: "Connect all your eco-systems with intelligent automation, energy optimization, and seamless user experiences.",
      icon: "🏡",
      color: "orange",
      status: "Upcoming",
      onClick: onOpenComingSoon,
      features: ["IoT Connected", "Automation", "Energy Efficient"]
    }
  ];

  const NavigationDot = ({ targetId, isActive }) => (
    <button
      className={`nav-dot ${isActive ? 'nav-dot--active' : ''}`}
      onClick={() => scrollToSection(targetId)}
      aria-label={`Go to ${targetId} section`}
    />
  );

  return (
    <div className={`household-chaos ${isVisible ? 'household-chaos--visible' : ''}`}>
      {/* Removed cross icon (close button) */}

      <nav className="floating-nav">
        <NavigationDot targetId="hero" isActive={activeSection === 'hero'} />
        <NavigationDot targetId="about" isActive={activeSection === 'about'} />
        <NavigationDot targetId="services" isActive={activeSection === 'services'} />
        <NavigationDot targetId="contact" isActive={activeSection === 'contact'} />
      </nav>

      <div className="household-chaos__container">
        <header className="household-chaos__header">
          <div className="header__background">
            <div className="header__gradient"></div>
            <div className="header__particles">
              {[...Array(20)].map((_, i) => (
                <div key={i} className={`particle particle--${i % 4 + 1}`}></div>
              ))}
            </div>
          </div>
          
          <nav className="header__nav">
            <div className="nav__logo">
              <div className="nav__logo-container">
                <span className="nav__logo-icon">🏡</span>
                <div className="nav__logo-text">
                  <span className="logo-main">Home</span>
                  <span className="logo-sub">Harmony</span>
                </div>
              </div>
            </div>
            
            <ul className="nav__links">
              {[
                { href: "hero", label: "Home" },
                { href: "about", label: "About" },
                { href: "services", label: "Services" },
                { href: "contact", label: "Contact" }
              ].map(link => (
                <li key={link.href}>
                  <a 
                    href={`#${link.href}`} 
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className={`nav__link ${activeSection === link.href ? 'nav__link--active' : ''}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button 
                  onClick={onOpenTeamPage} 
                  className="nav__link nav__link--team"
                >
                  👥 Team
                </button>
              </li>
            </ul>
          </nav>
        </header>

        <section className="household-chaos__hero" id="hero">
          <div className="hero__background">
            <div className="hero__shape hero__shape--1"></div>
            <div className="hero__shape hero__shape--2"></div>
            <div className="hero__shape hero__shape--3"></div>
          </div>
          
          <div className="hero__content">
            <div className="hero__badge">
              <span className="badge__icon">✨</span>
              <span>Sustainable Living Solutions</span>
            </div>
            
            <h1 className="hero__title">
              <span className="title__main">Transform Your Home Into</span>
              <span className="title__highlight">Eco Paradise</span>
            </h1>
            
            <p className="hero__description">
              Experience the future of sustainable living with our comprehensive ecosystem of 
              eco-friendly solutions. From smart waste management to renewable energy systems.
            </p>
            
            <div className="hero__stats">
              <div className="stat">
                <div className="stat__value">10K+</div>
                <div className="stat__label">Happy Homes</div>
              </div>
              <div className="stat">
                <div className="stat__value">50%</div>
                <div className="stat__label">Energy Saved</div>
              </div>
              <div className="stat">
                <div className="stat__value">100%</div>
                <div className="stat__label">Eco-Friendly</div>
              </div>
            </div>
            
            <div className="hero__actions">
              <button 
                onClick={() => scrollToSection('services')} 
                className="hero__cta hero__cta--primary"
              >
                Explore Services
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7,7 17,7 17,17"></polyline>
                </svg>
              </button>
              
              <button className="hero__cta hero__cta--secondary" onClick={onOpenComingSoon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5,3 19,12 5,21 5,3"></polygon>
                </svg>
                Watch Demo
              </button>
            </div>
          </div>
          
          <div className="hero__visual">
            <div className="visual__main">
              <div className="visual__globe">
                <span className="visual__icon">🌍</span>
                <div className="visual__orbit visual__orbit--1">
                  <div className="orbit-item">🏠</div>
                </div>
                <div className="visual__orbit visual__orbit--2">
                  <div className="orbit-item">♻️</div>
                </div>
                <div className="visual__orbit visual__orbit--3">
                  <div className="orbit-item">⚡</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="household-chaos__about" id="about">
          <div className="about__container">
            <div className="section__header">
              <div className="section__badge">About Us</div>
              <h2 className="section__title">Building Sustainable Futures</h2>
              <p className="section__subtitle">One home at a time, one solution at a time</p>
            </div>
            
            <div className="about__content">
              <div className="about__text">
                <div className="about__intro">
                  <p className="about__description">
                    At Home Harmony, we're pioneering the next generation of sustainable living solutions. 
                    Our mission extends beyond simple eco-friendliness – we're creating intelligent ecosystems 
                    that learn, adapt, and optimize your environmental impact.
                  </p>
                </div>
                
                <div className="about__values">
                  <h3 className="values__title">Our Core Principles</h3>
                  <div className="values__grid">
                    {[
                      {
                        icon: "🌱",
                        title: "Sustainability First",
                        description: "Every solution prioritizes long-term environmental impact"
                      },
                      {
                        icon: "🧠",
                        title: "Smart Innovation",
                        description: "AI-powered systems that learn and improve continuously"
                      },
                      {
                        icon: "🤝",
                        title: "Community Impact",
                        description: "Building networks of environmentally conscious households"
                      },
                      {
                        icon: "📈",
                        title: "Measurable Results",
                        description: "Transparent tracking of your environmental contributions"
                      }
                    ].map((value, index) => (
                      <div key={index} className="value__item">
                        <div className="value__icon">{value.icon}</div>
                        <div className="value__content">
                          <h4 className="value__title">{value.title}</h4>
                          <p className="value__description">{value.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="about__visual">
                <div className="about__image">
                  <div className="image__container">
                    <div className="image__backdrop"></div>
                    <span className="image__icon">🌿</span>
                    <div className="image__text">Sustainable Future</div>
                  </div>
                </div>
                
                <div className="about__metrics">
                  <div className="metric">
                    <div className="metric__value">95%</div>
                    <div className="metric__label">Customer Satisfaction</div>
                  </div>
                  <div className="metric">
                    <div className="metric__value">2.5M</div>
                    <div className="metric__label">Tons CO₂ Saved</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="household-chaos__services" id="services">
          <div className="services__container">
            <div className="section__header">
              <div className="section__badge">Our Solutions</div>
              <h2 className="section__title">Comprehensive Eco-Solutions</h2>
              <p className="section__subtitle">
                Integrated systems for maximum environmental impact and household efficiency
              </p>
            </div>
            
            <div className="services__grid">
              {serviceCards.map((card, index) => (
                <ServiceCard key={index} {...card} />
              ))}
            </div>
          </div>
        </section>

        <section className="household-chaos__contact" id="contact">
          <div className="contact__container">
            <div className="section__header">
              <div className="section__badge">Get In Touch</div>
              <h2 className="section__title">Ready to Transform Your Home?</h2>
              <p className="section__subtitle">Contact us for a free consultation and personalized eco-plan</p>
            </div>
            
            <div className="contact__content">
              <div className="contact__info">
                <div className="contact__item">
                  <div className="contact__icon">📧</div>
                  <div className="contact__details">
                    <h4>Email Us</h4>
                    <p>hello@homeharmony.eco</p>
                  </div>
                </div>
                <div className="contact__item">
                  <div className="contact__icon">📞</div>
                  <div className="contact__details">
                    <h4>Call Us</h4>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="contact__item">
                  <div className="contact__icon">🌍</div>
                  <div className="contact__details">
                    <h4>Visit Us</h4>
                    <p>Over The Internet</p>
                  </div>
                </div>
                <div 
                  className="contact__item contact__item--team" 
                  onClick={onOpenTeamPage}
                >
                  <div className="contact__icon contact__icon--team">👥</div>
                  <div className="contact__details">
                    <h4>Meet The Team</h4>
                    <p>Discover the innovators behind HomeHarmony</p>
                  </div>
                  <div className="contact__arrow">→</div>
                </div>
              </div>
              
              <div className="contact__form">
                <div className="form__group">
                  <label htmlFor="name" className="form__label">Name</label>
                  <input type="text" id="name" className="form__input" placeholder="Your Name" />
                </div>
                <div className="form__group">
                  <label htmlFor="email" className="form__label">Email</label>
                  <input type="email" id="email" className="form__input" placeholder="Your Email" />
                </div>
                <div className="form__group">
                  <label htmlFor="service" className="form__label">Service Interest</label>
                  <select id="service" className="form__select">
                    <option value="">Select a service</option>
                    <option value="waste">Waste Management</option>
                    <option value="queue">Queue Management</option>
                    <option value="design">Home Design</option>
                    <option value="solar">Solar Installation</option>
                    <option value="integration">Smart Home Integration</option>
                    <option value="water">Water Conservation AI</option>
                  </select>
                </div>
                <div className="form__group">
                  <label htmlFor="message" className="form__label">Message</label>
                  <textarea id="message" className="form__textarea" rows="4" placeholder="Tell us about your eco-goals..."></textarea>
                </div>
                <button type="submit" className="form__submit">
                  Send Message
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Added Footer component here */}
        <Footer /> 

      </div>
    </div>
  );
};

export default HouseholdChaos;