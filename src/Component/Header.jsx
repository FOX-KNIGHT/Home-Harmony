import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types'; // Recommended for type checking
import './Header.css'; // Renamed CSS file for clarity

// IMPORTANT: Assuming you have placeholder images or paths
import Siddhantpic from './Photo/Sidd.png';
// Placeholder images for non-leaders
const PLACEHOLDER_ROHIT = 'placeholder_rohit.jpg';

// --- Data Separation: Define static data outside the component ---

const TEAM_MEMBERS = [
  {
    name: "Siddhant Jena",
    role: "Team Lead (Frontend & Backend)",
    image: Siddhantpic,
    skills: ["React/Vite", "Node.js/Express", "PostgreSQL", "System Design"],
    description: "The core visionary, driving both front-end aesthetics and robust back-end architecture for a seamless, intelligent platform.",
    isLeader: true
  },
  {
    name: "Rohit Sharma",
    role: "Lead Development Strategist",
    image: PLACEHOLDER_ROHIT,
    skills: ["Project Management", "Agile", "DevOps", "Cloud Services"],
    description: "Focuses on strategic direction, ensuring high-quality, scalable product delivery and development process optimization.",
    isLeader: false
  },
];

const CORE_VALUES = [
  { icon: '🌱', title: 'Sustainability', text: 'Prioritizing long-term environmental health in every technology decision.' },
  { icon: '💡', title: 'Innovation', text: 'Continuously seeking smart, AI-driven solutions to simplify complex household tasks.' },
  { icon: '🤝', title: 'Integrity', text: 'Operating with transparency, respect, and commitment to measurable results.' },
  { icon: '✨', title: 'Harmony', text: 'Striving to bring balance, peace, and efficiency back into the modern home.' },
];

const NAV_LINKS = [
  { id: "hero", label: "Overview" },
  { id: "team", label: "Members" },
  { id: "mission", label: "Mission" },
  { id: "values", label: "Values" } // Changed 'Value' to plural 'Values' for consistency
];

// --- Component Implementation ---

