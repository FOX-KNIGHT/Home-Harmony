import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Play, Pause, Volume2, VolumeX, Menu, X, ArrowRight } from 'lucide-react';
import './C911.css'; // Assuming you have a CSS file for styling

const C911 = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const videoRef = useRef(null);

  // Image arrays for different sections
  const heroImages = [
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1400&h=900&fit=crop',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1400&h=900&fit=crop',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1400&h=900&fit=crop',
    'https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=1400&h=900&fit=crop'
  ];

  const experienceImages = [
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop'
  ];

  const menuItems = [
    'Overview',
    'Performance',
    'Design',
    'Technology',
    'Experience',
    'Heritage',
    'Configure'
  ];

  const performanceSpecs = [
    { 
      value: '473', 
      unit: 'HP', 
      label: 'Power Output',
      description: 'Twin-turbo flat-six engine delivering exceptional performance'
    },
    { 
      value: '530', 
      unit: 'Nm', 
      label: 'Max Torque',
      description: 'Instant power delivery across the entire rev range'
    },
    { 
      value: '3.4', 
      unit: 's', 
      label: '0-100 km/h',
      description: 'Acceleration that pushes the boundaries of physics'
    },
    { 
      value: '308', 
      unit: 'km/h', 
      label: 'Top Speed',
      description: 'Engineered for the ultimate driving experience'
    }
  ];

  const designFeatures = [
    {
      id: 'iconic-silhouette',
      title: 'Iconic Silhouette',
      subtitle: 'TIMELESS DESIGN',
      description: 'The unmistakable 911 profile has remained true to its DNA while evolving with cutting-edge technology. Every curve tells a story of over 50 years of engineering excellence.',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=700&h=500&fit=crop',
      features: ['Distinctive roofline', 'Aerodynamic efficiency', 'Heritage-inspired design']
    },
    {
      id: 'led-matrix',
      title: 'LED Matrix Headlights',
      subtitle: 'ILLUMINATED EXCELLENCE',
      description: 'Advanced LED Matrix technology provides superior illumination while creating the distinctive four-point light signature that announces the arrival of a true icon.',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=700&h=500&fit=crop',
      features: ['Adaptive beam control', 'Dynamic light distribution', 'Signature LED design']
    },
    {
      id: 'aerodynamics',
      title: 'Aerodynamic Mastery',
      subtitle: 'PERFORMANCE SCULPTED',
      description: 'Every surface has been meticulously crafted to optimize airflow. The active rear spoiler and precisely positioned air intakes deliver both visual drama and functional excellence.',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=700&h=500&fit=crop',
      features: ['Active rear spoiler', 'Optimized air intakes', 'Reduced drag coefficient']
    }
  ];

  const technologyFeatures = [
    {
      title: 'Porsche Communication Management',
      subtitle: 'CONNECTED INTELLIGENCE',
      description: 'The next generation PCM system seamlessly integrates with your digital life while keeping you focused on the pure joy of driving.',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop'
    },
    {
      title: 'Porsche Dynamic Chassis Control',
      subtitle: 'ADAPTIVE PERFORMANCE',
      description: 'Electronically controlled damping system that adapts to your driving style and road conditions in real-time.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop'
    },
    {
      title: 'Porsche Traction Management',
      subtitle: 'INTELLIGENT GRIP',
      description: 'Advanced all-wheel drive system that delivers optimal traction and stability in all conditions.',
      image: 'https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=600&h=400&fit=crop'
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
    
    // Hero image rotation
    const heroInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    // Scroll handler
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(heroInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ExperienceSection = () => {
    const [currentExpIndex, setCurrentExpIndex] = useState(0);
    
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentExpIndex((prev) => (prev + 1) % experienceImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }, []);

    return (
      <section className="experience-section" id="experience">
        <div className="experience-container">
          <div className="experience-header">
            <span className="section-subtitle">A LUXURY SPORTS CAR ALTERNATIVE</span>
            <h2 className="experience-title">
              TRULY UNIQUE
              <br />
              DRIVING
              <br />
              EXPERIENCES
            </h2>
          </div>
          
          <div className="experience-content">
            <div className="experience-text">
              <div className="experience-number">01</div>
              <h3>Precision Engineering</h3>
              <p>
                The 911 delivers exceptional performance while offering 
                one of the most refined driving experiences imaginable. 
                It is a true masterpiece, a car that can transform 
                completely to match your driving mood.
              </p>
              <p>
                The 911 features advanced suspension technology that 
                adapts to driving conditions. In comfort mode, the system 
                provides a smooth, luxurious ride. In sport mode, 
                everything firms up for maximum performance and precision.
              </p>
            </div>
            
            <div className="experience-images">
              <div className="image-grid">
                <div className="image-item large">
                  <img 
                    src={experienceImages[currentExpIndex]} 
                    alt="Porsche 911 Experience"
                    className="experience-image"
                  />
                </div>
                <div className="image-item medium">
                  <img 
                    src={experienceImages[(currentExpIndex + 1) % experienceImages.length]} 
                    alt="Porsche 911 Detail"
                    className="experience-image"
                  />
                </div>
                <div className="image-item small">
                  <img 
                    src={experienceImages[(currentExpIndex + 2) % experienceImages.length]} 
                    alt="Porsche 911 Interior"
                    className="experience-image"
                  />
                </div>
                <div className="image-item large-alt">
                  <img 
                    src={experienceImages[(currentExpIndex + 3) % experienceImages.length]} 
                    alt="Porsche 911 Performance"
                    className="experience-image"
                  />
                </div>
                <div className="image-item medium-alt">
                  <img 
                    src={experienceImages[(currentExpIndex + 4) % experienceImages.length]} 
                    alt="Porsche 911 Luxury"
                    className="experience-image"
                  />
                </div>
                <div className="image-item small-alt">
                  <img 
                    src={experienceImages[currentExpIndex]} 
                    alt="Porsche 911 Heritage"
                    className="experience-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className={`porsche-911-showcase ${isLoaded ? 'loaded' : ''}`}>
      {/* Navigation */}
      <nav className="main-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">PORSCHE</span>
          </div>
          
          <div className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
            {menuItems.map((item, index) => (
              <button 
                key={index}
                className="nav-item"
                onClick={() => scrollToSection(item.toLowerCase())}
              >
                {item}
              </button>
            ))}
          </div>
          
          <button 
            className="nav-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" id="overview">
        <div className="video-background">
          <div className="video-container">
            <div className="video-placeholder">
              <div className="video-overlay"></div>
              <div className="video-content">
                <div className="video-controls">
                  <button onClick={toggleVideo} className="video-control-btn">
                    {isVideoPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <button onClick={toggleMute} className="video-control-btn">
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-subtitle">THE LEGEND CONTINUES</div>
            <h1 className="hero-title">
              <span className="title-brand">PORSCHE</span>
              <span className="title-model">911</span>
            </h1>
            <p className="hero-description">
              Experience the perfect fusion of heritage and innovation. 
              The most iconic sports car ever created, refined for a new generation.
            </p>
            <div className="hero-actions">
              <button 
                className="cta-primary"
                onClick={() => scrollToSection('performance')}
              >
                Discover Performance
                <ArrowRight size={20} />
              </button>
              <button 
                className="cta-secondary"
                onClick={() => scrollToSection('configure')}
              >
                Configure Yours
              </button>
            </div>
          </div>
          
          <div className="hero-car-container">
            <div className="car-image-wrapper">
              <img 
                src={heroImages[currentImageIndex]} 
                alt="Porsche 911" 
                className="hero-car-image"
                style={{ transform: `translateY(${scrollY * 0.5}px)` }}
              />
            </div>
          </div>
        </div>
        
        <div className="scroll-indicator" onClick={() => scrollToSection('performance')}>
          <div className="scroll-text">Scroll to explore</div>
          <ChevronDown size={24} className="scroll-icon" />
        </div>
      </section>

      {/* Performance Section */}
      <section className="performance-section" id="performance">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">PURE PERFORMANCE</span>
            <h2 className="section-title">Engineering Excellence</h2>
          </div>
          
          <div className="performance-grid">
            {performanceSpecs.map((spec, index) => (
              <div key={index} className="performance-card">
                <div className="performance-value">
                  <span className="value-number">{spec.value}</span>
                  <span className="value-unit">{spec.unit}</span>
                </div>
                <div className="performance-label">{spec.label}</div>
                <div className="performance-description">{spec.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Section */}
      <section className="design-section" id="design">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">ICONIC DESIGN</span>
            <h2 className="section-title">Timeless Elegance</h2>
          </div>
          
          <div className="design-features">
            {designFeatures.map((feature, index) => (
              <div key={index} className={`design-feature ${index % 2 === 1 ? 'reverse' : ''}`}>
                <div className="feature-image">
                  <img src={feature.image} alt={feature.title} />
                </div>
                <div className="feature-content">
                  <div className="feature-subtitle">{feature.subtitle}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                  <ul className="feature-list">
                    {feature.features.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="technology-section" id="technology">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">ADVANCED TECHNOLOGY</span>
            <h2 className="section-title">Innovation Meets Tradition</h2>
          </div>
          
          <div className="technology-grid">
            {technologyFeatures.map((tech, index) => (
              <div key={index} className="technology-card">
                <div className="tech-image">
                  <img src={tech.image} alt={tech.title} />
                </div>
                <div className="tech-content">
                  <div className="tech-subtitle">{tech.subtitle}</div>
                  <h3 className="tech-title">{tech.title}</h3>
                  <p className="tech-description">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section (Koenigsegg-style) */}
      <ExperienceSection />

      {/* Heritage Section */}
      <section className="heritage-section" id="heritage">
        <div className="container">
          <div className="heritage-content">
            <div className="heritage-text">
              <span className="section-subtitle">LEGENDARY HERITAGE</span>
              <h2 className="heritage-title">60 Years of Excellence</h2>
              <p className="heritage-description">
                Since 1963, the Porsche 911 has remained true to its founding principles 
                while continuously evolving. This is more than a car—it's a legacy of 
                excellence that continues to inspire drivers around the world.
              </p>
              
              <div className="heritage-stats">
                <div className="heritage-stat">
                  <span className="stat-number">1963</span>
                  <span className="stat-label">First Production Year</span>
                </div>
                <div className="heritage-stat">
                  <span className="stat-number">1M+</span>
                  <span className="stat-label">Cars Produced</span>
                </div>
                <div className="heritage-stat">
                  <span className="stat-number">8</span>
                  <span className="stat-label">Generations</span>
                </div>
                <div className="heritage-stat">
                  <span className="stat-number">∞</span>
                  <span className="stat-label">Legacy</span>
                </div>
              </div>
            </div>
            
            <div className="heritage-image">
              <img 
                src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop" 
                alt="Porsche 911 Heritage"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Configure Section */}
      <section className="configure-section" id="configure">
        <div className="container">
          <div className="configure-content">
            <div className="configure-text">
              <span className="section-subtitle">YOUR PERFECT 911</span>
              <h2 className="configure-title">Create Your Legend</h2>
              <p className="configure-description">
                Every Porsche 911 is unique. Configure yours to match your vision 
                and create a driving experience that's truly personal.
              </p>
              
              <div className="configure-actions">
                <button className="configure-btn primary">
                  Configure Now
                  <ArrowRight size={20} />
                </button>
                <button className="configure-btn secondary">
                  Schedule Test Drive
                </button>
                <button className="configure-btn tertiary">
                  Find a Dealer
                </button>
              </div>
            </div>
            
            <div className="configure-image">
              <img 
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop" 
                alt="Configure Porsche 911"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default C911;