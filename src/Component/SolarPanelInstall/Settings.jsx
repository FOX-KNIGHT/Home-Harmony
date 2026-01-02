import React, { useState } from 'react';
import { Card, Button, Toast } from '../WasteManagement/components/Shared';

const Settings = () => {
    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        weeklyReport: false,
        maintenanceAlerts: true
    });

    const [preferences, setPreferences] = useState({
        units: 'kWh',
        currency: 'USD',
        theme: 'System',
        dataSharing: true
    });

    const handleNotifChange = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handlePrefChange = (key, value) => {
        setPreferences(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        // Mock save
        alert("Settings saved successfully!");
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Settings</h1>
                <p className="page-subtitle">Manage your solar manager preferences and notifications.</p>
            </div>

            <div className="settings-grid" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                <Card title="Notifications">
                    <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>Notification Preferences</h3>
                    <div className="settings-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {Object.entries(notifications).map(([key, value]) => (
                            <div key={key} className="setting-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ textTransform: 'capitalize', color: '#cbd5e1' }}>
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                                <label className="toggle-switch" style={{ position: 'relative', display: 'inline-block', width: '48px', height: '24px' }}>
                                    <input
                                        type="checkbox"
                                        checked={value}
                                        onChange={() => handleNotifChange(key)}
                                        style={{ opacity: 0, width: 0, height: 0 }}
                                    />
                                    <span style={{
                                        position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                                        backgroundColor: value ? '#d97706' : '#475569', borderRadius: '24px', transition: '.4s'
                                    }}>
                                        <span style={{
                                            position: 'absolute', content: '""', height: '18px', width: '18px', left: value ? '26px' : '4px', bottom: '3px',
                                            backgroundColor: 'white', borderRadius: '50%', transition: '.4s'
                                        }}></span>
                                    </span>
                                </label>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card title="System Preferences">
                    <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>System Preferences</h3>
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>Energy Units</label>
                        <select
                            className="form-select"
                            value={preferences.units}
                            onChange={(e) => handlePrefChange('units', e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: '#1e293b', border: '1px solid #334155', color: 'white' }}
                        >
                            <option value="kWh">Kilowatt-hour (kWh)</option>
                            <option value="MWh">Megawatt-hour (MWh)</option>
                            <option value="Wh">Watt-hour (Wh)</option>
                        </select>
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>Currency</label>
                        <select
                            className="form-select"
                            value={preferences.currency}
                            onChange={(e) => handlePrefChange('currency', e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: '#1e293b', border: '1px solid #334155', color: 'white' }}
                        >
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                        </select>
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>Data Sharing</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <p style={{ fontSize: '0.875rem', color: '#94a3b8', flex: 1 }}>Allow anonymous data usage for community insights.</p>
                            <label className="toggle-switch" style={{ position: 'relative', display: 'inline-block', width: '48px', height: '24px' }}>
                                <input
                                    type="checkbox"
                                    checked={preferences.dataSharing}
                                    onChange={() => handlePrefChange('dataSharing', !preferences.dataSharing)}
                                    style={{ opacity: 0, width: 0, height: 0 }}
                                />
                                <span style={{
                                    position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                                    backgroundColor: preferences.dataSharing ? '#22c55e' : '#475569', borderRadius: '24px', transition: '.4s'
                                }}>
                                    <span style={{
                                        position: 'absolute', content: '""', height: '18px', width: '18px', left: preferences.dataSharing ? '26px' : '4px', bottom: '3px',
                                        backgroundColor: 'white', borderRadius: '50%', transition: '.4s'
                                    }}></span>
                                </span>
                            </label>
                        </div>
                    </div>

                    <Button onClick={handleSave} className="solar-btn--primary" style={{ width: '100%' }}>Save Preferences</Button>
                </Card>
            </div>
        </div>
    );
};

export default Settings;
