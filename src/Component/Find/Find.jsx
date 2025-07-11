import React from 'react';
import './Find.css';
import porscheCar from './porsche-car.png';
import porscheCenter from './porsche-center.jpg';

const Find = () => {
  return (
    <div className="porsche-find-container">
      {/* First Section - Find Your Porsche Center */}
      <section className="porsche-center-section">
        <div className="content-wrapper">
          <div className="text-content">
            <h2 className="section-title"><b>Find Your Porsche Center</b></h2>
            <p className="section-description">
              A Porsche Center, and your dream Porsche vehicle, may be closer than you 
              think. Search our Porsche Center network for the location closest to you.
            </p>
            <button className="search-button">Search now</button>
          </div>
          <div className="image-content">
            <div className="porsche-center-image">
              <img 
                src={porscheCenter} 
                alt="Porsche Center with woman and dog"
                className="center-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Second Section - Find your new or pre-owned Porsche */}
      <section className="porsche-vehicles-section">
        <div className="vehicles-content-wrapper">
          <div className="vehicles-text-content">
            <h2 className="vehicles-section-title">Find your new or pre-owned Porsche.</h2>
            <p className="vehicles-section-description">
              Making it easy to find your dream Porsche. Enter your location and browse the best 
              car offers available near you.
            </p>
            <div className="search-container">
              <div className="search-input-wrapper">
                <div className="search-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Enter City or ZIP Code"
                  className="location-input"
                />
              </div>
            </div>
          </div>
          <div className="vehicles-image-content">
            <div className="porsche-car-image">
              <img 
                src={porscheCar} 
                alt="White Porsche sports car"
                className="car-img"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Find;
