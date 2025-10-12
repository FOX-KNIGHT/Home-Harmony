import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './SolarEnergyManager.css';

// --- Icon Components (Simplified) ---
const Icons = {
  Home: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9,22 9,12 15,12 15,22"></polyline></svg>),
  Analytics: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline></svg>),
  Calendar: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>),
  Sun: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>),
  Lightning: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>),
  User: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>),
  Settings: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"></circle><path d="M19.4,15a1.65,1.65,0,0,0,.33,1.82l.06.06a2,2,0,0,1,0,2.83,2,2,0,0,1-2.83,0l-.06-.06a1.65,1.65,0,0,0-1.82-.33,1.65,1.65,0,0,0-1,1.51V21a2,2,0,0,1-2,2,2,2,0,0,1-2-2v-.09A1.65,1.65,0,0,0,9,19.4a1.65,1.65,0,0,0-1.82.33l-.06.06a2,2,0,0,1-2.83,0,2,2,0,0,1,0-2.83l.06-.06a1.65,1.65,0,0,0,.33-1.82,1.65,1.65,0,0,0-1.51-1H3a2,2,0,0,1-2-2,2,2,0,0,1,2-2h.09A1.65,1.65,0,0,0,4.6,9a1.65,1.65,0,0,0-.33-1.82L4.21,7.11a2,2,0,0,1,0-2.83,2,2,0,0,1,2.83,0L7.11,4.34A1.65,1.65,0,0,0,9,4.6a1.65,1.65,0,0,0,1-1.51V3a2,2,0,0,1,2-2,2,2,0,0,1,2,2v.09a1.65,1.65,0,0,0,1,1.51,1.65,1.65,0,0,0,1.82-.33l.06-.06a2,2,0,0,1,2.83,0,2,2,0,0,1,0,2.83L19.65,7.11A1.65,1.65,0,0,0,19.4,9a1.65,1.65,0,0,0,1.51,1H21a2,2,0,0,1,2,2,2,2,0,0,1-2,2h-.09A1.65,1.65,0,0,0,19.4,15Z"></path></svg>),
};

// --- Utility Components ---
const Card = ({ children, className = '' }) => (<div className={`solar-card ${className}`}>{children}</div>);
const Button = ({ children, onClick, variant = 'primary', className = '' }) => (
    <button onClick={onClick} className={`solar-btn solar-btn--${variant} ${className}`}>
      {children}
    </button>
);
const StatBox = ({ value, label, icon, color, className = '' }) => (
    <Card className={`metric-card metric-card--${color} ${className}`}>
        <div className="metric-header">
            <h3 className="metric-title">{label}</h3>
            {icon}
        </div>
        <div className="metric-value">{value}</div>
        <div className="metric-subtitle">vs. last month</div>
    </Card>
);

// --- Sub-Pages ---

const DashboardPage = () => (
    <div className="page-container">
        <div className="page-header">
            <h1 className="page-title">Solar Performance Dashboard</h1>
            <p className="page-subtitle">Real-time monitoring of your sustainable energy system.</p>
        </div>
        
        <div className="metrics-grid">
            <StatBox label="Current Output" value="7.2 kW" icon={<Icons.Lightning />} color="primary" />
            <StatBox label="YTD Energy Generated" value="4.5 MWh" icon={<Icons.Sun />} color="secondary" />
            <StatBox label="Annual Savings" value="$1,520" icon={<Icons.User />} color="accent" />
            <StatBox label="Carbon Offset" value="3.1 Tons" icon={<Icons.Home />} color="info" />
        </div>

        <Card className="chart-placeholder">
            <h3 className="card-title">Hourly Generation Trend</h3>
            <p className="chart-content">Interactive line chart showing energy output (placeholder).</p>
        </Card>
        
        <div className="action-grid">
            <Button variant="primary">View Detailed Reports</Button>
            <Button variant="secondary">Check System Health</Button>
        </div>
    </div>
);

