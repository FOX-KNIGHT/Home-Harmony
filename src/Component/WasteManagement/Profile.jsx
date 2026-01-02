import React, { useState } from 'react';
import { Card, Button } from './components/Shared';

const Profile = () => {
    // Checkbox state management
    const [preferences, setPreferences] = useState([
        { id: 'pickup', label: 'Pickup Reminders', enabled: true },
        { id: 'reports', label: 'Community Report Updates', enabled: true },
        { id: 'rewards', label: 'Rewards & Achievements', enabled: false },
        { id: 'tips', label: 'Sustainability Tips', enabled: true }
    ]);

    const togglePreference = (id) => {
        setPreferences(preferences.map(pref =>
            pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
        ));
    };

    return (
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
                        {preferences.map(pref => (
                            <div key={pref.id} className="preference-item">
                                <div className="preference-content">
                                    <span className="preference-label">{pref.label}</span>
                                </div>
                                <button
                                    onClick={() => togglePreference(pref.id)}
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
};

export default Profile;
