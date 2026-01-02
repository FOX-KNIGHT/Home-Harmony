import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from './Icons';
import { Card, Button } from './components/Shared';

const Dashboard = () => {
    const navigate = useNavigate();
    // Helper for date display
    const getFormattedDate = (offset = 0) => {
        const date = new Date();
        date.setDate(date.getDate() + offset);
        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const selectedBookingDate = getFormattedDate(1); // Default to tomorrow

    return (
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
                <Button onClick={() => navigate('booking')} variant="primary">
                    Schedule Collection
                </Button>
                <Button onClick={() => navigate('waste-classifier')} variant="accent">
                    AI Classifier
                </Button>
            </div>
        </div>
    );
};

export default Dashboard;
