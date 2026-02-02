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
        <div className="min-h-screen p-6 md:p-8 max-w-7xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">Settings</h1>
                <p className="text-slate-400 text-lg">Manage your solar manager preferences and notifications.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card title="Notifications">
                    <h3 className="text-xl font-semibold text-slate-100 mb-6">Notification Preferences</h3>
                    <div className="space-y-4">
                        {Object.entries(notifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg border border-white/5">
                                <span className="capitalize text-slate-300 font-medium">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={value}
                                        onChange={() => handleNotifChange(key)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-sky-500 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
                                </label>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card title="System Preferences">
                    <h3 className="text-xl font-semibold text-slate-100 mb-6">System Preferences</h3>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-400">Energy Units</label>
                            <select
                                className="w-full bg-slate-800/50 border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-3 transition-colors"
                                value={preferences.units}
                                onChange={(e) => handlePrefChange('units', e.target.value)}
                            >
                                <option value="kWh">Kilowatt-hour (kWh)</option>
                                <option value="MWh">Megawatt-hour (MWh)</option>
                                <option value="Wh">Watt-hour (Wh)</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-400">Currency</label>
                            <select
                                className="w-full bg-slate-800/50 border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-3 transition-colors"
                                value={preferences.currency}
                                onChange={(e) => handlePrefChange('currency', e.target.value)}
                            >
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="GBP">GBP (£)</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-400">Data Sharing</label>
                            <div className="flex items-center justify-between bg-slate-800/50 p-3 rounded-lg border border-white/5">
                                <p className="text-sm text-slate-400">Allow anonymous data usage for community insights.</p>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={preferences.dataSharing}
                                        onChange={() => handlePrefChange('dataSharing', !preferences.dataSharing)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                </label>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button onClick={handleSave} className="w-full py-3 text-lg shadow-lg shadow-sky-900/20">Save Preferences</Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Settings;
