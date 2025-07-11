import React, { useEffect, useState } from 'react';
import './Shop.css';

const Shop = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const shopItems = [
    {
      id: 1,
      title: "Indoor Car Cover in Martini Racing Design",
      description: "Protect your vehicle in style using this custom-fit indoor car cover featuring the classic Martini Racing design.",
      image: "/api/placeholder/300/300",
      link: "Indoor Car Cover",
      category: "accessories"
    },
    {
      id: 2,
      title: "Smartwatch Porsche x Garmin® Epix Pro",
      description: "GPS multisport smartwatch with unique Porsche details and extensive fitness and health features.",
      image: "/api/placeholder/300/300",
      link: "Garmin Epix Pro",
      category: "tech"
    },
    {
      id: 3,
      title: "Porsche eBike Cross Performance EXC 2nd Gen.",
      description: "High-performance exclusive electric mountain bike from Porsche.",
      image: "/api/placeholder/300/300",
      link: "eBike",
      category: "lifestyle"
    },
    {
      id: 4,
      title: "Porsche 917 Salzburg Garage Mat",
      description: "The perfect velour mat in authentic Salzburg design for every garage or workshop.",
      image: "/api/placeholder/300/300",
      link: "Salzburg Garage Mat",
      category: "accessories"
    },
    {
      id: 5,
      title: "Porsche Design Chronograph",
      description: "Premium timepiece featuring classic Porsche design elements and precision engineering.",
      image: "/api/placeholder/300/300",
      link: "Chronograph",
      category: "accessories"
    }
  ];

  const discoverItems = [
    {
      id: 1,
      title: "Travel & Experience",
      image: "/api/placeholder/400/300",
      description: "Discover unique travel experiences and driving adventures.",
      category: "experience"
    },
    {
      id: 2,
      title: "Porsche Approved",
      image: "/api/placeholder/400/300",
      description: "Certified pre-owned vehicles with Porsche quality assurance.",
      category: "vehicles"
    },
    {
      id: 3,
      title: "Motorsport Experience",
      image: "/api/placeholder/400/300",
      description: "Experience the thrill of professional motorsport.",
      category: "motorsport"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(shopItems.length / 4));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(shopItems.length / 4)) % Math.ceil(shopItems.length / 4));
  };

  return (
    <div className="porsche-website">
      {/* Online Shop Highlights Section */}
      <section className="shop-highlights animate-on-scroll">
        <div className="container">
          <div className="section-header">
            <h2>Online Shop Highlights</h2>
            <div className="carousel-controls">
              <button className="carousel-btn prev" onClick={prevSlide}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="carousel-btn next" onClick={nextSlide}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="shop-carousel">
            <div className="shop-items" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {shopItems.map((item, index) => (
                <div key={item.id} className={`shop-item animate-on-scroll`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="item-image">
                    <img src={item.image} alt={item.title} />
                    <div className="item-overlay">
                      <span className="view-details">View Details</span>
                    </div>
                  </div>
                  <div className="item-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <a href="#" className="item-link">
                      <span>{item.link}</span>
                      <svg width="16" height="16" viewBox="0 0 16 16">
                        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="carousel-indicators">
            {Array.from({ length: Math.ceil(shopItems.length / 4) }, (_, i) => (
              <button
                key={i}
                className={`indicator ${i === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Discover Section */}
      <section className="discover-section animate-on-scroll">
        <div className="container">
          <h2>Discover</h2>
          <div className="discover-grid">
            {discoverItems.map((item, index) => (
              <div key={item.id} className={`discover-item animate-on-scroll`} style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="discover-image">
                  <img src={item.image} alt={item.title} />
                  <div className="discover-overlay">
                    <h3>{item.title}</h3>
                    <div className="discover-arrow">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 7H17V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;