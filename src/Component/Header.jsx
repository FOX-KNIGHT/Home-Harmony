import React, { useEffect, useRef, useState } from 'react';
import './Header.css';
import asmitpic from './Photo/Asmit.jpg';
import Muskanpic from './Photo/Muskan.jpg';
import Siddhantpic from './Photo/Sidd.png';
import Shlokpic from './Photo/Shlok.jpg';
import Mithileshpic from './Photo/Mithilesh.jpg';
import Footer from './Footer';


const Header = ({ openLogin, openHouseholdChaos }) => {
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [visibleFeatures, setVisibleFeatures] = useState([]);
  const [showInitialAnimation, setShowInitialAnimation] = useState(true);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const navRef = useRef(null);
  const statsRef = useRef(null);
  const projectRef = useRef(null);

  useEffect(() => {
    // Initial loading animation
    const timer = setTimeout(() => {
      setShowInitialAnimation(false);
    }, 4000);

    // Navbar scroll behavior
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      setLastScrollY(currentScrollY);

      if (navRef.current) {
        if (currentScrollY > 100) {
          navRef.current.classList.add('scrolled');
        } else {
          navRef.current.classList.remove('scrolled');
        }
      }
    };

    // Smooth scrolling for navigation links
    const handleAnchorClick = (e) => {
      e.preventDefault();
      const target = document.querySelector(e.target.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    window.addEventListener('scroll', handleScroll);

    // Enhanced fade in animation on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    const fadeInSections = document.querySelectorAll('.fade-in-section');
    fadeInSections.forEach(el => observer.observe(el));

    // Stats animation
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          animateStats();
          setStatsAnimated(true);
        }
      });
    });

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    // Project features animation observer
    const projectObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateFeatures();
        }
      });
    }, { threshold: 0.3 });

    if (projectRef.current) {
      projectObserver.observe(projectRef.current);
    }

    // Enhanced particle effect with variety
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';

      const shapes = ['circle', 'square', 'triangle'];
      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

      particle.classList.add(`particle-${randomShape}`);
      particle.style.background = randomColor;
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.animationDuration = (Math.random() * 4 + 3) + 's';
      particle.style.animationDelay = Math.random() * 2 + 's';

      document.body.appendChild(particle);

      setTimeout(() => {
        if (particle.parentNode) {
          particle.remove();
        }
      }, 7000);
    };

    const particleInterval = setInterval(createParticle, 800);

    // Cleanup
    return () => {
      clearTimeout(timer);
      anchorLinks.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      statsObserver.disconnect();
      projectObserver.disconnect();
      clearInterval(particleInterval);
    };
  }, [statsAnimated, lastScrollY]);

  const animateStats = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach((stat, index) => {
      const finalNumber = parseInt(stat.textContent);
      let current = 0;

      const increment = () => {
        if (current < finalNumber) {
          current += Math.ceil(finalNumber / 60);
          if (current > finalNumber) current = finalNumber;
          stat.textContent = current + (stat.textContent.includes('+') ? '+' : '');
          requestAnimationFrame(increment);
        }
      };

      setTimeout(() => requestAnimationFrame(increment), index * 300);
    });
  };

  const animateFeatures = () => {
    const features = document.querySelectorAll('.project-features li');
    features.forEach((feature, index) => {
      setTimeout(() => {
        feature.classList.add('animate-in');
      }, index * 150);
    });
  };

  const handleTeamMemberHover = (e, isEntering) => {
    const member = e.currentTarget;
    if (isEntering) {
      member.classList.add('hovered');
    } else {
      member.classList.remove('hovered');
    }
  };

  const handleLeaderClick = (e) => {
    e.currentTarget.classList.add('pulse-animation');
    setTimeout(() => {
      e.currentTarget.classList.remove('pulse-animation');
    }, 600);
  };

  const handleFeatureHover = (index) => {
    const feature = document.querySelector(`.feature-item:nth-child(${index + 1})`);
    if (feature) {
      feature.classList.add('feature-glow');
      setTimeout(() => {
        feature.classList.remove('feature-glow');
      }, 300);
    }
  };

  return (
    <div className="app-container">
      {/* Initial Loading Animation */}
      {showInitialAnimation && (
        <div className="loading-overlay">
          <div className="loading-content">
            <h1 className="loading-title">HomeHarmony</h1>
            <div className="loading-subtitle">Transforming Chaos into Harmony</div>
            <div className="loading-spinner"></div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`navbar ${scrollDirection === 'down' ? 'navbar-hidden' : ''}`} ref={navRef}>
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <span className="logo-icon">🏠</span>
              <span className="logo-text">HomeHarmony</span>
            </div>
            <ul className="nav-links">
              <li><a href="#home" className="nav-link">Home</a></li>
              <li><a href="#team" className="nav-link">Team</a></li>
              <li><a href="#project" className="nav-link">Solution</a></li>
              <li><a href="#features" className="nav-link">Features</a></li>
              <li>
                <button onClick={openLogin} className="login-btn">
                  <span className="login-icon">👤</span>
                  Login
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-background">
          <div className="hero-particles"></div>
          <div className="hero-gradient"></div>
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="innovation-badge">
              <span className="badge-icon">✨</span>
              <span>Innovation Challenge 2025</span>
            </div>
            <h1 className="hero-title">
              <span className="title-main">Transform Your Home</span>
              <span className="title-highlight">From Chaos to Harmony</span>
            </h1>
            <div className="hero-subtitle">Smart Solutions for Modern Households</div>
            <p className="hero-description">
              Meet the innovative team revolutionizing household management through intelligent
              technology. Five passionate developers creating seamless solutions for busy families
              to organize, manage, and optimize their daily routines.
            </p>
            <a href="#team" className="cta-btn primary">
              <span>Discover Our Vision</span>
              <i className="btn-arrow">→</i>
            </a>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team fade-in-section" id="team">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-icon">🌟</span>
              Team HomeHarmony
            </h2>
            <p className="section-subtitle">Five innovative minds, one harmonious vision</p>
          </div>

          <div className="team-grid">
            {/* Team Members */}
            <div
              className="team-member"
              onMouseEnter={(e) => handleTeamMemberHover(e, true)}
              onMouseLeave={(e) => handleTeamMemberHover(e, false)}
            >
              <div className="member-photo">
                <img
                  src={asmitpic}
                  alt="Asmit Gupta"
                  className="member-avatar"
                />
                <div className="photo-glow"></div>
              </div>
              <div className="member-info">
                <div className="member-name">Asmit Gupta</div>
                <div className="member-role">Frontend Developer & Designer</div>
                <div className="member-skills">
                  <span className="skill-tag">React</span>
                  <span className="skill-tag">Design Systems</span>
                  <span className="skill-tag">JavaScript</span>
                </div>
              </div>
            </div>

            {/* Team Leader */}
            <div
              className="team-member leader"
              onMouseEnter={(e) => handleTeamMemberHover(e, true)}
              onMouseLeave={(e) => handleTeamMemberHover(e, false)}
              onClick={handleLeaderClick}
            >
              <div className="member-photo">
                <img
                  src={Siddhantpic}
                  alt="Siddhant Satyajeet Jena"
                  className="member-avatar"
                />
                <div className="photo-glow"></div>
              </div>
              <div className="member-info">
                <div className="member-name">Siddhant Satyajeet Jena</div>
                <div className="member-role">Team Leader & Project Architect</div>
                <div className="member-skills">
                  <span className="skill-tag">Leadership</span>
                  <span className="skill-tag">Strategy</span>
                  <span className="skill-tag">UI/UX Design</span>
                </div>
              </div>
            </div>

            <div
              className="team-member"
              onMouseEnter={(e) => handleTeamMemberHover(e, true)}
              onMouseLeave={(e) => handleTeamMemberHover(e, false)}
            >
              <div className="member-photo">
                <img
                  src={Shlokpic}
                  alt="Shlok"
                  className="member-avatar"
                />
                <div className="photo-glow"></div>
              </div>
              <div className="member-info">
                <div className="member-name">Shlok Katiyar</div>
                <div className="member-role">Backend Developer & Systems</div>
                <div className="member-skills">
                  <span className="skill-tag">Node.js</span>
                  <span className="skill-tag">Database</span>
                  <span className="skill-tag">API Design</span>
                </div>
              </div>
            </div>

            <div
              className="team-member"
              onMouseEnter={(e) => handleTeamMemberHover(e, true)}
              onMouseLeave={(e) => handleTeamMemberHover(e, false)}
            >
              <div className="member-photo">
                <img
                  src={Muskanpic}
                  alt="Muskan"
                  className="member-avatar"
                />
                <div className="photo-glow"></div>
              </div>
              <div className="member-info">
                <div className="member-name">Muskan Gupta</div>
                <div className="member-role">Data Scientist & Analytics</div>
                <div className="member-skills">
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">ML/AI</span>
                  <span className="skill-tag">Analytics</span>
                </div>
              </div>
            </div>

            <div
              className="team-member"
              onMouseEnter={(e) => handleTeamMemberHover(e, true)}
              onMouseLeave={(e) => handleTeamMemberHover(e, false)}
            >
              <div className="member-photo">
                <img
                  src={Mithileshpic}
                  alt="Mithilesh"
                  className="member-avatar"
                />
                <div className="photo-glow"></div>
              </div>
              <div className="member-info">
                <div className="member-name">Mithilesh Das</div>
                <div className="member-role">DevOps & Quality Engineer</div>
                <div className="member-skills">
                  <span className="skill-tag">DevOps</span>
                  <span className="skill-tag">Cloud</span>
                  <span className="skill-tag">Testing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Project Section */}
      <section className="project fade-in-section" id="project" ref={projectRef}>
        <div className="container">
          <div className="project-content">
            <div className="project-info">
              <div className="mission-header">
                <span className="mission-icon">🎯</span>
                <h2 className="project-title">
                  Our <span className="highlight">Mission</span>
                </h2>
                <div className="mission-underline"></div>
              </div>

              <p className="project-description">
                <span className="typing-text">Revolutionizing household management through intelligent automation
                  and seamless organization systems that adapt to your family's unique rhythm and lifestyle.</span>
              </p>

              <div className="features-container" id="features">
                <h3 className="features-title">Core Features</h3>
                <ul className="project-features">
                  <li className="feature-item" onMouseEnter={() => handleFeatureHover(0)}>
                    <span className="feature-icon">🤖</span>
                    <div className="feature-content">
                      <strong>Smart Task Automation</strong>
                      <span>AI-powered scheduling and routine optimization</span>
                    </div>
                  </li>
                  <li className="feature-item" onMouseEnter={() => handleFeatureHover(1)}>
                    <span className="feature-icon">👨‍👩‍👧‍👦</span>
                    <div className="feature-content">
                      <strong>Family Coordination Hub</strong>
                      <span>Centralized communication and activity planning</span>
                    </div>
                  </li>
                  <li className="feature-item" onMouseEnter={() => handleFeatureHover(2)}>
                    <span className="feature-icon">📊</span>
                    <div className="feature-content">
                      <strong>Household Analytics</strong>
                      <span>Track patterns and optimize home efficiency</span>
                    </div>
                  </li>
                  <li className="feature-item" onMouseEnter={() => handleFeatureHover(3)}>
                    <span className="feature-icon">🏆</span>
                    <div className="feature-content">
                      <strong>Achievement System</strong>
                      <span>Gamified chores and family challenges</span>
                    </div>
                  </li>
                  <li className="feature-item" onMouseEnter={() => handleFeatureHover(4)}>
                    <span className="feature-icon">🔔</span>
                    <div className="feature-content">
                      <strong>Smart Notifications</strong>
                      <span>Contextual reminders and alerts</span>
                    </div>
                  </li>
                </ul>
              </div>

              <button onClick={openHouseholdChaos} className="cta-btn secondary solution-btn">
                <span>Experience HomeHarmony</span>
                <i className="btn-arrow">↗</i>
              </button>
            </div>

            <div className="project-visual">
              <div className="home-visual">
                <span className="main-icon">🏡</span>
                <div className="floating-elements">
                  <div className="floating-element element-1">📱</div>
                  <div className="floating-element element-2">⚡</div>
                  <div className="floating-element element-3">🔧</div>
                  <div className="floating-element element-4">💡</div>
                  <div className="floating-element element-5">🎯</div>
                  <div className="floating-element element-6">✨</div>
                </div>
                <div className="visual-glow"></div>
                <div className="pulse-ring"></div>
                <div className="pulse-ring pulse-ring-delay"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
      
  );
};

export default Header;