import React, { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';

const About = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const sections = [
    {
      id: 'past',
      title: 'PAST',
      subtitle: 'Heritage & Legacy',
      content: `Since 1931, Porsche has been synonymous with engineering excellence and racing pedigree. Founded by Ferdinand Porsche in Stuttgart, Germany, our journey began with a vision to create the perfect sports car. From the legendary 356 to the iconic 911, every Porsche tells a story of innovation, precision, and passion.

      Our racing heritage runs deep - from Le Mans victories to Formula 1 championships. Each triumph on the track has refined our understanding of performance, feeding directly into every road car we create. The pursuit of perfection has been our constant companion, driving us to push boundaries and redefine what's possible.

      The craftsmanship that began in a small workshop in Stuttgart has evolved into a global standard of excellence. Every curve, every detail, every innovation carries the weight of our heritage while pointing toward tomorrow's possibilities.`,
      image: '/api/placeholder/800/600'
    },
    {
      id: 'present',
      title: 'PRESENT',
      subtitle: 'Innovation & Excellence',
      content: `Today, Porsche stands at the forefront of automotive innovation, seamlessly blending our racing DNA with cutting-edge technology. Our current lineup represents the pinnacle of sports car engineering - from the timeless 911 to the revolutionary Taycan, our first fully electric sports car.

      We're not just building cars; we're crafting experiences. Each Porsche is a masterpiece of German engineering, where tradition meets innovation. Our manufacturing facilities combine time-honored craftsmanship with state-of-the-art technology, ensuring every vehicle meets our exacting standards.

      Sustainability drives our present-day vision. We're committed to carbon neutrality across our entire value chain by 2030, proving that environmental responsibility and performance excellence can coexist beautifully.`,
      image: '/api/placeholder/800/600'
    },
    {
      id: 'future',
      title: 'FUTURE',
      subtitle: 'Vision & Tomorrow',
      content: `The future of Porsche is electric, connected, and more thrilling than ever. Our vision extends beyond traditional automotive boundaries, embracing electrification without compromising the soul of what makes a Porsche truly exceptional.

      We're pioneering synthetic fuels, advancing autonomous driving technologies, and creating digital ecosystems that enhance every aspect of the driving experience. Our commitment to sustainability drives innovation in every direction - from carbon-neutral production to revolutionary battery technologies.

      The Porsche of tomorrow will be faster, smarter, and more connected than ever before, while maintaining the emotional connection that has defined our brand for over 90 years. We're not just building cars for the future; we're building the future itself.`,
      image: '/api/placeholder/800/600'
    }
  ];

  const openFullscreen = (section) => {
    setSelectedSection(section);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setSelectedSection(null);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url('/api/placeholder/1920/1080')`,
          filter: 'blur(1px)'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90" />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="text-center pt-16 pb-8">
          <div className="inline-block border border-white/30 px-8 py-2 mb-8">
            <h1 className="text-2xl font-light tracking-[0.3em] text-white">PORSCHE</h1>
          </div>
          <p className="text-lg font-light tracking-wide text-gray-300 max-w-2xl mx-auto px-4">
            Inspired, at the highest level, by engineering excellence and racing heritage.
          </p>
        </div>

        {/* Main Sections */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {sections.map((section) => (
              <div
                key={section.id}
                className="group relative cursor-pointer"
                onClick={() => openFullscreen(section)}
              >
                {/* Section Card */}
                <div className="relative overflow-hidden rounded-lg border border-white/20 bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all duration-700 hover:border-white/40">
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-700"
                    style={{ backgroundImage: `url(${section.image})` }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 p-8 h-80 flex flex-col justify-center items-center text-center">
                    <h2 className="text-3xl font-light tracking-[0.2em] mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                      {section.title}
                    </h2>
                    <p className="text-gray-300 text-sm tracking-wide mb-6 group-hover:text-white transition-colors duration-300">
                      {section.subtitle}
                    </p>
                    <div className="flex items-center text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">
                      <span className="text-sm tracking-wide mr-2">Explore</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Signature */}
        <div className="text-center pb-16">
          <div className="text-2xl font-script text-yellow-400 mb-4" style={{ fontFamily: 'cursive' }}>
            Ferdinand Porsche
          </div>
          <p className="text-xs text-gray-500 tracking-wide">
            © 2025 Porsche AG - Stuttgart, Germany
          </p>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && selectedSection && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-8 right-8 text-white hover:text-yellow-400 transition-colors duration-300 z-60"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Modal Content */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={selectedSection.image}
                alt={selectedSection.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-light tracking-[0.2em] text-yellow-400 mb-2">
                  {selectedSection.title}
                </h2>
                <p className="text-xl text-gray-300 tracking-wide">
                  {selectedSection.subtitle}
                </p>
              </div>
              
              <div className="prose prose-invert max-w-none">
                {selectedSection.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-300 leading-relaxed mb-4 text-lg">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
