import React, { useState } from 'react';
import { Card } from './components/Shared';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('User Management');

    return (
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
                            className={`tab-button ${tab === activeTab ? 'tab-button--active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="tab-content">
                    {activeTab === 'User Management' && (
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
                    )}
                    {activeTab === 'Route Optimization' && (
                        <div className="admin-section">
                            <h3 className="section-title">Route Optimization</h3>
                            <div className="bg-slate-800 p-4 rounded-lg mb-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-white font-bold">Live Fleet Status</h4>
                                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs px-2 py-1 rounded">Optimization Active</span>
                                </div>
                                <div style={{ height: '200px', background: '#334155', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ color: '#94a3b8' }}>Interactive Map Placeholder</span>
                                </div>
                                <div className="mt-4 grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-slate-700 rounded">
                                        <div className="text-xs text-slate-400">Total Distance Saved</div>
                                        <div className="text-lg font-bold text-white">458 km</div>
                                    </div>
                                    <div className="p-3 bg-slate-700 rounded">
                                        <div className="text-xs text-slate-400">Fuel Efficiency</div>
                                        <div className="text-lg font-bold text-white">+12.5%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'System Settings' && (
                        <div className="admin-section">
                            <h3 className="section-title">System Settings</h3>
                            <div className="space-y-4">
                                <div className="bg-slate-800 p-4 rounded-lg flex items-center justify-between">
                                    <div>
                                        <h4 className="text-white font-bold">Maintenance Mode</h4>
                                        <p className="text-sm text-slate-400">Suspend all user activities</p>
                                    </div>
                                    <label className="toggle-switch relative inline-block w-12 h-6">
                                        <input type="checkbox" className="opacity-0 w-0 h-0" />
                                        <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-slate-600 rounded-full transition-all before:absolute before:content-[''] before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all"></span>
                                    </label>
                                </div>
                                <div className="bg-slate-800 p-4 rounded-lg flex items-center justify-between">
                                    <div>
                                        <h4 className="text-white font-bold">Auto-Assign Routes</h4>
                                        <p className="text-sm text-slate-400">AI automatically assigns drivers</p>
                                    </div>
                                    <label className="toggle-switch relative inline-block w-12 h-6">
                                        <input type="checkbox" defaultChecked className="opacity-0 w-0 h-0" />
                                        <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-green-500 rounded-full transition-all before:absolute before:content-[''] before:h-4 before:w-4 before:left-[26px] before:bottom-1 before:bg-white before:rounded-full before:transition-all"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default Admin;
