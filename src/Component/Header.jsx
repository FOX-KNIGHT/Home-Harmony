import React, { useEffect, useState, useCallback } from 'react';
import './Header.css';
import asmitpic from './Photo/Asmit.jpg';
import Siddhantpic from './Photo/Sidd.png';
import Mithileshpic from './Photo/Mithilesh.jpg'; // Assuming Mithileshpic is used somewhere else or will be part of the full team later. Keeping the import clean.

// --- Data ---
const teamMembersData = [
  {
    name: "Siddhant Satyajeet Jena",
    role: "Team Leader & Technical ",
    image: Siddhantpic,
    skills: ["Leadership", "Full-Stack", "Innovation", "UI/UX Design"],
    description: "Leading the charge in sustainable innovation with a vision to transform how families manage their homes. Passionate about creating technology that makes a real difference.",
    linkedin: "http://www.linkedin.com/in/siddhant-jena-457350389",
    github: "https://github.com/FOX-KNIGHT",
    insta: "https://www.instagram.com/s1ddhant._.18/",
    isLeader: true
  },
  {
    name: "Rohit Kumar",
    role: "VisionaryLead & Developer",
    image: asmitpic,
    skills: ["React", "Strategy", "Design Systems", "Architecture"],
    description: "Crafting elegant solutions through code and design. Specializes in building scalable applications that prioritize user experience and performance.",
    linkedin: "https://www.linkedin.com/in/rohit-kumar-604884333",
    github: "https://github.com/DiscoveringRohit",
    insta: "https://www.instagram.com/discoveringrohit/",
    isLeader: false
  }
];

// --- Sub-Components for Clarity ---

const NavLink = ({ id, label, isActive, onClick }) => (
  <li>
    <button 
      onClick={() => onClick(id)}
      className={`nav__link ${isActive ? 'nav__link--active' : ''}`}
    >
      {label}
    </button>
  </li>
);

