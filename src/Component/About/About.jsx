import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronRight, History, Zap, Rocket, ArrowRight, Play, Pause, Volume2, VolumeX, TrendingUp, Award, Users, Globe, Cpu, Battery, Leaf, Car, Trophy, Clock, Star, Shield, Target, Lightbulb, Gauge, Wrench, Heart } from 'lucide-react';
import './About.css';
import history from './old.jpg';
import old from './history.jpg';
import new1 from './new.jpg';
import carblue from './carblue.jpg';

const About = () => {
    const [selectedSection, setSelectedSection] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [activeSection, setActiveSection] = useState(0);
    const [hoveredSection, setHoveredSection] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [isAnimating, setIsAnimating] = useState(false);
    const [statsAnimation, setStatsAnimation] = useState(false);
    const [timelineProgress, setTimelineProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const sectionsRef = useRef(null);
    const [sectionsInView, setSectionsInView] = useState(false);
    const intervalRef = useRef(null);

    const sections = [
        {
            id: 'past',
            title: 'HERITAGE',
            subtitle: 'Legacy of Excellence',
            year: '1931 - 1990',
            content: `Since 1931, Porsche has embodied the very essence of automotive perfection. Born from Ferdinand Porsche's visionary genius in Stuttgart, our legacy began with an unwavering commitment to engineering excellence that would forever change the landscape of sports cars.

From the revolutionary 356 that established our foundation to the legendary 911 that became the benchmark of sports car design, every Porsche carries the DNA of racing champions. Our victories at Le Mans, Daytona, and the Nürburgring aren't just trophies on a shelf – they're the crucible in which every road car is forged.

The craftsmanship that began in a modest workshop has evolved into a global standard of excellence. Each curve speaks of wind tunnel precision, every detail reflects decades of racing heritage, and every innovation carries the weight of our storied past while pointing toward tomorrow's unlimited possibilities.`,
            image: history,
            color: '#d4af37',
            icon: History,
            accent: 'Classic Excellence',
            highlights: [
                'Founded by Ferdinand Porsche in 1931',
                'Iconic 356 & 911 models established our legacy',
                'Multiple Le Mans victories',
                'Racing DNA in every vehicle'
            ],
            timeline: [
                { year: '1931', event: 'Porsche founded by Ferdinand Porsche', icon: Star },
                { year: '1948', event: 'First Porsche 356 prototype', icon: Car },
                { year: '1963', event: 'Legendary 911 introduction', icon: Trophy },
                { year: '1970', event: 'First Le Mans victory', icon: Award },
                { year: '1975', event: 'Turbo technology breakthrough', icon: Zap },
                { year: '1988', event: 'Introduction of all-wheel drive', icon: Wrench }
            ],
            stats: [
                { label: 'Years of Excellence', value: '93', icon: Clock },
                { label: 'Le Mans Victories', value: '19', icon: Trophy },
                { label: 'Countries Worldwide', value: '100+', icon: Globe },
                { label: 'Models Produced', value: '1.3M+', icon: Car }
            ],
            innovations: [
                {
                    title: 'Air-Cooled Engineering',
                    description: 'Revolutionary rear-engine, air-cooled design that defined sports car performance',
                    icon: Gauge,
                    impact: 'Set the foundation for all future Porsche models'
                },
                {
                    title: 'Monocoque Construction',
                    description: 'Lightweight, rigid body construction for optimal performance and safety',
                    icon: Shield,
                    impact: 'Influenced modern automotive manufacturing standards'
                },
                {
                    title: 'Racing Heritage',
                    description: 'Direct transfer of racing technology to road cars',
                    icon: Trophy,
                    impact: 'Created the ultimate sports car driving experience'
                }
            ],
            gallery: [
                { src: history, caption: 'Ferdinand Porsche in his workshop', type: 'image' },
                { src: old, caption: 'The legendary 356 prototype', type: 'image' },
                { src: new1, caption: 'Early 911 development', type: 'image' }
            ]
        },
        {
            id: 'present',
            title: 'INNOVATION',
            subtitle: 'Current Excellence',
            year: '1990 - 2025',
            content: `Today, Porsche stands as the pinnacle of automotive innovation, where our racing DNA meets cutting-edge technology in perfect harmony. Our current lineup represents not just vehicles, but masterpieces of German engineering that define the future of performance luxury.

The timeless 911 continues to evolve, each generation building upon 60 years of perfection. The revolutionary Taycan proves that electrification enhances rather than compromises the Porsche experience. From the versatile Macan to the commanding Cayenne, every model embodies our commitment to performance without compromise.

We're pioneering sustainable luxury, proving that environmental responsibility and heart-pounding performance can coexist beautifully. Our manufacturing facilities blend time-honored craftsmanship with state-of-the-art technology, ensuring every vehicle meets our exacting standards while respecting our planet.`,
            image: new1,
            color: '#2c5aa0',
            icon: Zap,
            accent: 'Performance Today',
            highlights: [
                'Electric Taycan revolutionary performance',
                'Hybrid technology integration',
                'Carbon neutral manufacturing goal',
                'Advanced driver assistance systems'
            ],
            timeline: [
                { year: '1995', event: 'First Boxster introduction', icon: Car },
                { year: '2002', event: 'Cayenne SUV launch', icon: Wrench },
                { year: '2009', event: 'Panamera grand tourer debut', icon: Star },
                { year: '2014', event: 'Macan compact SUV', icon: Target },
                { year: '2019', event: 'Taycan electric revolution', icon: Battery },
                { year: '2024', event: 'AI-enhanced driving systems', icon: Cpu }
            ],
            stats: [
                { label: 'Electric Range (Taycan)', value: '484km', icon: Battery },
                { label: 'CO2 Reduction', value: '75%', icon: Leaf },
                { label: 'Current Models', value: '8', icon: Car },
                { label: 'Production Facilities', value: '12', icon: Globe }
            ],
            innovations: [
                {
                    title: 'Electric Performance',
                    description: 'Taycan delivers 761 HP with instant torque and soul-stirring acceleration',
                    icon: Battery,
                    impact: 'Redefined what electric sports cars can achieve'
                },
                {
                    title: 'Sustainable Manufacturing',
                    description: 'Carbon-neutral production with renewable energy and recycled materials',
                    icon: Leaf,
                    impact: 'Leading the industry toward environmental responsibility'
                },
                {
                    title: 'Digital Integration',
                    description: 'Seamless connectivity with advanced infotainment and driver assistance',
                    icon: Cpu,
                    impact: 'Enhanced driving experience while maintaining pure performance'
                }
            ],
            gallery: [
                { src: new1, caption: 'Taycan in production', type: 'image' },
                { src: carblue, caption: 'Hybrid technology showcase', type: 'image' },
                { src: history, caption: 'Sustainable manufacturing', type: 'image' }
            ]
        },
        {
            id: 'future',
            title: 'VISION',
            subtitle: 'Tomorrow\'s Legend',
            year: '2025 & Beyond',
            content: `The future of Porsche is electric, connected, and more exhilarating than ever imagined. Our vision transcends traditional automotive boundaries, embracing electrification while intensifying the emotional connection that defines the Porsche experience.

We're pioneering synthetic fuels that could revolutionize combustion engines, developing autonomous driving technologies that enhance rather than replace the joy of driving, and creating digital ecosystems that seamlessly integrate with every aspect of the modern lifestyle.

Our research into next-generation battery technologies, quantum computing applications, and sustainable materials science positions us at the forefront of automotive evolution. The Porsche of tomorrow will be faster, smarter, and more connected than ever before, while maintaining the visceral thrill that has defined our brand for over 90 years.`,
            image: carblue,
            color: '#6c5ce7',
            icon: Rocket,
            accent: 'Tomorrow\'s Legend',
            highlights: [
                'Synthetic fuel technology development',
                'AI-enhanced driving experience',
                'Quantum computing applications',
                'Sustainable luxury materials'
            ],
            timeline: [
                { year: '2025', event: 'Next-gen battery technology', icon: Battery },
                { year: '2027', event: 'Autonomous driving Level 4', icon: Cpu },
                { year: '2030', event: 'Synthetic fuel integration', icon: Leaf },
                { year: '2032', event: 'Quantum computing systems', icon: Lightbulb },
                { year: '2035', event: 'Neural interface technology', icon: Heart },
                { year: '2040', event: 'Sustainable materials revolution', icon: Shield }
            ],
            stats: [
                { label: 'Battery Range Goal', value: '800km', icon: Battery },
                { label: 'Charging Time Target', value: '5min', icon: Zap },
                { label: 'AI Processing Power', value: '1000x', icon: Cpu },
                { label: 'Carbon Negative', value: '2035', icon: Leaf }
            ],
            innovations: [
                {
                    title: 'Synthetic Fuels',
                    description: 'Carbon-neutral synthetic fuels preserving combustion engine heritage',
                    icon: Leaf,
                    impact: 'Extending classic Porsche experience sustainably'
                },
                {
                    title: 'Quantum Computing',
                    description: 'Advanced AI systems for predictive performance and maintenance',
                    icon: Lightbulb,
                    impact: 'Revolutionizing vehicle intelligence and user experience'
                },
                {
                    title: 'Neural Integration',
                    description: 'Direct neural interface for ultimate driver-vehicle connection',
                    icon: Heart,
                    impact: 'Creating the most intuitive driving experience ever imagined'
                }
            ],
            gallery: [
                { src: carblue, caption: 'Future concept vehicle', type: 'image' },
                { src: new1, caption: 'Advanced materials lab', type: 'image' },
                { src: history, caption: 'Quantum computing research', type: 'image' }
            ]
        }
    ];

    const openFullscreen = (section) => {
        setSelectedSection(section);
        setIsFullscreen(true);
        setActiveTab('overview');
        setCurrentSlide(0);
        setStatsAnimation(true);
        document.body.style.overflow = 'hidden';
    };

    const closeFullscreen = () => {
        setIsFullscreen(false);
        setSelectedSection(null);
        setActiveTab('overview');
        setStatsAnimation(false);
        setIsPlaying(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        document.body.style.overflow = 'auto';
    };

    const handleSectionClick = (section, index) => {
        setActiveSection(index);
        openFullscreen(section);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        if (!isPlaying) {
            intervalRef.current = setInterval(() => {
                setTimelineProgress(prev => (prev + 1) % 100);
            }, 100);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
    };

    const nextSlide = () => {
        if (selectedSection) {
            setCurrentSlide((prev) => (prev + 1) % selectedSection.gallery.length);
        }
    };

    const prevSlide = () => {
        if (selectedSection) {
            setCurrentSlide((prev) => (prev - 1 + selectedSection.gallery.length) % selectedSection.gallery.length);
        }
    };

    useEffect(() => {
        if (isFullscreen && selectedSection) {
            const timer = setTimeout(() => {
                setStatsAnimation(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isFullscreen, selectedSection]);

    useEffect(() => {
        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.target === sectionsRef.current) {
                    setSectionsInView(entry.isIntersecting);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        });

        if (sectionsRef.current) {
            observer.observe(sectionsRef.current);
        }

        return () => {
            observer.disconnect();
            document.body.style.overflow = 'auto';
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const getSectionStyle = (index) => {
        const baseDelay = index * 0.2;
        const translateDistance = 60;

        if (!sectionsInView) {
            return {
                transform: `translateY(${translateDistance}px)`,
                opacity: 0,
                transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${baseDelay}s`
            };
        }

        return {
            transform: 'translateY(0)',
            opacity: 1,
            transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${baseDelay}s`
        };
    };

    const renderTabContent = () => {
        if (!selectedSection) return null;

        switch (activeTab) {
            case 'overview':
                return (
                    <div className="about-modal-overview">
                        <div className="about-modal-prose">
                            {selectedSection.content.split('\n\n').map((paragraph, index) => (
                                <p key={index} className="about-modal-paragraph">
                                    {paragraph.trim()}
                                </p>
                            ))}
                        </div>
                    </div>
                );

            case 'timeline':
                return (
                    <div className="about-modal-timeline">
                        <div className="timeline-controls">
                            <button onClick={togglePlay} className="timeline-play-btn">
                                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                            </button>
                            <div className="timeline-progress">
                                <div
                                    className="timeline-progress-bar"
                                    style={{ width: `${timelineProgress}%` }}
                                />
                            </div>
                            <button onClick={() => setIsMuted(!isMuted)} className="timeline-sound-btn">
                                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            </button>
                        </div>

                        <div className="timeline-events">
                            {selectedSection.timeline.map((event, index) => {
                                const IconComponent = event.icon;
                                return (
                                    <div key={index} className="timeline-event">
                                        <div className="timeline-event-icon" style={{ backgroundColor: selectedSection.color }}>
                                            <IconComponent size={16} />
                                        </div>
                                        <div className="timeline-event-content">
                                            <div className="timeline-event-year" style={{ color: selectedSection.color }}>
                                                {event.year}
                                            </div>
                                            <div className="timeline-event-description">
                                                {event.event}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );

            case 'stats':
                return (
                    <div className="about-modal-stats">
                        <div className="stats-grid">
                            {selectedSection.stats.map((stat, index) => {
                                const IconComponent = stat.icon;
                                return (
                                    <div key={index} className={`stat-card ${statsAnimation ? 'animate' : ''}`}>
                                        <div className="stat-icon" style={{ color: selectedSection.color }}>
                                            <IconComponent size={24} />
                                        </div>
                                        <div className="stat-value" style={{ color: selectedSection.color }}>
                                            {stat.value}
                                        </div>
                                        <div className="stat-label">
                                            {stat.label}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );

            case 'innovations':
                return (
                    <div className="about-modal-innovations">
                        {selectedSection.innovations.map((innovation, index) => {
                            const IconComponent = innovation.icon;
                            return (
                                <div key={index} className="innovation-card">
                                    <div className="innovation-icon" style={{ color: selectedSection.color }}>
                                        <IconComponent size={32} />
                                    </div>
                                    <div className="innovation-content">
                                        <h3 className="innovation-title" style={{ color: selectedSection.color }}>
                                            {innovation.title}
                                        </h3>
                                        <p className="innovation-description">
                                            {innovation.description}
                                        </p>
                                        <div className="innovation-impact">
                                            <strong>Impact:</strong> {innovation.impact}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );

            case 'gallery':
                return (
                    <div className="about-modal-gallery">
                        <div className="gallery-main">
                            <div className="gallery-slide">
                                <img
                                    src={selectedSection.gallery[currentSlide].src}
                                    alt={selectedSection.gallery[currentSlide].caption}
                                    className="gallery-image"
                                />
                                <div className="gallery-caption">
                                    {selectedSection.gallery[currentSlide].caption}
                                </div>
                            </div>

                            <div className="gallery-controls">
                                <button onClick={prevSlide} className="gallery-btn">
                                    <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} />
                                </button>
                                <div className="gallery-dots">
                                    {selectedSection.gallery.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentSlide(index)}
                                            className={`gallery-dot ${index === currentSlide ? 'active' : ''}`}
                                            style={{ backgroundColor: index === currentSlide ? selectedSection.color : 'rgba(255,255,255,0.3)' }}
                                        />
                                    ))}
                                </div>
                                <button onClick={nextSlide} className="gallery-btn">
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    // Discover section data
    const discoverItems = [
        {
            id: 'design',
            title: 'Design Philosophy',
            image: old
        },
        {
            id: 'performance',
            title: 'Performance DNA',
            image: new1
        },
        {
            id: 'sustainability',
            title: 'Sustainability',
            image: carblue
        }
    ];

    return (
        <div className="about-container">
            <div
                className="about-bg-image"
                style={{
                    backgroundImage: `url('${old}')`
                }}
            />

            <div className="about-overlay" />

            <div className="about-content">
                <div className="about-header">
                    <div className="about-brand-container">
                        <h1 className="about-brand-title">PORSCHE</h1>
                        <div className="about-brand-line"></div>
                    </div>
                    <p className="about-subtitle">
                        Engineering Excellence Through Time
                    </p>
                </div>

                <div ref={sectionsRef} className="about-sections">
                    {sections.map((section, index) => {
                        const IconComponent = section.icon;
                        const isHovered = hoveredSection === index;
                        const isActive = activeSection === index;

                        return (
                            <div
                                key={section.id}
                                className={`about-section ${isActive ? 'active' : ''} ${isHovered ? 'hovered' : ''}`}
                                style={getSectionStyle(index)}
                                onClick={() => handleSectionClick(section, index)}
                                onMouseEnter={() => {
                                    setHoveredSection(index);
                                    setActiveSection(index);
                                }}
                                onMouseLeave={() => setHoveredSection(null)}
                            >
                                <div className="about-section-inner">
                                    <div className="about-section-number" style={{ color: section.color }}>
                                        {String(index + 1).padStart(2, '0')}
                                    </div>

                                    <div className="about-section-icon" style={{ color: section.color }}>
                                        <IconComponent size={28} />
                                    </div>

                                    <div
                                        className="about-section-bg"
                                        style={{ backgroundImage: `url(${section.image})` }}
                                    />

                                    <div
                                        className="about-section-color-overlay"
                                        style={{ backgroundColor: section.color }}
                                    />

                                    <div className="about-section-content">
                                        <div className="about-section-year" style={{ color: section.color }}>
                                            {section.year}
                                        </div>
                                        <h2 className="about-section-title">
                                            {section.title}
                                        </h2>
                                        <p className="about-section-subtitle">
                                            {section.subtitle}
                                        </p>

                                        <div className="about-section-highlights">
                                            {section.highlights.slice(0, 2).map((highlight, idx) => (
                                                <div key={idx} className="about-section-highlight">
                                                    <ChevronRight size={12} style={{ color: section.color }} />
                                                    <span>{highlight}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="about-section-cta" style={{ borderColor: section.color, color: section.color }}>
                                            <span>Explore Journey</span>
                                            <ArrowRight size={16} className="about-section-arrow" />
                                        </div>
                                    </div>

                                    <div
                                        className="about-section-border"
                                        style={{ borderColor: section.color }}
                                    />

                                    <div className="about-section-hover-effect" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {isFullscreen && selectedSection && (
                <div className="about-modal">
                    <button onClick={closeFullscreen} className="about-modal-close">
                        <X size={24} />
                    </button>

                    <div className="about-modal-content">
                        <div className="about-modal-image-container">
                            <img
                                src={selectedSection.image}
                                alt={selectedSection.title}
                                className="about-modal-image"
                            />
                            <div className="about-modal-image-overlay" />
                        </div>

                        <div className="about-modal-text">
                            <div className="about-modal-header">
                                <div className="about-modal-year" style={{ color: selectedSection.color }}>
                                    {selectedSection.year}
                                </div>
                                <h2 className="about-modal-title" style={{ color: selectedSection.color }}>
                                    {selectedSection.title}
                                </h2>
                                <p className="about-modal-subtitle">
                                    {selectedSection.subtitle}
                                </p>
                            </div>

                            <div className="about-modal-tabs">
                                {[
                                    { id: 'overview', label: 'Overview', icon: History },
                                    { id: 'timeline', label: 'Timeline', icon: Clock },
                                    { id: 'stats', label: 'Statistics', icon: TrendingUp },
                                    { id: 'innovations', label: 'Innovations', icon: Lightbulb },
                                    { id: 'gallery', label: 'Gallery', icon: Star }
                                ].map((tab) => {
                                    const TabIcon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`about-modal-tab ${activeTab === tab.id ? 'active' : ''}`}
                                            style={{
                                                color: activeTab === tab.id ? selectedSection.color : 'rgba(255,255,255,0.7)',
                                                borderBottomColor: activeTab === tab.id ? selectedSection.color : 'transparent'
                                            }}
                                        >
                                            <TabIcon size={16} />
                                            <span>{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="about-modal-tab-content">
                                {renderTabContent()}
                            </div>
                        </div>
                    </div>
                </div>
            )}
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
                                                <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M7 7H17V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

export default About;