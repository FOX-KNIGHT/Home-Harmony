import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Component/Header.jsx';
import Login from './Component/Login.jsx';
import Wastemanage from './Component/wastemanage.jsx';
import HouseholdChaos from './Component/HouseholdChaos.jsx';
import Queue from './Component/Queue/QueueApp.jsx';
import FamilyApp from './Component/family/FamilyApp.jsx';
import ComingSoon from './Component/ComingSoon.jsx';
import './App.css';

const clientId = '833368854512-s1er4vbhs3rromaj8j1mpvcdf5us549l.apps.googleusercontent.com';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isHouseholdChaosOpen, setIsHouseholdChaosOpen] = useState(false);
  const [isWasteManagementOpen, setIsWasteManagementOpen] = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isFamilyAppOpen, setIsFamilyAppOpen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const openHouseholdChaos = () => {
    setIsHouseholdChaosOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeHouseholdChaos = () => {
    setIsHouseholdChaosOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Back to Household Chaos functions
  const backToHouseholdChaos = () => {
    setIsWasteManagementOpen(false);
    setIsQueueOpen(false);
    setIsFamilyAppOpen(false);
    setIsComingSoonOpen(false);
    setIsHouseholdChaosOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const openComingSoon = () => {
    setIsHouseholdChaosOpen(false);
    setIsComingSoonOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeComingSoon = () => {
    setIsComingSoonOpen(false);
    document.body.style.overflow = 'unset';
  };

  const openWasteManagement = () => {
    setIsHouseholdChaosOpen(false);
    setIsWasteManagementOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeWasteManagement = () => {
    setIsWasteManagementOpen(false);
    document.body.style.overflow = 'unset';
  };

  const openQueue = () => {
    setIsHouseholdChaosOpen(false);
    setIsQueueOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeQueue = () => {
    setIsQueueOpen(false);
    document.body.style.overflow = 'unset';
  };

  const openFamilyApp = () => {
    setIsHouseholdChaosOpen(false);
    setIsFamilyAppOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFamilyApp = () => {
    setIsFamilyAppOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <div className="App">
          {/* Main Content - Hidden when full-screen modals are open */}
          {!isHouseholdChaosOpen && !isWasteManagementOpen && !isQueueOpen && !isFamilyAppOpen && !isComingSoonOpen && (
            <div className="main-content">
              <Header
                openLogin={openLogin}
                openHouseholdChaos={openHouseholdChaos}
              />

              {/* Login Modal */}
              {isLoginOpen && (
                <div className="login-overlay" onClick={closeLogin}>
                  <div className="login-container" onClick={(e) => e.stopPropagation()}>
                    <button className="close-button" onClick={closeLogin}>
                      Close
                    </button>
                    <Login />
                  </div>
                </div>
              )}

              <Routes>
                <Route path="/" element={<div />} />
              </Routes>
            </div>
          )}

          {/* Full Screen HouseholdChaos */}
          {isHouseholdChaosOpen && (
            <div className="fullscreen-modal">
              <HouseholdChaos
                onClose={closeHouseholdChaos}
                onOpenWasteManagement={openWasteManagement}
                onOpenQueue={openQueue}
                onOpenFamilyApp={openFamilyApp}
                onOpenComingSoon={openComingSoon}
              />
            </div>
          )}

          {/* Full Screen ComingSoon with Back to Household */}
          {isComingSoonOpen && (
            <div className="fullscreen-modal coming-soon-modal">
              <button
                className="fullscreen-back-btn coming-soon-back-btn"
                onClick={backToHouseholdChaos}
                title="Back to Home Harmony"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H6m0 0l6 6m-6-6l6-6"/>
                </svg>
                <span>Back to Services</span>
              </button>
              <button
                className="fullscreen-close-btn coming-soon-close-btn"
                onClick={closeComingSoon}
                title="Close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <div className="coming-soon-container">
                <ComingSoon />
              </div>
            </div>
          )}

          {/* Full Screen Queue with Back to Household */}
          {isQueueOpen && (
            <div className="fullscreen-modal queue-modal">
              <button
                className="fullscreen-back-btn queue-back-btn"
                onClick={backToHouseholdChaos}
                title="Back to Home Harmony"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H6m0 0l6 6m-6-6l6-6"/>
                </svg>
                <span>Back to Services</span>
              </button>
              <button
                className="fullscreen-close-btn queue-close-btn"
                onClick={closeQueue}
                title="Close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <div className="queue-container">
                <Queue />
              </div>
            </div>
          )}

          {/* Full Screen FamilyApp with Back to Household */}
          {isFamilyAppOpen && (
            <div className="fullscreen-modal familyapp-modal">
              <button
                className="fullscreen-back-btn familyapp-back-btn"
                onClick={backToHouseholdChaos}
                title="Back to Home Harmony"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H6m0 0l6 6m-6-6l6-6"/>
                </svg>
                <span>Back to Services</span>
              </button>
              <button
                className="fullscreen-close-btn familyapp-close-btn"
                onClick={closeFamilyApp}
                title="Close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <div className="familyapp-container">
                <FamilyApp />
              </div>
            </div>
          )}

          {/* Full Screen Waste Management with Back to Household */}
          {isWasteManagementOpen && (
            <div className="fullscreen-modal waste-management-modal">
              <button
                className="fullscreen-back-btn waste-back-btn"
                onClick={backToHouseholdChaos}
                title="Back to Home Harmony"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H6m0 0l6 6m-6-6l6-6"/>
                </svg>
                <span>Back to Services</span>
              </button>
              <button
                className="fullscreen-close-btn waste-close-btn"
                onClick={closeWasteManagement}
                title="Close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <div className="waste-management-container">
                <Wastemanage />
              </div>
            </div>
          )}
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;