import React, { useState } from 'react';
import './SolarEnergyManager.css';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Schedule from './Schedule';
import AIDesign from './AIDesign';
import { Card, Button } from '../WasteManagement/components/Shared';

// --- Icon Components (Simplified - reusing from existing files if possible, or keeping local if unique) ---
// Since the other files use Icons from '../WasteManagement/Icons', we should probably try to align.
// However, to keep this standalone component simple and matching the visual style defined in CSS which might rely on specific SVG structures,
// I will import the Icons from WasteManagement if they match, or keep these if they are custom.
// Looking at the file, these SVGs are standard Lucide-style.
// Let's import Icons from WasteManagement to be consistent with the other components we are importing.
import { Icons } from '../WasteManagement/Icons';

// --- Sub-Pages are now imported ---

const SolarEnergyManager = ({ onClose }) => {
  const [currentPage, setCurrentPage] = useState('Dashboard');
  // Note: Analytics now manages its own state, so we don't need to lift it up unless we want to persist it across tab switches.
  // For this refactor, we will let Analytics manage its own state to match the routed behavior.

  const navigationItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: Icons.Home },
    { id: 'Analytics', label: 'ROI Calculator', icon: Icons.Analytics },
    { id: 'Schedule', label: 'Schedule Install', icon: Icons.Calendar },
    { id: 'AIDesign', label: 'AI Design', icon: Icons.Sun },
    { id: 'Settings', label: 'Settings', icon: Icons.Settings }
  ];

  const renderPageContent = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Analytics':
        return <Analytics />;
      case 'Schedule':
        return <Schedule />;
      case 'AIDesign':
        return <AIDesign />;
      case 'Settings':
        return <div className="page-container"><div className="page-header"><h1 className="page-title">Settings</h1><p>Coming soon.</p></div></div>;
      default:
        return <Dashboard />;
    }
  };

  const Sidebar = () => (
    <aside className="solar-sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">☀️</span>
          <span className="logo-text">Solar Path</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navigationItems.map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`sidebar-nav-item ${currentPage === item.id ? 'sidebar-nav-item--active' : ''}`}
          >
            <item.icon />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <Button variant="close" onClick={onClose} className="solar-btn--close">
          Close Solar Manager
        </Button>
      </div>
    </aside>
  );

  return (
    <div className="solar-app-container">
      {/* Desktop Layout */}
      <div className="desktop-layout">
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div className="solar-topbar">
            <span className="topbar-status">STATUS: Live Data Feed 🟢</span>
          </div>
          <main style={{ flex: 1, overflow: 'auto' }}>
            {renderPageContent()}
          </main>
        </div>
      </div>

      {/* Mobile Layout (simplified) */}
      <div className="mobile-layout">
        <header className="mobile-header">
          <Button onClick={onClose} variant="secondary">← Back</Button>
          <h1 className="mobile-title">Solar Path</h1>
        </header>
        <main style={{ flex: 1, overflow: 'auto' }}>
          {renderPageContent()}
        </main>
        {/* A simple mobile nav for demo */}
        <nav className="mobile-bottom-nav">
          {navigationItems.map(item => (
            <button key={item.id} onClick={() => setCurrentPage(item.id)} className={`mobile-nav-item ${currentPage === item.id ? 'mobile-nav-item--active' : ''}`}>
              <item.icon />
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SolarEnergyManager;
