import React, { useState } from 'react';
import { Menu, User, Pause, Play } from 'lucide-react';
import './Background.css';
import car from './car.mp4';

const Background = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoRef, setVideoRef] = useState(null);

  const togglePlayPause = () => {
    if (videoRef) {
      if (isPlaying) {
        videoRef.pause();
      } else {
        videoRef.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="background-container">
      <video
        ref={setVideoRef}
        autoPlay
        muted
        className="background-video"
        playsInline
      >
        <source src={car} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="background-overlay"></div>

      {/* Header */}
      <div className="background-header">
        <div className="header-content">
          <button className="menu-button">
            <Menu className="menu-icon" />
            <span>Menu</span>
          </button>
          
          <div className="porsche-logo">
            PORSCHE
          </div>
          
          <User className="user-icon" />
        </div>
      </div>

      {/* Main Content */}
      <div className="background-content">
        <h1 className="background-title">
          Thrill of the<br />
          911.
        </h1>
        <a href="#" className="background-cta">
          Go to the new 911 4S models
        </a>
      </div>

      {/* Pause/Play Button */}
      <button className="pause-button" onClick={togglePlayPause}>
        {isPlaying ? (<Pause className="pause-icon" />) : (<Play className="pause-icon" />)}
      </button>
    </div>
  );
};

export default Background;