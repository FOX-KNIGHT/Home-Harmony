import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './wastemanage.css';
// Icon Components
const Icons = {
  Bell: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  ),
  Search: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="M21 21l-4.35-4.35"></path>
    </svg>
  ),
  Menu: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  ),
  Close: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  Plus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  Home: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9,22 9,12 15,12 15,22"></polyline>
    </svg>
  ),
  Calendar: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  ),
  Analytics: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
    </svg>
  ),
  FileText: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14,2H6a2,2,0,0,0-2,2V20a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V8Z"></path>
      <polyline points="14,2 14,8 20,8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10,9 9,9 8,9"></polyline>
    </svg>
  ),
  Settings: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4,15a1.65,1.65,0,0,0,.33,1.82l.06.06a2,2,0,0,1,0,2.83,2,2,0,0,1-2.83,0l-.06-.06a1.65,1.65,0,0,0-1.82-.33,1.65,1.65,0,0,0-1,1.51V21a2,2,0,0,1-2,2,2,2,0,0,1-2-2v-.09A1.65,1.65,0,0,0,9,19.4a1.65,1.65,0,0,0-1.82.33l-.06.06a2,2,0,0,1-2.83,0,2,2,0,0,1,0-2.83l.06-.06a1.65,1.65,0,0,0,.33-1.82,1.65,1.65,0,0,0-1.51-1H3a2,2,0,0,1-2-2,2,2,0,0,1,2-2h.09A1.65,1.65,0,0,0,4.6,9a1.65,1.65,0,0,0-.33-1.82L4.21,7.11a2,2,0,0,1,0-2.83,2,2,0,0,1,2.83,0L7.11,4.34A1.65,1.65,0,0,0,9,4.6a1.65,1.65,0,0,0,1-1.51V3a2,2,0,0,1,2-2,2,2,0,0,1,2,2v.09a1.65,1.65,0,0,0,1,1.51,1.65,1.65,0,0,0,1.82-.33l.06-.06a2,2,0,0,1,2.83,0,2,2,0,0,1,0,2.83L19.65,7.11A1.65,1.65,0,0,0,19.4,9a1.65,1.65,0,0,0,1.51,1H21a2,2,0,0,1,2,2,2,2,0,0,1-2,2h-.09A1.65,1.65,0,0,0,19.4,15Z"></path>
    </svg>
  ),
  User: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  ),
  Camera: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
      <circle cx="12" cy="13" r="4"></circle>
    </svg>
  ),
  ChevronLeft: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="15,18 9,12 15,6"></polyline>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="9,18 15,12 9,6"></polyline>
    </svg>
  ),
  MapPin: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  ),
  Leaf: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M11 20A7 7 0 0 1 9.8 6.2C10.5 5.2 13 4 13 4s1.6 3.8 2 8c-.6 1-3.6 2-3.6 2s-1.5 2.5-1 4.2z"></path>
      <path d="M15.4 7c.3.5.7 1 1.2 1.5.3.3 0 .7 0 1 0 .2.2.4.5.5C18 10 20 12 20 12c1 1.8 1.4 3.9 1 6.2C20.5 19 19 20 18 20.3s-2.8-.7-3.6-2.5c-.8-1.8-1.7-4-1-5.5.7-1.5 1.5-2.7 2.3-3.6z"></path>
    </svg>
  ),
  Target: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="6"></circle>
      <circle cx="12" cy="12" r="2"></circle>
    </svg>
  )
};