const TeamPage = ({ openHouseholdChaos }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Page Load Animation (100ms delay for initial fade-in)
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Use useCallback for scroll function to maintain reference stability
  const scrollToSection = useCallback((id) => {
    const container = document.querySelector('.team-page-container');
    const element = container?.querySelector(`#${id}`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // The IntersectionObserver will handle setting the active section
    }
  }, []);

  // Intersection Observer for Scroll Spy Navigation
  useEffect(() => {
    const container = document.querySelector('.team-page-container');
    if (!container) return;

    // Use a map to track active sections to handle multiple intersections correctly
    const sectionStates = {};
    const observer = new IntersectionObserver((entries) => {
      let currentActiveId = activeSection;

      entries.forEach(entry => {
        sectionStates[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
      });

      // Find the section with the highest intersection ratio
      let maxRatio = -1;
      let newActiveId = activeSection;

      // Prioritize the section currently at the top of the viewport
      NAV_LINKS.forEach(link => {
        const ratio = sectionStates[link.id] || 0;
        if (ratio > maxRatio) {
          maxRatio = ratio;
          newActiveId = link.id;
        }
      });
      
      // Update state only if it changes
      if (newActiveId !== currentActiveId) {
        setActiveSection(newActiveId);
      }

    }, { 
      root: container,
      // More professional/robust configuration: trigger when section enters/leaves top 20%
      rootMargin: '-20% 0px -70% 0px', 
      threshold: [0, 0.2, 0.5, 0.8, 1] // Multiple thresholds for better detection
    });

    NAV_LINKS.forEach(link => {
      const element = container.querySelector(`#${link.id}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [activeSection]); // Depend on activeSection to use its value in observer update logic

  // Component Structure (Semantic HTML & Simplified JSX)
  return (
    // The main container for the scrollable content
    <div className={`team-page ${isVisible ? 'team-page--visible' : ''} team-page-container`} role="document">
      
      {/* Navigation */}
      <nav className="team-nav" role="navigation" aria-label="Team Page Navigation">
        <div className="nav__container">
          <div className="nav__logo">
            <span className="logo__icon" aria-hidden="true">👥</span>
            <span className="logo__text">Team Harmony</span>
          </div>
          
          <ul className="nav__links" role="menubar">
            <li role="none">
              <button 
                onClick={openHouseholdChaos}
                className="nav__link nav__back"
                role="menuitem"
                aria-label="Back to Services"
              >
                ← Back to Services
              </button>
            </li>
            {NAV_LINKS.map(link => (
              <li key={link.id} role="none">
                <button 
                  onClick={() => scrollToSection(link.id)}
                  className={`nav__link ${activeSection === link.id ? 'nav__link--active' : ''}`}
                  role="menuitem"
                  aria-current={activeSection === link.id ? 'page' : undefined}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="team-hero" id="hero" aria-labelledby="hero-title">
          <div className="hero__background">
            <div className="hero__gradient" aria-hidden="true"></div>
            <div className="hero__shape" aria-hidden="true"></div> 
            <div className="hero__shape" aria-hidden="true"></div>
            <div className="hero__shape" aria-hidden="true"></div>
          </div>
          
          <div className="hero__content">
            <div className="hero__badge">
              <span className="badge__icon" aria-hidden="true">🚀</span>
              <span>HomeHarmony Innovators</span>
            </div>
            
            <h1 className="hero__title" id="hero-title">
              <span className="title__line">The Architects of</span>
              <span className="title__highlight">HomeHarmony</span>
            </h1>
            
            <p className="hero__description">
              A collaborative team united by a singular mission: to revolutionize sustainable living 
              through intelligent technology. **Siddhant Jena (TL)** and **Rohit Sharma** lead our path to eco-conscious innovation.
            </p>
            
            <button onClick={() => scrollToSection('team')} className="hero__cta">
              <span>Meet Our Team</span>
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
            </button>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-members" id="team" aria-labelledby="team-title">
          <div className="section__header">
            <div className="section__badge">Core Team</div>
            <h2 className="section__title" id="team-title">The Driven Duo</h2>
            <p className="section__subtitle">
              Siddhant and Rohit are the primary drivers of this project, combining technical vision with strategic development.
            </p>
          </div>
          
          <div className="members__grid">
            {TEAM_MEMBERS.map((member, index) => (
              <article 
                key={index} 
                className={`member-card ${member.isLeader ? 'member-card--leader' : ''}`}
                aria-label={`Team member: ${member.name}, ${member.role}`}
              >
                {member.isLeader && (
                  <div className="member-card__tag">Team Lead</div>
                )}
                <div className="member-card__image-wrapper">
                  <img 
                    src={member.image} 
                    alt={`Portrait of ${member.name}`} 
                    className="member-card__image"
                    loading="lazy"
                  />
                </div>
                
                <div className="member-card__content">
                  <h3 className="member-card__name">{member.name}</h3>
                  <p className="member-card__role">{member.role}</p>
                  <p className="member-card__description">{member.description}</p>
                  
                  <div className="member-card__skills" aria-label="Skills">
                    {member.skills.map((skill, idx) => (
                      <span key={idx} className="skill-badge">{skill}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="team-mission" id="mission" aria-labelledby="mission-title">
          <div className="section__header">
            <div className="section__badge">Our Purpose</div>
            <h2 className="section__title" id="mission-title">Our Guiding Mission</h2>
            <p className="section__subtitle">
              A clear vision for a sustainable and harmonized future for every home.
            </p>
          </div>
          
          <div className="mission__content">
            <div className="mission__text-block">
              <h3 className="text-block__title">Vision Statement</h3>
              <p className="text-block__body">
                To be the leading platform for smart, eco-conscious home management, making a measurable positive impact on the planet, one well-organized household at a time.
              </p>
            </div>
            <div className="mission__text-block">
              <h3 className="text-block__title">Core Belief</h3>
              <p className="text-block__body">
                We believe that the next generation of home technology must be seamlessly integrated with sustainability, transforming chores into contributions and chaos into calm.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="team-values" id="values" aria-labelledby="values-title">
          <div className="section__header">
            <div className="section__badge">Core Values</div>
            <h2 className="section__title" id="values-title">The Principles We Stand By</h2>
            <p className="section__subtitle">
              The fundamental beliefs that guide our product development and team culture.
            </p>
          </div>
          
          <div className="values__grid">
            {CORE_VALUES.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-card__icon" aria-hidden="true">{value.icon}</div>
                <h3 className="value-card__title">{value.title}</h3>
                <p className="value-card__text">{value.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="team-footer" role="contentinfo">
        <div className="footer__container">
          
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="logo__icon" aria-hidden="true">🏡</span>
              <div className="logo__text">
                <span className="logo__main">Home</span>
                <span className="logo__sub">HARMONY</span>
              </div>
            </div>
            <p className="footer__tagline">
              Empowering sustainable living through intelligent innovation.
            </p>
          </div>

          <div className="footer__section">
            <h4 className="section__title">Quick Links</h4>
            <ul className="section__list">
              <li><button onClick={() => scrollToSection('team')}>Team Members</button></li>
              <li><button onClick={() => scrollToSection('values')}>Our Values</button></li>
              <li><button onClick={openHouseholdChaos}>View App Services</button></li>
            </ul>
          </div>
          
          <div className="footer__contact">
            <h4 className="contact__title">Project Contact</h4>
            <p className="contact__item">🌐 Over The Internet</p>
            <p className="contact__item">📞 9311736319</p>
            <p className="contact__item">© 2025 HomeHarmony.</p>
          </div>

        </div>
        
        <div className="footer__bottom">
          <p className="footer__copyright">Built by Team Harmony for Innovation Challenge.</p>
        </div>
      </footer>
    </div>
  );
};

// --- PropTypes for professional component definition ---
TeamPage.propTypes = {
  openHouseholdChaos: PropTypes.func.isRequired,
};

// The new export name reflecting the component's role
export default TeamPage;