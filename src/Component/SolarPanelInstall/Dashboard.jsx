import React from 'react';
import { Icons } from '../WasteManagement/Icons';
import { Card, Button } from '../WasteManagement/components/Shared';

const StatBox = ({ value, label, icon, color, className = '' }) => (
    <Card className={`metric-card metric-card--${color} ${className}`}>
        <div className="metric-header">
            <h3 className="metric-title">{label}</h3>
            {/* Render icon if it's a component, otherwise just render it */}
            {typeof icon === 'function' ? icon() : icon}
        </div>
        <div className="metric-value">{value}</div>
        <div className="metric-subtitle">vs. last month</div>
    </Card>
);

const Dashboard = () => {
    return (
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
};

export default Dashboard;
