import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

// Import team photos (you'll need to add these to your project)
const asmitpic = '/api/placeholder/150/150';
const Muskanpic = '/api/placeholder/150/150';
const Siddhantpic = '/api/placeholder/150/150';
const Shlokpic = '/api/placeholder/150/150';
const Mithileshpic = '/api/placeholder/150/150';

const Header = () => {
  const navigate = useNavigate();
  const openHouseholdChaos = () => navigate('/');
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [showInitialAnimation, setShowInitialAnimation] = useState(true);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navRef = useRef(null);
  const statsRef = useRef(null);
  const projectRef = useRef(null);
  const particleIntervalRef = useRef(null);
  const observersRef = useRef([]);

  // Team member data
  const teamMembers = useMemo(() => [
    {
      id: 'siddhant',
      name: 'Siddhant Satyajeet Jena',
      role: 'Team Leader & Project Architect',
      photo: Siddhantpic,
      skills: ['Leadership', 'Strategy', 'UI/UX Design'],
      isLeader: true,
      bio: 'Visionary leader driving innovation in household technology solutions.'
    },
    {
      id: 'asmit',
      name: 'Asmit Gupta',
      role: 'Frontend Developer & Designer',
      photo: asmitpic,
      skills: ['React', 'Design Systems', 'JavaScript'],
      isLeader: false,
      bio: 'Creating beautiful and intuitive user experiences.'
    },
    {
      id: 'shlok',
      name: 'Shlok Katiyar',
      role: 'Backend Developer & Systems',
      photo: Shlokpic,
      skills: ['Node.js', 'Database', 'API Design'],
      isLeader: false,
      bio: 'Building robust and scalable backend architectures.'
    },
    {
      id: 'muskan',
      name: 'Muskan Gupta',
      role: 'Data Scientist & Analytics',
      photo: Muskanpic,
      skills: ['Python', 'ML/AI', 'Analytics'],
      isLeader: false,
      bio: 'Transforming data into actionable household insights.'
    },
    {
      id: 'mithilesh',
      name: 'Mithilesh Das',
      role: 'DevOps & Quality Engineer',
      photo: Mithileshpic,
      skills: ['DevOps', 'Cloud', 'Testing'],
      isLeader: false,
      bio: 'Ensuring seamless deployment and quality assurance.'
    }
  ], []);

  // Feature data
  const features = useMemo(() => [
    {
      icon: '🤖',
      title: 'Smart Task Automation',
      description: 'AI-powered scheduling and routine optimization that learns your family\'s patterns.'
    },
    {
      icon: '👨‍👩‍👧‍👦',
      title: 'Family Coordination Hub',
      description: 'Centralized communication and activity planning for all family members.'
    },
    {
      icon: '📊',
      title: 'Household Analytics',
      description: 'Track patterns, optimize efficiency, and gain insights into home management.'
    },
    {
      icon: '🏆',
      title: 'Achievement System',
      description: 'Gamified chores and family challenges to motivate everyone.'
    },
    {
      icon: '🔔',
      title: 'Smart Notifications',
      description: 'Contextual reminders and intelligent alerts when you need them.'
    },
    {
      icon: '💰',
      title: 'Budget Management',
      description: 'Track household expenses and optimize your family budget.'
    }
  ], []);

  // Stats data
  const stats = useMemo(() => [
    { number: 500, label: 'Families Helped', suffix: '+' },
    { number: 95, label: 'Satisfaction Rate', suffix: '%' },
    { number: 24, label: 'Hours Saved/Week', suffix: '' },
    { number: 10, label: 'Smart Features', suffix: '+' }
  ], []);

  // Mobile menu toggle
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Close mobile menu
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollThreshold = 100;

    // Update scroll direction and nav visibility
    if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
      if (scrollDirection !== 'down') {
        setScrollDirection('down');
        setIsNavVisible(false);
      }
    } else {
      if (scrollDirection !== 'up') {
        setScrollDirection('up');
        setIsNavVisible(true);
      }
    }

    setLastScrollY(currentScrollY);

    // Update navbar style
    if (navRef.current) {
      const isScrolled = currentScrollY > scrollThreshold;
      navRef.current.classList.toggle('scrolled', isScrolled);
    }

    // Update active section
    const sections = ['home', 'team', 'project', 'features'];
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section);
          break;
        }
      }
    }
  }, [lastScrollY, scrollDirection]);

  // Smooth scroll handler
  const handleAnchorClick = useCallback((e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    const target = document.querySelector(href);

    if (target) {
      const navHeight = navRef.current?.offsetHeight || 80;
      const targetPosition = target.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }

    closeMobileMenu();
  }, [closeMobileMenu]);

  // Stats animation
  const animateStats = useCallback(() => {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach((stat, index) => {
      const finalNumber = parseInt(stat.dataset.number);
      const suffix = stat.dataset.suffix || '';
      let current = 0;
      const duration = 2000;
      const steps = 60;
      const increment = finalNumber / steps;
      const stepDuration = duration / steps;

      const animate = () => {
        current += increment;
        if (current < finalNumber) {
          stat.textContent = Math.floor(current) + suffix;
          setTimeout(animate, stepDuration);
        } else {
          stat.textContent = finalNumber + suffix;
        }
      };

      setTimeout(animate, index * 200);
    });
  }, []);

  // Feature animation
  const animateFeatures = useCallback(() => {
    const featureItems = document.querySelectorAll('.project-features .feature-item');

    featureItems.forEach((feature, index) => {
      setTimeout(() => {
        feature.classList.add('animate-in');
      }, index * 150);
    });
  }, []);

  // Create particle effect
  const createParticle = useCallback(() => {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const shapes = ['circle', 'square', 'triangle'];
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

    particle.classList.add(`particle-${randomShape}`);
    particle.style.background = randomColor;
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';

    document.body.appendChild(particle);

    setTimeout(() => {
      if (particle.parentNode) {
        particle.remove();
      }
    }, 8000);
  }, []);

  // Team member interaction handlers
  const handleTeamMemberHover = useCallback((e, isEntering) => {
    const member = e.currentTarget;
    member.classList.toggle('hovered', isEntering);
  }, []);

  const handleLeaderClick = useCallback((e) => {
    e.currentTarget.classList.add('pulse-animation');
    setTimeout(() => {
      e.currentTarget.classList.remove('pulse-animation');
    }, 600);
  }, []);

  // Main useEffect
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setShowInitialAnimation(false);
    }, 3000);

    let ticking = false;
    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    // Intersection Observer for animations
    const fadeInObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !statsAnimated) {
            animateStats();
            setStatsAnimated(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    const projectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateFeatures();
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe elements
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    fadeInSections.forEach(el => fadeInObserver.observe(el));

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    if (projectRef.current) {
      projectObserver.observe(projectRef.current);
    }

    observersRef.current = [fadeInObserver, statsObserver, projectObserver];

    particleIntervalRef.current = setInterval(createParticle, 2000);

    window.addEventListener('scroll', throttledScrollHandler, { passive: true });

    return () => {
      clearTimeout(loadingTimer);

      anchorLinks.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
      window.removeEventListener('scroll', throttledScrollHandler);

      observersRef.current.forEach(observer => observer.disconnect());

      if (particleIntervalRef.current) {
        clearInterval(particleIntervalRef.current);
      }

      const particles = document.querySelectorAll('.particle');
      particles.forEach(particle => particle.remove());
    };
  }, [handleScroll, handleAnchorClick, animateStats, animateFeatures, createParticle, statsAnimated]);

  // Render team member
  const renderTeamMember = useCallback((member) => (
    <div
      key={member.id}
      className={`team-member ${member.isLeader ? 'leader' : ''}`}
      onMouseEnter={(e) => handleTeamMemberHover(e, true)}
      onMouseLeave={(e) => handleTeamMemberHover(e, false)}
      onClick={member.isLeader ? handleLeaderClick : undefined}
    >
      <div className="member-photo">
        <img
          src={member.photo}
          alt={member.name}
          className="member-avatar"
          loading="lazy"
        />
        <div className="photo-glow"></div>
        {member.isLeader && <div className="leader-crown">👑</div>}
      </div>
      <div className="member-info">
        <div className="member-name">{member.name}</div>
        <div className="member-role">{member.role}</div>
        <div className="member-bio">{member.bio}</div>
        <div className="member-skills">
          {member.skills.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  ), [handleTeamMemberHover, handleLeaderClick]);

  // Render feature item
  const renderFeatureItem = useCallback((feature, index) => (
    <div key={index} className="feature-item">
      <div className="feature-icon">{feature.icon}</div>
      <div className="feature-content">
        <h4 className="feature-title">{feature.title}</h4>
        <p className="feature-description">{feature.description}</p>
      </div>
    </div>
  ), []);

  return (
    <div className="app-container">
      {/* Loading Animation */}
      {showInitialAnimation && (
        <div className="loading-overlay">
          <div className="loading-content">
            <h1 className="loading-title">HomeHarmony</h1>
            <div className="loading-subtitle">Transforming Chaos into Harmony</div>
            <div className="loading-spinner">
              <div className="spinner-ring"></div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`navbar ${!isNavVisible ? 'navbar-hidden' : ''}`} ref={navRef}>
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <span className="logo-icon">🏠</span>
              <span className="logo-text">HomeHarmony</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {/* Navigation Links */}
            <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
              <li><a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}>Home</a></li>

              <li><a href="#project" className={`nav-link ${activeSection === 'project' ? 'active' : ''}`}>Solution</a></li>
              <li><a href="#features" className={`nav-link ${activeSection === 'features' ? 'active' : ''}`}>Features</a></li>
              <li>
                <button
                  onClick={() => { openHouseholdChaos(); closeMobileMenu(); }}
                  className="experience-btn"
                  aria-label="Experience HomeHarmony"
                >
                  <span className="experience-icon">✨</span>
                  Experience
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-background">
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
            <div className="hero-actions">
              <a href="#project" className="cta-btn primary">
                <span>Discover Our Vision</span>
                <i className="btn-arrow">→</i>
              </a>
              <button onClick={openHouseholdChaos} className="cta-btn secondary">
                <span>Try Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats fade-in-section" ref={statsRef}>
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div
                  className="stat-number"
                  data-number={stat.number}
                  data-suffix={stat.suffix}
                >
                  0{stat.suffix}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section Removed */}

      {/* Project Section */}
      <section className="project fade-in-section" id="project" ref={projectRef}>
        <div className="container">
          <div className="project-content">
            <div className="project-info">
              <div className="mission-header">
                <span className="mission-icon">🎯</span>
                <h2 className="project-title">
                  Our <span className="highlight">Mission</span>
                </h2>
              </div>

              <p className="project-description">
                Revolutionizing household management through intelligent automation
                and seamless organization systems that adapt to your family's unique rhythm and lifestyle.
              </p>

              <div className="project-visual-mobile">
                <div className="home-visual">
                  <span className="main-icon">🏡</span>
                  <div className="floating-elements">
                    <div className="floating-element element-1">📱</div>
                    <div className="floating-element element-2">⚡</div>
                    <div className="floating-element element-3">🔧</div>
                    <div className="floating-element element-4">💡</div>
                  </div>
                </div>
              </div>

              <button
                onClick={openHouseholdChaos}
                className="experience-btn-large"
                aria-label="Experience Home Harmony"
              >
                <span className="experience-icon">✨</span>
                Experience Home Harmony
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

      {/* Features Section */}
      <section className="features fade-in-section" id="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-icon">⚡</span>
              Core Features
            </h2>
            <p className="section-subtitle">Powerful tools for seamless household management</p>
          </div>

          <div className="project-features">
            {features.map(renderFeatureItem)}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="logo-icon">🏠</span>
                <span className="logo-text">HomeHarmony</span>
              </div>
              <p className="footer-description">Transforming chaos into harmony, one home at a time.</p>
            </div>

            <nav className="footer-links">
              <div className="footer-section">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#project">Solution</a>
                <button onClick={openHouseholdChaos}>Demo</button>
              </div>
              <div className="footer-section">
                <h4>Company</h4>
                <a href="#project">Mission</a>
                <a href="#home">About</a>
              </div>
              <div className="footer-section">
                <h4>Connect</h4>
                <a href="mailto:contact@homeharmony.com">Contact</a>
                <a href="#support">Support</a>
              </div>
            </nav>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} HomeHarmony. All rights reserved.</p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="LinkedIn">💼</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Header;
