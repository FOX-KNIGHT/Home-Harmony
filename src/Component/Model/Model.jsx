import React, { useState, useEffect, useRef } from 'react';
import './Model.css';

import c911 from './Porsche 911.mp4';
import c718 from './Porsche 718.mp4';
import cTaycan from './Porsche Taycan.mp4';
import cPanamera from './Panamera.mp4';
import cMacan from './Macan GTS.mp4';
import cCayenne from './Cayenne.mp4';

const Models = () => {
    const [currentModel, setCurrentModel] = useState(0);
    const [showAllModels, setShowAllModels] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const videoRefs = useRef([]);

    const models = [
        {
            name: "911",
            tagline: "THE ICON REDEFINED",
            videoUrl: c911,
            specs: {
                power: "379-650 HP",
                acceleration: "3.0-4.2 sec 0-60 mph",
                topSpeed: "182-211 mph",
                fuelType: "Gasoline / Hybrid"
            },
            description: "The quintessential sports car. Unmistakable design, exceptional performance.",
            price: "From $115,000"
        },
        {
            name: "Taycan",
            tagline: "SOUL, ELECTRIFIED",
            videoUrl: cTaycan,
            specs: {
                power: "402-750 HP",
                acceleration: "2.6-5.1 sec 0-60 mph",
                topSpeed: "162-175 mph",
                fuelType: "Electric"
            },
            description: "The first purely electric Porsche. Performance that takes your breath away.",
            price: "From $103,800"
        },
        {
            name: "Panamera",
            tagline: "FOUR DOORS, PURE PORSCHE",
            videoUrl: cPanamera,
            specs: {
                power: "325-630 HP",
                acceleration: "3.1-5.6 sec 0-60 mph",
                topSpeed: "168-196 mph",
                fuelType: "Gasoline / Hybrid"
            },
            description: "The sports car for four. Business in the front, party in the back.",
            price: "From $91,700"
        },
        {
            name: "Macan",
            tagline: "COMPACT SUV, MAXIMUM PORSCHE",
            videoUrl: cMacan,
            specs: {
                power: "265-434 HP",
                acceleration: "4.6-6.1 sec 0-60 mph",
                topSpeed: "144-177 mph",
                fuelType: "Gasoline / Electric"
            },
            description: "The sports car of compact SUVs. Agile, dynamic, unmistakably Porsche.",
            price: "From $59,600"
        },
        {
            name: "Cayenne",
            tagline: "PERFORMANCE MEETS VERSATILITY",
            videoUrl: cCayenne,
            specs: {
                power: "335-631 HP",
                acceleration: "3.6-6.1 sec 0-60 mph",
                topSpeed: "156-183 mph",
                fuelType: "Gasoline / Hybrid"
            },
            description: "The SUV that changed everything. Porsche performance for the whole family.",
            price: "From $69,000"
        },
        {
            name: "718",
            tagline: "PURE DRIVING PASSION",
            videoUrl: c718,
            specs: {
                power: "300-493 HP",
                acceleration: "3.4-5.0 sec 0-60 mph",
                topSpeed: "163-196 mph",
                fuelType: "Gasoline"
            },
            description: "Mid-engine perfection. Boxster convertible and Cayman coupe.",
            price: "From $62,600"
        }
    ];

    const nextModel = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentModel((prev) => (prev + 1) % models.length);
        setTimeout(() => setIsTransitioning(false), 1000);
    };

    const prevModel = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentModel((prev) => (prev - 1 + models.length) % models.length);
        setTimeout(() => setIsTransitioning(false), 1000);
    };

    const handleDiscoverAll = () => {
        setShowAllModels(true);
        const cards = document.querySelectorAll('.model-card-grid');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.15}s`;
        });
    };

    const handleBackToSlider = () => {
        setShowAllModels(false);
    };

    const handleModelSelect = (index) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentModel(index);
        setTimeout(() => setIsTransitioning(false), 1000);
    };

    useEffect(() => {
        if (showAllModels) return;
        const interval = setInterval(() => {
            nextModel();
        }, 8000);
        return () => clearInterval(interval);
    }, [showAllModels, isTransitioning]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') nextModel();
            if (e.key === 'ArrowLeft') prevModel();
            if (e.key === 'Escape' && showAllModels) handleBackToSlider();
            if (e.key === ' ') {
                e.preventDefault();
                showAllModels ? handleBackToSlider() : handleDiscoverAll();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showAllModels, isTransitioning]);

    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (video) {
                if (index === currentModel) {
                    video.play().catch(() => {
                        video.src = "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4";
                    });
                } else {
                    video.pause();
                }
            }
        });
    }, [currentModel]);

    return (
        <div className="porsche-app">
            {/* Slider section */}
            <div className={`slider-section ${showAllModels ? 'slide-out' : ''}`}>
                <div className="fullscreen-video-container">
                    {models.map((model, index) => (
                        <div
                            key={model.name}
                            className={`fullscreen-video ${index === currentModel ? 'active' : ''} ${isTransitioning ? 'transitioning' : ''}`}
                        >
                            <video
                                ref={(el) => videoRefs.current[index] = el}
                                autoPlay muted loop playsInline
                                src={model.videoUrl}
                                onError={(e) => e.target.src = "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"}
                            />
                            <div className="video-overlay-gradient"></div>
                        </div>
                    ))}

                    {/* Overlay content */}
                    <div className="overlay-content">
                        {/* Navbar */}
                        <div className="top-nav">
                            <div className="logo">PORSCHE</div>
                            <div className="nav-links">
                                <span>Models</span>
                                <span>Configure</span>
                                <span>Dealers</span>
                                <span>About</span>
                            </div>
                        </div>

                        {/* Hero Content */}
                        <div className="hero-content">
                            <div className="model-info-overlay">
                                <h1 className="model-tagline-overlay">{models[currentModel].tagline}</h1>
                                <h2 className="model-name-overlay">{models[currentModel].name}</h2>
                                <p className="model-description-overlay">{models[currentModel].description}</p>
                                <div className="model-price">{models[currentModel].price}</div>
                                <div className="model-actions-overlay">
                                    <button className="btn-primary-overlay">CONFIGURE NOW</button>
                                    <button className="btn-secondary-overlay">LEARN MORE</button>
                                </div>
                            </div>

                            {/* Specs */}
                            <div className="specs-overlay">
                                <div className="spec-item-overlay">
                                    <span className="spec-label-overlay">Power</span>
                                    <span className="spec-value-overlay">{models[currentModel].specs.power}</span>
                                </div>
                                <div className="spec-item-overlay">
                                    <span className="spec-label-overlay">0-60 mph</span>
                                    <span className="spec-value-overlay">{models[currentModel].specs.acceleration}</span>
                                </div>
                                <div className="spec-item-overlay">
                                    <span className="spec-label-overlay">Top Speed</span>
                                    <span className="spec-value-overlay">{models[currentModel].specs.topSpeed}</span>
                                </div>
                                <div className="spec-item-overlay">
                                    <span className="spec-label-overlay">Fuel Type</span>
                                    <span className="spec-value-overlay">{models[currentModel].specs.fuelType}</span>
                                </div>
                            </div>
                        </div>

                        {/* Slider controls */}
                        <div className="bottom-controls">
                            <button className="carousel-btn-overlay prev" onClick={prevModel} disabled={isTransitioning}>
                                <svg width="24" height="24" viewBox="0 0 24 24"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" /></svg>
                            </button>

                            <div className="model-indicators-overlay">
                                {models.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`indicator-overlay ${index === currentModel ? 'active' : ''}`}
                                        onClick={() => handleModelSelect(index)}
                                        disabled={isTransitioning}
                                    />
                                ))}
                            </div>

                            <button className="carousel-btn-overlay next" onClick={nextModel} disabled={isTransitioning}>
                                <svg width="24" height="24" viewBox="0 0 24 24"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" /></svg>
                            </button>
                        </div>

                        <div className="discover-btn-container">
                            <button className="discover-all-models" onClick={handleDiscoverAll}>
                                <span className="discover-text">DISCOVER ALL MODELS</span>
                                <svg width="20" height="20" viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid view */}
            <div className={`models-grid-section ${showAllModels ? 'slide-in' : ''}`}>
                <div className="grid-header">
                    <button className="back-btn" onClick={handleBackToSlider}>
                        <svg width="24" height="24" viewBox="0 0 24 24"><path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" /></svg>
                        Back
                    </button>
                    <h1 className="grid-title">All Porsche Models</h1>
                    <div className="grid-subtitle">Choose your perfect Porsche</div>
                </div>

                <div className="models-grid-container">
                    {models.map((model, index) => (
                        <div key={model.name} className="model-card-grid" style={{ animationDelay: `${index * 0.15}s` }}>
                            <div className="model-card-inner">
                                <div className="model-card-video">
                                    <video
                                        autoPlay muted loop playsInline
                                        src={model.videoUrl}
                                        onError={(e) => e.target.src = "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"}
                                    />
                                    <div className="card-overlay">
                                        <div className="card-hover-overlay"></div>
                                        <div className="card-content">
                                            <div className="card-content-inner">
                                                <h3 className="card-title">{model.name}</h3>
                                                <p className="card-tagline">{model.tagline}</p>
                                                <div className="card-price">{model.price}</div>
                                                <div className="card-specs">
                                                    <div className="card-spec">
                                                        <span className="card-spec-label">Power</span>
                                                        <span className="card-spec-value">{model.specs.power}</span>
                                                    </div>
                                                    <div className="card-spec">
                                                        <span className="card-spec-label">0-60 mph</span>
                                                        <span className="card-spec-value">{model.specs.acceleration}</span>
                                                    </div>
                                                </div>
                                                <div className="card-actions">
                                                    <button className="btn-card-primary">Configure</button>
                                                    <button className="btn-card-secondary">Learn More</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Models;
