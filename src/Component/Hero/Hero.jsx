import './Hero.css';
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import img1 from './img1.jpg'
import img2 from './img2.jpg'
import img3 from './img3.jpg'
import img4 from './img4.jpg'

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            model: "911 Turbo S",
            title: "TIMELESS PERFORMANCE",
            description: "The iconic 911 Turbo S delivers unmatched performance with legendary design",
            image: img1
        },
        {
            model: "Taycan Turbo S",
            title: "ELECTRIC REVOLUTION",
            description: "Experience the future of sports cars with instant torque and zero emissions",
            image: img2
        },
        {
            model: "Cayenne Turbo",
            title: "LUXURY MEETS POWER",
            description: "The perfect blend of SUV versatility and sports car performance",
            image: img3
        },
        {
            model: "Panamera 4S",
            title: "EXECUTIVE ELEGANCE",
            description: "Sophisticated luxury sedan with the heart of a sports car",
            image: img4
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    // Auto-advance slides every 6 seconds
    useEffect(() => {
        const interval = setInterval(nextSlide, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hero-container">
            {/* Background Images */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                >
                    <img
                        src={slide.image}
                        alt={slide.model}
                        className="hero-slide-image"
                    />
                </div>
            ))}

            {/* Dark overlay for better text readability */}
            <div className="hero-overlay"></div>

            {/* Navigation Tabs */}
            <div className="hero-navigation">
                {slides.map((slide, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`hero-nav-button ${index === currentSlide ? 'active' : ''}`}
                    >
                        {slide.model}
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <div className="hero-content">
                <div className="hero-text-container">
                    <div className="hero-text">
                        <div>
                            <h1 className="hero-title">
                                {slides[currentSlide].title}
                            </h1>
                            <p className="hero-subtitle">
                                {slides[currentSlide].description}
                            </p>
                        </div>

                        <button className="hero-cta-button">
                            <span>Discover More</span>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Slide Indicators */}
            <div className="hero-indicators">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`hero-indicator ${index === currentSlide ? 'active' : ''}`}
                    />
                ))}
            </div>

            {/* Decorative Elements */}
            <div className="hero-decorative"></div>
        </div>
    );
};

export default Hero;