const AnalyticsPage = ({ calculatorProps }) => {
  const { inputs, results, handleChange, calculateROI } = calculatorProps;
  
  const chartData = results
    ? [
        { name: "Cost Offset", value: Number(results.annualSavings) },
        { name: "Current Bill", value: inputs.avgBill * 12 - Number(results.annualSavings) },
      ]
    : [{ name: "Potential Savings", value: 50 }, { name: "Current Spending", value: 50 }];

  const COLORS = ["var(--primary-600)", "var(--gray-600)"];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">ROI & Savings Calculator</h1>
        <p className="page-subtitle">Estimate your return on investment and financial impact.</p>
      </div>

      <div className="analytics-layout">
        {/* Calculator Input Panel */}
        <Card className="analytics-main">
          <h2 className="card-title">Input Details</h2>
          
          <div className="input-group">
            <label>Avg. Monthly Electric Bill ($)</label>
            <input type="number" name="avgBill" value={inputs.avgBill} onChange={handleChange} min="50" max="1000" step="10" />
          </div>

          <div className="input-group">
            <label>Estimated System Cost ($)</label>
            <input type="number" name="solarCost" value={inputs.solarCost} onChange={handleChange} min="10000" max="50000" step="1000" />
          </div>
          
          <div className="input-group">
            <label>System Size (kW)</label>
            <input type="number" name="systemSize" value={inputs.systemSize} onChange={handleChange} min="3" max="15" step="0.5" />
          </div>

          <Button 
            onClick={calculateROI}
            className="calculate-btn"
            variant="accent"
          >
            Calculate ROI & Impact
          </Button>

          {results && (
            <div className="chart-container">
              <h3 className='chart-title'>Annual Financial Breakdown</h3>
              <PieChart width={300} height={200}>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  fill="#8884d8"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          )}
        </Card>
        
        {/* Results Metrics Sidebar */}
        <div className="analytics-sidebar">
          <h2 className="panel-heading">Key Results</h2>
          {results ? (
            <div className="results-metrics">
              <StatBox label="Annual Savings" value={`$${results.annualSavings}`} icon={"$"} color="primary" className="mini-card" />
              <StatBox label="Breakeven Time" value={`${results.breakevenYears} yrs`} icon={"⏳"} color="secondary" className="mini-card" />
              <StatBox label="10-Year Net Gain" value={`$${results.tenYearSavings}`} icon={"🏆"} color="accent" className="mini-card" />
              <StatBox label="Annual CO₂ Offset" value={`${results.co2} kg`} icon={"🌍"} color="info" className="mini-card" />
            </div>
          ) : (
            <div className="placeholder-content">
                <div className="placeholder-icon">👆</div>
                <p>Enter inputs and calculate to view results here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SchedulePage = () => (
  <div className="page-container">
    <div className="page-header">
      <h1 className="page-title">Smart Installation Scheduling</h1>
      <p className="page-subtitle">Book your free home solar assessment appointment.</p>
    </div>
    
    <div className="booking-layout">
        <Card className="booking-calendar">
          <h3 className="card-title">Select Date & Time</h3>
          <div className="calendar-placeholder">
            <div className="calendar-grid">
              <div className="calendar-month">October 2025</div>
              <p>Placeholder for full calendar interactive view.</p>
            </div>
          </div>
          <div className="time-slots">
            <h4 className="slots-title">Available Assessment Slots</h4>
            {['Oct 15, 9:00 AM', 'Oct 16, 1:00 PM', 'Oct 17, 4:00 PM'].map(slot => (
              <label key={slot} className="time-slot">
                <input type="radio" name="timeSlot" />
                <span className="slot-text">{slot}</span>
                <span className="slot-badge">Available</span>
              </label>
            ))}
          </div>
        </Card>
        
        <Card className="booking-summary">
          <h3 className="card-title">Book Assessment</h3>
          <div className="form-group">
            <label className="form-label">Address</label>
            <input className="form-input" placeholder="Your Address" />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input className="form-input" placeholder="Your Phone" />
          </div>
          <Button onClick={() => alert('Appointment confirmed!')} className="booking-confirm">
            Confirm Appointment
          </Button>
        </Card>
      </div>
  </div>
);

const AIDesignPage = () => (
    <div className="page-container">
        <div className="page-header">
            <h1 className="page-title">AI System Design Consultation</h1>
            <p className="page-subtitle">Use AI to generate optimal panel layout and size recommendations.</p>
        </div>
        
        <div className="reports-layout">
            <Card className="report-generator">
                <h3 className="card-title">AI Design Prompt</h3>
                <div className="form-group">
                    <label className="form-label">Describe your roof/needs (e.g., "South-facing roof, 2-story house, maximum output required")</label>
                    <textarea
                      className="form-textarea"
                      rows="4"
                      placeholder="Enter details here..."
                      value={""}
                      onChange={() => {}}
                    />
                </div>
                <Button 
                    onClick={() => alert("Simulating AI Design...")} 
                    className="report-generate-btn"
                >
                    Generate Optimal Design
                </Button>
                <div className="report-result">
                    <h4 className="result-title">AI Recommendation (Placeholder)</h4>
                    <div className="result-content">
                        * **System Size:** 8.5 kW recommended.
                        * **Layout:** 18 panels on the south-facing roof, 6 panels on the west-facing section.
                        * **Expected Annual Output:** 12,000 kWh.
                    </div>
                </div>
            </Card>
            <Card className="recent-reports">
                <h3 className="card-title">Roof Image Classifier</h3>
                <div className="classifier-upload">
                    <div className="upload-zone">
                        <label htmlFor="roof-image-upload" className="upload-label">
                            <div className="upload-content">
                                <span>📷</span>
                                <h3>Upload Roof Photo</h3>
                                <p>Get instant feedback on roof condition and size.</p>
                            </div>
                        </label>
                    </div>
                    <Button variant="secondary" onClick={() => document.getElementById('roof-image-upload').click()}>
                        Select Image
                    </Button>
                </div>
            </Card>
        </div>
    </div>
);


const SolarEnergyManager = ({ onClose }) => {
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [inputs, setInputs] = useState({ avgBill: 150, solarCost: 25000, systemSize: 7 });
  const [results, setResults] = useState(null);

  const navigationItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: Icons.Home },
    { id: 'Analytics', label: 'ROI Calculator', icon: Icons.Analytics },
    { id: 'Schedule', label: 'Schedule Install', icon: Icons.Calendar },
    { id: 'AIDesign', label: 'AI Design', icon: Icons.Sun },
    { id: 'Settings', label: 'Settings', icon: Icons.Settings }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: Number(value) }));
  };

  const calculateROI = () => {
    const { avgBill, solarCost, systemSize } = inputs;
    const annualKWhSaved = systemSize * 1400; // 1kW saves ~1400 kWh/year
    const estimatedAnnualSavings = annualKWhSaved * (avgBill / (inputs.systemSize * 1500)); 
    const breakevenYears = solarCost / estimatedAnnualSavings;
    const tenYearSavings = (estimatedAnnualSavings * 10) - solarCost;
    const annualCo2Avoided = annualKWhSaved * 0.5;

    setResults({
      annualSavings: estimatedAnnualSavings.toFixed(0),
      breakevenYears: breakevenYears.toFixed(1),
      tenYearSavings: tenYearSavings.toFixed(0),
      co2: annualCo2Avoided.toFixed(0),
    });
  };
    
  const renderPageContent = () => {
    const calculatorProps = { inputs, results, handleChange: handleInputChange, calculateROI };
    switch (currentPage) {
      case 'Dashboard':
        return <DashboardPage />;
      case 'Analytics':
        return <AnalyticsPage calculatorProps={calculatorProps} />;
      case 'Schedule':
        return <SchedulePage />;
      case 'AIDesign':
        return <AIDesignPage />;
      case 'Settings':
        return <p className="page-container">Settings page coming soon.</p>;
      default:
        return <DashboardPage />;
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
        <Button variant="close" onClick={onClose}>
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