// Utility function to get a formatted date string for a given offset
const getFormattedDate = (offset = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// Utility function to get the current month and year for calendar display
const getCurrentMonthYear = (date) => {
  const options = { month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// Utility function to get the current time (for map location timestamp)
const getFormattedTime = () => {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};


const wastemanage = () => {
  // State Management
  const [currentPage, setCurrentPage] = useState('Home');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [currentMobileCard, setCurrentMobileCard] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  // New State for Booking Date (automatically updates to tomorrow by default)
  const [selectedBookingDate, setSelectedBookingDate] = useState(getFormattedDate(1));
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());

  // New State for Map/GPS (Simulated Live Data)
  const [currentLocation, setCurrentLocation] = useState({
    lat: 19.0760, // Simulated Mumbai lat
    lng: 72.8777, // Simulated Mumbai lng
    accuracy: 'High',
    lastUpdated: getFormattedTime()
  });

  // Gemini API states
  const [reportPrompt, setReportPrompt] = useState('');
  const [reportResponse, setReportResponse] = useState('');
  const [isReportLoading, setIsReportLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageResult, setImageResult] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(false);

  // API Configuration (Placeholder)
  const API_KEY = ""; 
  const API_URL_TEXT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;
  const API_URL_IMAGE = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;

  const navigationItems = [
    { id: 'Home', label: 'Dashboard', icon: Icons.Home },
    { id: 'Booking', label: 'Schedule', icon: Icons.Calendar },
    { id: 'Analytics', label: 'Analytics', icon: Icons.Analytics },
    { id: 'Reports', label: 'Reports', icon: Icons.FileText },
    { id: 'WasteClassifier', label: 'AI Classifier', icon: Icons.Camera },
    { id: 'CarbonFootprint', label: 'Carbon Footprint ', icon: Icons.User }
  ];

  // Theme Management
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  // Toast Management
  const showToast = useCallback((message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 4000);
  }, []);
  
  // Geolocation Simulation
  useEffect(() => {
    // Simulate real-time GPS update
    const interval = setInterval(() => {
      setCurrentLocation(prev => ({
        ...prev,
        // Simulate a slight drift in location and update the time
        lat: prev.lat + (Math.random() - 0.5) * 0.0001,
        lng: prev.lng + (Math.random() - 0.5) * 0.0001,
        lastUpdated: getFormattedTime()
      }));
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, []);

  // API Functions (omitted for brevity, unchanged from original)

  // UI Components
  const Button = ({ children, onClick, variant = 'primary', disabled = false, className = '', ...props }) => (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`btn btn--${variant} ${className} ${disabled ? 'btn--loading' : ''}`}
      {...props}
    >
      {children}
    </button>
  );

  const Card = ({ children, className = '', hover = false }) => (
    <div className={`card ${hover ? 'card--hover' : ''} ${className}`}>
      {children}
    </div>
  );

  const Modal = ({ isOpen, onClose, title, children, actions }) => {
    if (!isOpen) return null;
    
    return createPortal(
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-container" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">{title}</h2>
            {/* Kept modal close button for consistency if modal is used outside fullscreen wrapper */}
            <button onClick={onClose} className="modal-close">
              <Icons.Close />
            </button>
          </div>
          <div className="modal-content">{children}</div>
          {actions && <div className="modal-actions">{actions}</div>}
        </div>
      </div>,
      document.body
    );
  };

  const Toast = ({ message }) => {
    if (!message) return null;
    return <div className="toast">{message}</div>;
  };

  // Layout Components (omitted for brevity, largely unchanged)
  const Header = () => (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <button 
            onClick={() => setIsNavOpen(!isNavOpen)} 
            className="nav-toggle"
            aria-label="Toggle navigation"
          >
            {isNavOpen ? <Icons.Close /> : <Icons.Menu />}
          </button>
          <div className="logo">
            <span className="logo-icon">🌱</span>
            <span className="logo-text">CleanPath</span>
          </div>
        </div>
        <div className="header-right">
          <button className="header-action" aria-label="Search">
            <Icons.Search />
          </button>
          <button className="header-action header-action--notification" aria-label="Notifications">
            <Icons.Bell />
            <span className="notification-badge">3</span>
          </button>
          <div className="user-avatar"></div>
        </div>
      </div>
      
      {isNavOpen && (
        <nav className="mobile-nav">
          <div className="mobile-nav-content">
            {navigationItems.map(item => (
              <button 
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsNavOpen(false);
                }} 
                className={`mobile-nav-item ${currentPage === item.id ? 'mobile-nav-item--active' : ''}`}
              >
                <item.icon />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <div className="mobile-nav-footer">
            <div className="theme-toggle">
              <span>Dark Mode</span>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`toggle-switch ${isDarkMode ? 'toggle-switch--active' : ''}`}
                aria-label="Toggle dark mode"
              >
                <div className="toggle-slider"></div>
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );

  const Sidebar = () => (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🌱</span>
          <span className="logo-text">CleanPath</span>
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
        <div className="theme-toggle">
          <span>Dark Mode</span>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`toggle-switch ${isDarkMode ? 'toggle-switch--active' : ''}`}
            aria-label="Toggle dark mode"
          >
            <div className="toggle-slider"></div>
          </button>
        </div>
      </div>
    </aside>
  );

  const TopBar = () => (
    <div className="topbar">
      <div className="topbar-content">
        <div className="search-container">
          <Icons.Search />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="topbar-actions">
          <button className="topbar-action topbar-action--notification" aria-label="Notifications">
            <Icons.Bell />
            <span className="notification-badge">3</span>
          </button>
          <div className="user-avatar"></div>
        </div>
      </div>
    </div>
  );
  
  // Page Components

  const HomePage = () => (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
        <p className="page-subtitle">Monitor your environmental impact in real-time</p>
      </div>
      
      <div className="metrics-grid">
        <Card className="metric-card metric-card--primary">
          <div className="metric-header">
            <h3 className="metric-title">Next Collection</h3>
            <Icons.Calendar />
          </div>
          {/* Display automatically updating date */}
          <div className="metric-value">{selectedBookingDate.split(', ')[1]}</div> 
          <div className="metric-subtitle">9:00 AM - 12:00 PM</div>
        </Card>
        
        <Card className="metric-card metric-card--success">
          <div className="metric-header">
            <h3 className="metric-title">Impact Score</h3>
            <Icons.Analytics />
          </div>
          <div className="metric-value">92%</div>
          <div className="metric-subtitle">Above average</div>
        </Card>
        
        <Card className="metric-card metric-card--info">
          <div className="metric-header">
            <h3 className="metric-title">Rewards Points</h3>
            <span className="metric-icon">🏆</span>
          </div>
          <div className="metric-value">1,247</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '76%' }}></div>
          </div>
        </Card>
        
        <Card className="metric-card metric-card--warning">
          <div className="metric-header">
            <h3 className="metric-title">Classification Rate</h3>
            <span className="metric-icon">♻️</span>
          </div>
          <div className="metric-value">98.2%</div>
          <div className="metric-subtitle">Excellent sorting</div>
        </Card>
      </div>

      <div className="action-grid">
        <Button onClick={() => setCurrentPage('Booking')} variant="primary">
          Schedule Collection
        </Button>
        <Button onClick={() => setCurrentPage('WasteClassifier')} variant="accent">
          AI Classifier
        </Button>
      </div>
    </div>
  );

  const BookingPage = () => {
    const today = new Date();
    // Generate dates for the current week starting tomorrow (index 1 is tomorrow)
    const dates = Array.from({ length: 7 }, (_, i) => getFormattedDate(i + 1));
    const [tempDate, setTempDate] = useState(selectedBookingDate);
    
    // Calculate the actual starting date number to map correctly
    const firstDay = new Date(today);
    firstDay.setDate(firstDay.getDate() + 1);
    const firstDayOfWeek = firstDay.getDay(); // 0 (Sun) to 6 (Sat)
    const emptyStartCells = firstDayOfWeek; // Number of blank cells before the first day of the week
    
    return (
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Smart Scheduling</h1>
          <p className="page-subtitle">AI-optimized collection scheduling</p>
        </div>
        
        <div className="booking-layout">
          <Card className="booking-calendar">
            <h3 className="card-title">Select Date & Time</h3>
            <div className="calendar-placeholder">
              <div className="calendar-month-header">
                {/* Simulated navigation - just shows current month */}
                <button className="calendar-nav-btn"><Icons.ChevronLeft /></button>
                <div className="calendar-month">{getCurrentMonthYear(currentMonthDate)}</div>
                <button className="calendar-nav-btn"><Icons.ChevronRight /></button>
              </div>
              
              <div className="calendar-grid">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="calendar-day-header">{day}</div>
                ))}
                
                {/* Add blank cells for alignment with the week day */}
                {[...Array(emptyStartCells)].map((_, i) => (
                  <div key={`empty-align-${i}`} className="calendar-day-cell calendar-day-cell--empty"></div>
                ))}

                {/* Display 7 upcoming dates for selection */}
                {dates.map(dateStr => {
                  // Extract the day number for display
                  const dayNumber = new Date(dateStr).getDate();
                  const isSelected = dateStr === tempDate;
                  const dayLabel = dateStr.split(', ')[0];
                  
                  return (
                    <div 
                      key={dateStr}
                      onClick={() => setTempDate(dateStr)}
                      className={`calendar-day-cell ${isSelected ? 'calendar-day-cell--active' : ''}`}
                    >
                      {dayNumber}
                      <div className="calendar-day-label">{dayLabel}</div>
                    </div>
                  );
                })}

                {/* Fill remaining cells of the calendar grid (to total 4 weeks = 28 cells) */}
                {[...Array(28 - emptyStartCells - dates.length)].map((_, i) => (
                  <div key={`empty-fill-${i}`} className="calendar-day-cell calendar-day-cell--empty"></div>
                ))}
              </div>
            </div>
            <div className="time-slots">
              <h4 className="slots-title">Available Time Slots</h4>
              {['9:00 AM - 12:00 PM', '1:00 PM - 4:00 PM', '4:00 PM - 7:00 PM'].map((slot, index) => (
                <label key={slot} className="time-slot">
                  <input type="radio" name="timeSlot" defaultChecked={index === 0} />
                  <span className="slot-text">{slot}</span>
                  <span className="slot-badge">Optimal</span>
                </label>
              ))}
            </div>
          </Card>
          
          <Card className="booking-summary">
            <h3 className="card-title">Booking Summary</h3>
            <div className="summary-details">
              <div className="summary-item">
                <span className="summary-label">Date</span>
                <span className="summary-value">{tempDate}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Time</span>
                <span className="summary-value">9:00 AM - 12:00 PM</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Route Efficiency</span>
                <span className="summary-value summary-value--success">Optimized</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Blockchain ID</span>
                <span className="summary-value summary-value--link">#BC789XY2</span>
              </div>
            </div>
            <Button 
              onClick={() => {
                setSelectedBookingDate(tempDate);
                showToast(`Collection scheduled for ${tempDate}!`);
              }}
              className="booking-confirm"
            >
              Confirm Booking
            </Button>
          </Card>
        </div>
      </div>
    );
  };

  const AnalyticsPage = () => {
    
    // Construct the live map URL using the current simulated coordinates
    const mapUrl = `https://maps.google.com/maps?q=${currentLocation.lat},${currentLocation.lng}&z=14&t=k&output=embed`;
    
    // Data for the new scorecard and chart
    const scorecardMetrics = [
      { 
        title: 'CO2 Savings', 
        value: '3.1 Tons', 
        icon: Icons.Leaf, 
        color: 'var(--success-600)',
        subtitle: 'vs. last quarter'
      },
      { 
        title: 'Resource Recovery', 
        value: '1.2 Mins', 
        icon: Icons.Target, 
        color: 'var(--info-600)',
        subtitle: 'Average sorting time'
      },
      { 
        title: 'Water Saved', 
        value: '15,000 L', 
        icon: Icons.Leaf, 
        color: 'var(--primary-600)',
        subtitle: 'Through recycling'
      }
    ];

    const predictionData = [
      { label: 'Today', waste: 45, prediction: 50 },
      { label: 'Tomorrow', waste: 52, prediction: 55 },
      { label: 'Next Week', waste: 78, prediction: 85 },
      { label: 'Next Month', waste: 210, prediction: 230 },
    ];

    return (
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Impact Analytics</h1>
          <p className="page-subtitle">Data-driven insights for sustainable waste management</p>
        </div>
        
        {/* Environmental Scorecard (New Section) */}
        <div className="analytics-scorecard">
          {scorecardMetrics.map((metric, index) => (
            <Card key={index} className="metric-card metric-card--scorecard" style={{ '--metric-color': metric.color }}>
              <div className="metric-header">
                <h3 className="metric-title">{metric.title}</h3>
                <metric.icon style={{ color: metric.color }} />
              </div>
              <div className="metric-value" style={{ color: metric.color }}>{metric.value}</div>
              <div className="metric-subtitle">{metric.subtitle}</div>
            </Card>
          ))}
        </div>

        <div className="analytics-layout">
          <Card className="analytics-main">
            <h3 className="card-title">Regional Waste Flow & GPS Tracking</h3>
            <div className="chart-container">
              <div className="map-placeholder">
                <div className="map-header-live">
                  <h4 className="map-title">Live GPS Location (Collection Vehicle)</h4>
                  <div className="map-info">
                    <Icons.MapPin />
                    <div>
                      {/* Display live updated coordinates */}
                      <p>Lat: **{currentLocation.lat.toFixed(4)}**, Lng: **{currentLocation.lng.toFixed(4)}**</p>
                      <p className="small">Accuracy: {currentLocation.accuracy}</p>
                      <p className="small">Last Updated: **{currentLocation.lastUpdated}**</p>
                    </div>
                  </div>
                </div>
                
                {/* Embedded Live Map View */}
                <div className="map-visual">
                  <iframe 
                    key={mapUrl} 
                    src={mapUrl} 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, borderRadius: '0 0 var(--radius-lg) var(--radius-lg)' }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Live Waste Vehicle Map"
                  ></iframe>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="analytics-sidebar">
            <Card className="analytics-metric">
              <h4 className="metric-title">AI Waste Volume Prediction (KGs)</h4>
              <div className="prediction-chart-placeholder">
                <p className="chart-info">Future waste volume predicted by Gemini AI.</p>
                <div className="prediction-chart-data">
                  {predictionData.map((item, index) => (
                    <div key={index} className="prediction-bar-group">
                      <div className="prediction-label">{item.label}</div>
                      <div className="prediction-bars">
                        <div className="prediction-bar actual-bar" style={{ height: `${item.waste / 3}%` }} title={`Actual: ${item.waste} KG`}></div>
                        <div className="prediction-bar predicted-bar" style={{ height: `${item.prediction / 3}%` }} title={`Predicted: ${item.prediction} KG`}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="prediction-legend">
                  <span className="legend-item"><span style={{ backgroundColor: 'var(--success-500)' }}></span> Actual</span>
                  <span className="legend-item"><span style={{ backgroundColor: 'var(--info-500)' }}></span> Predicted</span>
                </div>
              </div>
            </Card>

            <Card className="analytics-metric">
              <h4 className="metric-title">Sorting Accuracy Breakdown</h4>
              <div className="progress-bars">
                {[
                  { label: 'Recyclables', value: 94 },
                  { label: 'Organics', value: 89 },
                  { label: 'General', value: 76 }
                ].map(item => (
                  <div key={item.label} className="progress-item">
                    <div className="progress-label">{item.label}</div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${item.value}%` }}></div>
                    </div>
                    <div className="progress-value">{item.value}%</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  const ReportsPage = () => (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Community Reports</h1>
        <p className="page-subtitle">Collaborative issue tracking with blockchain verification</p>
      </div>
      
      <div className="reports-layout">
        <Card className="recent-reports">
          <h3 className="card-title">Recent Community Issues</h3>
          <div className="reports-list">
            {[
              { 
                title: 'Overflow at Pine Street', 
                status: 'resolved', 
                reporter: 'Community Member',
                date: 'Sept 12, 2024',
                priority: 'high'
              },
              { 
                title: 'Recycling contamination reported', 
                status: 'in-progress', 
                reporter: 'Environmental Officer',
                date: 'Sept 10, 2024',
                priority: 'medium'
              }
            ].map((report, index) => (
              <div key={index} className="report-item">
                <div className="report-content">
                  <div className="report-header">
                    <h4 className="report-title">{report.title}</h4>
                    <span className={`status-badge status-badge--${report.status}`}>
                      {report.status.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="report-meta">
                    <span>By {report.reporter}</span>
                    <span>•</span>
                    <span>{report.date}</span>
                    <span className={`priority-badge priority-badge--${report.priority}`}>
                      {report.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="report-generator">
          <h3 className="card-title">AI Report Assistant</h3>
          <div className="form-group">
            <label className="form-label">Describe the issue</label>
            <textarea
              className="form-textarea"
              rows="4"
              placeholder="Describe the waste management issue in detail..."
              value={reportPrompt}
              onChange={(e) => setReportPrompt(e.target.value)}
            />
          </div>
          <Button 
            /* Simplified button logic for presentation */
            className="report-generate-btn"
          >
            {'Generate Report'}
          </Button>
          
          {/* Mocked response for demo */}
          {reportResponse && (
            <div className="report-result">
              <h4 className="result-title">Generated Report</h4>
              <div className="result-content">{reportResponse}</div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );

  const AdminPage = () => (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">System Administration</h1>
        <p className="page-subtitle">Advanced management and optimization tools</p>
      </div>
      
      <Card className="admin-panel">
        <div className="tab-navigation">
          {['User Management', 'Route Optimization', 'System Settings'].map(tab => (
            <button 
              key={tab} 
              className={`tab-button ${tab === 'User Management' ? 'tab-button--active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="tab-content">
          <div className="admin-section">
            <h3 className="section-title">User Management Dashboard</h3>
            <div className="admin-stats">
              <div className="stat-item">
                <div className="stat-value">2,847</div>
                <div className="stat-label">Active Users</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">156</div>
                <div className="stat-label">New This Month</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">98.2%</div>
                <div className="stat-label">Satisfaction Rate</div>
              </div>
            </div>
            <p className="section-description">
              Comprehensive user management with advanced analytics, role-based access control, 
              and automated engagement tracking for optimal service delivery.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );

  const ProfilePage = () => (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Profile & Preferences</h1>
        <p className="page-subtitle">Customize your CleanPath experience</p>
      </div>
      
      <div className="profile-layout">
        <Card className="profile-info">
          <div className="profile-avatar-section">
            <div className="profile-avatar-large"></div>
            <Button variant="secondary">Change Photo</Button>
          </div>
          
          <div className="profile-details">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" defaultValue="user@cleanpath.com" />
            </div>
            
            <div className="form-group">
              <label className="form-label">Display Name</label>
              <input type="text" className="form-input" defaultValue="Environmental Advocate" />
            </div>
            
            <div className="form-group">
              <label className="form-label">Preferred Language</label>
              <select className="form-select">
                <option>English</option>
                <option>Punjabi</option>
                <option>Hindi</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </Card>
        
        <Card className="notification-preferences">
          <h3 className="card-title">Notification Preferences</h3>
          <div className="preference-list">
            {[
              { id: 'pickup', label: 'Pickup Reminders', enabled: true },
              { id: 'reports', label: 'Community Report Updates', enabled: true },
              { id: 'rewards', label: 'Rewards & Achievements', enabled: false },
              { id: 'tips', label: 'Sustainability Tips', enabled: true }
            ].map(pref => (
              <div key={pref.id} className="preference-item">
                <div className="preference-content">
                  <span className="preference-label">{pref.label}</span>
                </div>
                <button
                  className={`toggle-switch ${pref.enabled ? 'toggle-switch--active' : ''}`}
                  aria-label={`Toggle ${pref.label}`}
                >
                  <div className="toggle-slider"></div>
                </button>
              </div>
            ))}
          </div>
          
          <div className="profile-actions">
            <Button variant="primary">Save Changes</Button>
            <Button variant="secondary">Reset to Defaults</Button>
          </div>
        </Card>
      </div>
    </div>
  );

  const WasteClassifierPage = () => (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">AI Waste Classifier</h1>
        <p className="page-subtitle">Advanced waste identification and recycling guidance</p>
      </div>
      
      <Card className="classifier-container">
        <div className="classifier-upload">
          <div className="upload-zone">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageAnalysis(e.target.files[0])}
              id="waste-image-upload"
              className="upload-input"
            />
            <label htmlFor="waste-image-upload" className="upload-label">
              <div className="upload-content">
                <Icons.Camera />
                <div className="upload-text">
                  <h3>Upload Waste Image</h3>
                  <p>Take a photo or select from your device</p>
                </div>
              </div>
            </label>
          </div>
          
          {imageFile && (
            <div className="image-preview">
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Uploaded waste item"
                className="preview-image"
              />
            </div>
          )}
        </div>
        
        <div className="classifier-actions">
          <Button 
            /* Simplified button logic for presentation */
            variant="accent"
          >
            {'Select Image'}
          </Button>
        </div>
        
        {imageResult && (
          <div className="analysis-results">
            <h3 className="results-title">Classification Results</h3>
            <div className="results-content">
              <div className="result-text">{imageResult}</div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );

  // Mobile Bottom Navigation
  const BottomNavigation = () => (
    <div className="bottom-nav">
      <div className="bottom-nav-items">
        {navigationItems.slice(0, 5).map(item => (
          <button 
            key={item.id}
            onClick={() => setCurrentPage(item.id)} 
            className={`bottom-nav-item ${currentPage === item.id ? 'bottom-nav-item--active' : ''}`}
          >
            <item.icon />
            <span className="bottom-nav-label">{item.label}</span>
          </button>
        ))}
      </div>
      
      <button 
        onClick={() => setIsMobileModalOpen(true)} 
        className="floating-action-button"
        aria-label="Quick actions"
      >
        <Icons.Plus />
      </button>
    </div>
  );

  // Mobile Booking Modal
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
            showToast('Collection scheduled successfully!');
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
  )

  // Main Render Function
  const renderPageContent = () => {
    const pageComponents = {
      Home: currentPage === 'Home' ? (
        <>
          <div className="mobile-only">{/* MobileDashboard omitted for brevity */}</div>
          <div className="desktop-only"><HomePage /></div>
        </>
      ) : null,
      Booking: <BookingPage />,
      Analytics: <AnalyticsPage />,
      Reports: <ReportsPage />,
      Admin: <AdminPage />,
      Profile: <ProfilePage />,
      WasteClassifier: <WasteClassifierPage />
    };
    
    return pageComponents[currentPage] || <HomePage />;
  };

  return (
    <>
      <div className="app-container">
        {/* Desktop Layout */}
        <div className="desktop-layout">
          <Sidebar />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <TopBar />
            <main style={{ flex: 1, overflow: 'auto' }}>
              {renderPageContent()}
            </main>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="mobile-layout">
          <Header />
          <main style={{ flex: 1, overflow: 'auto', paddingBottom: '5rem' }}>
            {renderPageContent()}
          </main>
          <BottomNavigation />
        </div>

        {/* Modals and Overlays */}
        <BookingModal />
        <Toast message={toastMessage} />
      </div>
    </>
  );
};

export default wastemanage;