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
  )
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

  // Gemini API states
  const [reportPrompt, setReportPrompt] = useState('');
  const [reportResponse, setReportResponse] = useState('');
  const [isReportLoading, setIsReportLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageResult, setImageResult] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(false);

  // API Configuration
  const API_KEY = ""; // Add your API key here
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

  // API Functions
  const handleGenerateReport = async () => {
    if (!reportPrompt.trim()) {
      showToast("Please provide a description for the report");
      return;
    }

    setIsReportLoading(true);
    setReportResponse('');
    
    const prompt = `Create a professional waste management report based on: "${reportPrompt}". Format it with clear sections and actionable recommendations.`;
    
    try {
      const response = await fetch(API_URL_TEXT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });
      
      const result = await response.json();
      const generatedText = result?.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to generate report at this time.';
      setReportResponse(generatedText);
    } catch (error) {
      setReportResponse('Network error occurred. Please check your connection and try again.');
    } finally {
      setIsReportLoading(false);
    }
  };

  const handleImageAnalysis = async (file) => {
    if (!file) return;
    
    setImageFile(file);
    setIsImageLoading(true);
    setImageResult('');

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target.result.split(',')[1];
      const prompt = "Analyze this waste item and provide detailed disposal instructions with environmental impact considerations.";
      
      try {
        const response = await fetch(API_URL_IMAGE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              role: "user",
              parts: [
                { text: prompt },
                { inlineData: { mimeType: file.type, data: base64Data } }
              ]
            }]
          })
        });
        
        const result = await response.json();
        const analysis = result?.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to analyze image at this time.';
        setImageResult(analysis);
      } catch (error) {
        setImageResult('Analysis failed. Please try uploading a different image.');
      } finally {
        setIsImageLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

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

  // Layout Components
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
  const MobileDashboard = () => {
    const quickActions = [
      { 
        title: 'Smart Scheduling', 
        description: 'AI-powered pickup scheduling with route optimization',
        action: () => setIsMobileModalOpen(true),
        color: 'primary'
      },
      { 
        title: 'Impact Analytics', 
        description: 'Real-time insights into your environmental contribution',
        action: () => setCurrentPage('Analytics'),
        color: 'success'
      },
      { 
        title: 'Community Reports', 
        description: 'Collaborative reporting with blockchain verification',
        action: () => setCurrentPage('Reports'),
        color: 'warning'
      },
      { 
        title: 'AI Classification', 
        description: 'Advanced waste identification and recycling guidance',
        action: () => setCurrentPage('WasteClassifier'),
        color: 'info'
      }
    ];

    return (
      <div className="mobile-dashboard">
        <div className="dashboard-header">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Welcome back, let's make an impact</p>
        </div>
        
        <div className="mobile-carousel">
          <Card className={`mobile-card mobile-card--${quickActions[currentMobileCard].color}`}>
            <div className="mobile-card-content">
              <h3 className="mobile-card-title">{quickActions[currentMobileCard].title}</h3>
              <p className="mobile-card-description">{quickActions[currentMobileCard].description}</p>
            </div>
            <Button onClick={quickActions[currentMobileCard].action} variant="accent">
              Explore
            </Button>
          </Card>
          
          <button 
            onClick={() => setCurrentMobileCard((prev) => (prev - 1 + quickActions.length) % quickActions.length)}
            className="carousel-nav carousel-nav--prev"
            aria-label="Previous card"
          >
            <Icons.ChevronLeft />
          </button>
          <button 
            onClick={() => setCurrentMobileCard((prev) => (prev + 1) % quickActions.length)}
            className="carousel-nav carousel-nav--next"
            aria-label="Next card"
          >
            <Icons.ChevronRight />
          </button>
        </div>
        
        <div className="carousel-indicators">
          {quickActions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentMobileCard(index)}
              className={`indicator ${index === currentMobileCard ? 'indicator--active' : ''}`}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };

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
          <div className="metric-value">Sept 15, 2024</div>
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

  const BookingPage = () => (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Smart Scheduling</h1>
        <p className="page-subtitle">AI-optimized collection scheduling</p>
      </div>
      
      <div className="booking-layout">
        <Card className="booking-calendar">
          <h3 className="card-title">Select Date & Time</h3>
          <div className="calendar-placeholder">
            <div className="calendar-grid">
              {/* Calendar implementation would go here */}
              <div className="calendar-month">September 2024</div>
            </div>
          </div>
          <div className="time-slots">
            <h4 className="slots-title">Available Time Slots</h4>
            {['9:00 AM - 12:00 PM', '1:00 PM - 4:00 PM', '4:00 PM - 7:00 PM'].map(slot => (
              <label key={slot} className="time-slot">
                <input type="radio" name="timeSlot" />
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
              <span className="summary-value">September 15, 2024</span>
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
            onClick={() => showToast('Collection scheduled successfully!')}
            className="booking-confirm"
          >
            Confirm Booking
          </Button>
        </Card>
      </div>
    </div>
  );

  const AnalyticsPage = () => (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Impact Analytics</h1>
        <p className="page-subtitle">Data-driven insights for sustainable waste management</p>
      </div>
      
      <div className="analytics-layout">
        <Card className="analytics-main">
          <h3 className="card-title">Regional Waste Flow</h3>
          <div className="chart-container">
            <div className="chart-placeholder">
              <div className="heatmap-simulation">
                <div className="heatmap-legend">
                  <span>Low</span>
                  <div className="legend-gradient"></div>
                  <span>High</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <div className="analytics-sidebar">
          <Card className="analytics-metric">
            <h4 className="metric-title">Collection Efficiency</h4>
            <div className="circular-progress">
              <div className="progress-value">87%</div>
            </div>
          </Card>
          
          <Card className="analytics-metric">
            <h4 className="metric-title">Sorting Accuracy</h4>
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
            onClick={handleGenerateReport} 
            disabled={isReportLoading}
            className="report-generate-btn"
          >
            {isReportLoading ? 'Generating...' : 'Generate Report'}
          </Button>
          
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
            onClick={() => document.getElementById('waste-image-upload').click()}
            disabled={isImageLoading}
            variant="accent"
          >
            {isImageLoading ? 'Analyzing...' : 'Select Image'}
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
          <div className="mobile-only"><MobileDashboard /></div>
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