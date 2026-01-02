import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { Card } from './components/Shared';
import { getFormattedTime } from './utils';

const Analytics = () => {
    const [currentLocation, setCurrentLocation] = useState({
        lat: 19.0760, // Simulated Mumbai lat
        lng: 72.8777, // Simulated Mumbai lng
        accuracy: 'High',
        lastUpdated: getFormattedTime()
    });

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

export default Analytics;