const TeamCard = ({ member }) => (
  <div 
    className={`team-card ${member.isLeader ? 'team-card--leader' : ''}`}
  >
    {member.isLeader && (
      <div className="team-card__badge">
        <span>Team Leader</span>
      </div>
    )}
    
    <div className="team-card__image-wrapper">
      <div className="team-card__glow"></div>
      <img 
        src={member.image} 
        alt={member.name} 
        className="team-card__image"
      />
      <div className="team-card__overlay">
        <div className="social-links">
          <a href={member.linkedin} className="social-link" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href={member.github} className="social-link" aria-label="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href={`mailto:${member.email}`} className="social-link" aria-label="Email">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
    
    <div className="team-card__content">
      <h3 className="team-card__name">{member.name}</h3>
      <p className="team-card__role">{member.role}</p>
      <p className="team-card__description">{member.description}</p>
      
      <div className="team-card__skills">
        {/* Removed redundant skills-label wrapper for cleaner structure */}
        <div className="skills-list">
          {member.skills.map((skill, idx) => (
            <span key={idx} className="skill-badge">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// --- Main Component ---
const Header = ({ openHouseholdChaos }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Debounced scroll handler is crucial for performance with complex CSS animations
  const scrollToSection = useCallback((id) => {
    const container = document.querySelector('.header-page');
    const element = container?.querySelector(`#${id}`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  // Observer/Scroll logic to detect active section
  useEffect(() => {
    const container = document.querySelector('.header-page');
    if (!container) return;

    const handleScroll = () => {
      const sections = ['hero', 'team', 'mission', 'values'];
      // Offset to position the active link correctly in the navigation
      const scrollPosition = container.scrollTop + 150; 

      for (const sectionId of sections.reverse()) {
        const element = container.querySelector(`#${sectionId}`);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    // Since the content is all in the same component, scroll listener is added to the container.
    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Initial check

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const sections = [
    { id: "hero", label: "Overview" },
    { id: "team", label: "Team" },
    { id: "mission", label: "Mission" },
    { id: "values", label: "Values" }
  ];

  return (
    <div className={`header-page ${isVisible ? 'header-page--visible' : ''}`}>
      {/* Navigation */}
      <nav className="header-page__nav">
        <div className="nav__container">
          <div className="nav__logo">
            <span className="nav__logo-icon">👥</span>
            <div className="nav__logo-text">
              <span className="logo-primary">Team</span>
              <span className="logo-secondary">HomeHarmony</span>
            </div>
          </div>
          
          <ul className="nav__links">
            {sections.map(link => (
              <NavLink 
                key={link.id}
                id={link.id} 
                label={link.label} 
                isActive={activeSection === link.id}
                onClick={scrollToSection}
              />
            ))}
            <li>
              <button onClick={openHouseholdChaos} className="nav__cta">
                <span>Services</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="header-hero" id="hero">
        <div className="hero__background">
          <div className="hero__gradient"></div>
          <div className="hero__shapes">
            <div className="shape shape--1"></div>
            <div className="shape shape--2"></div>
            <div className="shape shape--3"></div>
          </div>
        </div>
        
        <div className="hero__content">
          <div className="hero__badge">
            <span className="badge-shine"></span>
            <span className="badge-icon">✨</span>
            <span className="badge-text">Innovation Challenge 2025</span>
          </div>
          
          <h1 className="hero__title">
            <span className="title__line">The Architects of</span>
            <span className="title__highlight">HomeHarmony</span>
          </h1>
          
          <p className="hero__description">
            Two visionaries united by a singular mission: to revolutionize sustainable living 
            through intelligent technology. We're not just building software—we're crafting 
            the future of eco-conscious home management.
          </p>
          
          <div className="hero__stats">
            <div className="stat">
              <div className="stat__value">2</div>
              <div className="stat__label">Core Members</div>
            </div>
            <div className="stat">
              <div className="stat__value">1</div>
              <div className="stat__label">Shared Vision</div>
            </div>
            <div className="stat">
              <div className="stat__value">∞</div>
              <div className="stat__label">Possibilities</div>
            </div>
          </div>
          
          <button onClick={() => scrollToSection('team')} className="hero__cta">
            <span>Meet Our Team</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
            </svg>
          </button>
        </div>
      </section>

      {/* Team Section */}
      <section className="header-team" id="team">
        <div className="team__container">
          <div className="section__header">
            <div className="section__badge">Our Team</div>
            <h2 className="section__title">Meet the Innovators</h2>
            <p className="section__subtitle">
              Driven by passion, united by purpose, committed to excellence
            </p>
          </div>
          
          <div className="team__grid">
            {teamMembersData.map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="header-mission" id="mission">
        <div className="mission__container">
          <div className="section__header">
            <div className="section__badge">Our Mission</div>
            <h2 className="section__title">Driven by Purpose</h2>
            <p className="section__subtitle">
              Building tomorrow's sustainable living solutions today
            </p>
          </div>
          
          <div className="mission__content">
            <div className="mission__card mission__card--primary">
              <div className="mission__icon">🎯</div>
              <h3 className="mission__card-title">Vision</h3>
              <p className="mission__card-text">
                To create a world where every household effortlessly manages resources, 
                reduces waste, and contributes to a sustainable future through intelligent, 
                user-friendly technology.
              </p>
            </div>
            
            <div className="mission__card mission__card--secondary">
              <div className="mission__icon">💡</div>
              <h3 className="mission__card-title">Approach</h3>
              <p className="mission__card-text">
                We blend cutting-edge AI, intuitive design, and sustainable practices to 
                develop solutions that adapt to users' needs while minimizing environmental 
                impact at every step.
              </p>
            </div>
            
            <div className="mission__card mission__card--accent">
              <div className="mission__icon">🚀</div>
              <h3 className="mission__card-title">Impact</h3>
              <p className="mission__card-text">
                Every feature we build, every line of code we write, is designed to create 
                measurable positive change—for families, communities, and our planet.
              </p>
            </div>
          </div>
          
          <div className="mission__cta">
            <h3 className="mission__cta-title">Ready to Experience Our Work?</h3>
            <p className="mission__cta-text">
              Explore our innovative services and discover how we're transforming sustainable living.
            </p>
            <button onClick={openHouseholdChaos} className="mission__cta-button">
              <span>Discover Our Services</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Values Section (using mission cards styling for consistency) */}
      <section className="header-mission" id="values">
        <div className="mission__container">
          <div className="section__header">
            <div className="section__badge">Core Values</div>
            <h2 className="section__title">What Drives Us</h2>
          </div>
          
          <div className="mission__content">
            <div className="mission__card mission__card--primary">
              <div className="mission__icon">🌟</div>
              <h3 className="mission__card-title">Innovation First</h3>
              <p className="mission__card-text">
                We push boundaries, challenge conventions, and constantly seek better ways 
                to solve complex problems.
              </p>
            </div>
            
            <div className="mission__card mission__card--secondary">
              <div className="mission__icon">👤</div>
              <h3 className="mission__card-title">User-Centric</h3>
              <p className="mission__card-text">
                Every decision starts with the user. We create experiences that are intuitive, 
                accessible, and genuinely helpful.
              </p>
            </div>
            
            <div className="mission__card mission__card--accent">
              <div className="mission__icon">🌿</div>
              <h3 className="mission__card-title">Sustainability</h3>
              <p className="mission__card-text">
                Environmental responsibility isn't an afterthought—it's woven into the fabric 
                of everything we build.
              </p>
            </div>
            
            <div className="mission__card" style={{ borderTop: '4px solid var(--gray-700)'}}>
              <div className="mission__icon">💎</div>
              <h3 className="mission__card-title">Excellence</h3>
              <p className="mission__card-text">
                We set high standards and hold ourselves accountable. Good enough never is—we 
                strive for exceptional.
              </p>
            </div>
          </div>
          
          <div className="mission__cta">
            <h3 className="mission__cta-title">Ready to Experience Our Work?</h3>
            <p className="mission__cta-text">
              Explore our innovative services and discover how we're transforming sustainable living.
            </p>
            <button onClick={openHouseholdChaos} className="mission__cta-button">
              <span>Discover Our Services</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Footer - Using classes defined in Header.css Footer section */}
      <footer className="header-footer">
        <div className="footer__container">
          <div className="footer__content">
            <div className="footer__brand">
              <div className="footer__logo">
                <span className="footer__logo-icon">🏡</span>
                <span className="footer__logo-text">Home Harmony</span>
              </div>
              <p className="footer__tagline">
                Empowering sustainable living through intelligent innovation.
              </p>
            </div>
            
            <div className="footer__links">
              <div className="footer__section">
                <h4 className="footer__title">Team</h4>
                <ul className="footer__list">
                  <li><button onClick={() => scrollToSection('team')}>Meet the Team</button></li>
                  <li><button onClick={() => scrollToSection('mission')}>Our Mission</button></li>
                  <li><button onClick={() => scrollToSection('values')}>Core Values</button></li>
                </ul>
              </div>
              
              <div className="footer__section">
                <h4 className="footer__title">Product</h4>
                <ul className="footer__list">
                  <li><button onClick={openHouseholdChaos}>Services</button></li>
                  <li><button onClick={openHouseholdChaos}>Contact</button></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer__bottom">
            <p className="footer__copyright">© 2025 HomeHarmony. All rights reserved.</p>
            <p className="footer__credit">Crafted with passion by Team HomeHarmony</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Header;