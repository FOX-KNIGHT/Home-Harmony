import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import './WasteManage.css';
import { Icons } from './WasteManagement/Icons';
import { Sidebar } from './WasteManagement/Sidebar';
import { Modal, Button, Toast } from './WasteManagement/components/Shared';
import TopBar from './WasteManagement/TopBar';
import MobileHeader from './WasteManagement/MobileHeader';
import BottomNavigation from './WasteManagement/BottomNavigation';

// Navigation Items definition
const navigationItems = [
  { id: 'Home', label: 'Dashboard', icon: Icons.Home, path: '' }, // Relative path
  { id: 'Booking', label: 'Schedule', icon: Icons.Calendar, path: 'booking' },
  { id: 'Analytics', label: 'Analytics', icon: Icons.Analytics, path: 'analytics' },
  { id: 'Reports', label: 'Reports', icon: Icons.FileText, path: 'reports' },
  { id: 'WasteClassifier', label: 'AI Classifier', icon: Icons.Camera, path: 'waste-classifier' },
  { id: 'CarbonFootprint', label: 'Carbon Footprint', icon: Icons.Leaf, path: '/carbon-footprint' }, // Absolute path to route
  { id: 'Profile', label: 'Profile', icon: Icons.User, path: 'profile' }, // Added Profile to nav
  // { id: 'Admin', label: 'Admin', icon: Icons.Settings, path: 'admin' } // hidden or optional
];

const WasteManage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const location = useLocation();

  // Theme Management
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  // Mobile Booking Modal Component (Local)
  const BookingModal = () => (
    <Modal
      isOpen={isMobileModalOpen}
      onClose={() => setIsMobileModalOpen(false)}
      title="Quick Schedule"
      actions={
        <>
          <Button onClick={() => setIsMobileModalOpen(false)} variant="secondary">
            Cancel
          </Button>
          <Button onClick={() => {
            setIsMobileModalOpen(false);
            setToastMessage('Collection scheduled successfully!');
            setTimeout(() => setToastMessage(''), 4000);
          }}>
            Confirm
          </Button>
        </>
      }
    >
      <div className="modal-booking-content">
        <p className="modal-description">Select your preferred collection time:</p>
        <div className="time-slot-list">
          {[
            'Today, 2:00 PM - 5:00 PM',
            'Tomorrow, 9:00 AM - 12:00 PM',
            'Sept 17, 1:00 PM - 4:00 PM'
          ].map(slot => (
            <label key={slot} className="time-slot time-slot--modal">
              <input type="radio" name="modalTimeSlot" />
              <span className="slot-text">{slot}</span>
              <span className="slot-badge">Available</span>
            </label>
          ))}
        </div>
      </div>
    </Modal>
  );



  return (
    <div className="app-container">
      {/* Desktop Layout */}
      <div className="desktop-layout">
        <Sidebar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} navigationItems={navigationItems} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <TopBar />
          <main style={{ flex: 1, overflow: 'auto' }}>
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="mobile-layout">
        <MobileHeader
          isNavOpen={isNavOpen}
          setIsNavOpen={setIsNavOpen}
          navigationItems={navigationItems}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
        <main style={{ flex: 1, overflow: 'auto', paddingBottom: '5rem' }}>
          <Outlet />
        </main>
        <BottomNavigation
          navigationItems={navigationItems}
          onFabClick={() => setIsMobileModalOpen(true)}
        />
      </div>

      <BookingModal />
      <Toast message={toastMessage} />
    </div>
  );
};

export default WasteManage;