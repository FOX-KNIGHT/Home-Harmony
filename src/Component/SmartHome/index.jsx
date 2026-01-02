import React, { useState } from 'react';
import { Card, Button } from '../WasteManagement/components/Shared';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SmartHome = () => {
    const navigate = useNavigate();
    const [devices, setDevices] = useState({
        lighting: true,
        climate: true,
        security: true,
        media: false
    });

    const [routines, setRoutines] = useState({
        morning: true,
        night: false
    });

    const toggleDevice = (key) => setDevices(prev => ({ ...prev, [key]: !prev[key] }));
    const toggleRoutine = (key) => setRoutines(prev => ({ ...prev, [key]: !prev[key] }));

    const energyData = [
        { time: '00:00', kwh: 0.4 }, { time: '04:00', kwh: 0.3 },
        { time: '08:00', kwh: 1.2 }, { time: '12:00', kwh: 1.5 },
        { time: '16:00', kwh: 1.8 }, { time: '20:00', kwh: 2.1 },
        { time: '23:59', kwh: 0.8 }
    ];

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-8 font-sans">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                        Smart Home Hub
                    </h1>
                    <p className="text-slate-400">Control all your connected devices from one central dashboard.</p>
                </div>
                <Button variant="secondary" onClick={() => navigate('/')}>Back into Home</Button>
            </header>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card
                    className={`border-slate-700 p-4 cursor-pointer transition-all duration-300 ${devices.lighting ? 'bg-purple-900/20 border-purple-500' : 'bg-[#1e293b] hover:bg-[#334155]'}`}
                    onClick={() => toggleDevice('lighting')}
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-2xl">💡</span>
                        <div className={`w-2 h-2 rounded-full ${devices.lighting ? 'bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]' : 'bg-slate-600'}`}></div>
                    </div>
                    <h3 className="font-bold">Lighting</h3>
                    <p className="text-xs text-slate-400">{devices.lighting ? 'On • 80%' : 'Off'}</p>
                </Card>
                <Card
                    className={`border-slate-700 p-4 cursor-pointer transition-all duration-300 ${devices.climate ? 'bg-orange-900/20 border-orange-500' : 'bg-[#1e293b] hover:bg-[#334155]'}`}
                    onClick={() => toggleDevice('climate')}
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-2xl">🌡️</span>
                        <div className={`w-2 h-2 rounded-full ${devices.climate ? 'bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.8)]' : 'bg-slate-600'}`}></div>
                    </div>
                    <h3 className="font-bold">Climate</h3>
                    <p className="text-xs text-slate-400">72°F | Auto</p>
                </Card>
                <Card
                    className={`border-slate-700 p-4 cursor-pointer transition-all duration-300 ${devices.security ? 'bg-green-900/20 border-green-500' : 'bg-[#1e293b] hover:bg-[#334155]'}`}
                    onClick={() => toggleDevice('security')}
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-2xl">🔒</span>
                        <div className={`w-2 h-2 rounded-full ${devices.security ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]' : 'bg-slate-600'}`}></div>
                    </div>
                    <h3 className="font-bold">Security</h3>
                    <p className="text-xs text-slate-400">{devices.security ? 'Armed' : 'Disarmed'}</p>
                </Card>
                <Card
                    className={`border-slate-700 p-4 cursor-pointer transition-all duration-300 ${devices.media ? 'bg-pink-900/20 border-pink-500' : 'bg-[#1e293b] hover:bg-[#334155]'}`}
                    onClick={() => toggleDevice('media')}
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-2xl">🎵</span>
                        <div className={`w-2 h-2 rounded-full ${devices.media ? 'bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.8)]' : 'bg-slate-600'}`}></div>
                    </div>
                    <h3 className="font-bold">Media</h3>
                    <p className="text-xs text-slate-400">{devices.media ? 'Playing' : 'Idle'}</p>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-[#1e293b] border-slate-700 p-6">
                    <h3 className="text-xl font-bold mb-4">Active Routines</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-[#0f172a] rounded-lg">
                            <div className="flex items-center gap-3">
                                <span className="bg-orange-500/20 text-orange-400 p-2 rounded-lg">☀️</span>
                                <div>
                                    <h4 className="font-medium">Morning Wakeup</h4>
                                    <p className="text-xs text-slate-400">{routines.morning ? 'Running • 7:00 AM' : 'Paused'}</p>
                                </div>
                            </div>
                            <label className="toggle-switch relative inline-block w-12 h-6">
                                <input
                                    type="checkbox"
                                    checked={routines.morning}
                                    onChange={() => toggleRoutine('morning')}
                                    className="opacity-0 w-0 h-0"
                                />
                                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${routines.morning ? 'bg-green-500' : 'bg-slate-600'}`}>
                                    <span className={`absolute content-[''] h-4 w-4 bottom-1 bg-white rounded-full transition-all duration-300 ${routines.morning ? 'left-[26px]' : 'left-1'}`}></span>
                                </span>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-[#0f172a] rounded-lg">
                            <div className="flex items-center gap-3">
                                <span className="bg-indigo-500/20 text-indigo-400 p-2 rounded-lg">🌙</span>
                                <div>
                                    <h4 className="font-medium">Goodnight</h4>
                                    <p className="text-xs text-slate-400">{routines.night ? 'Scheduled • 11:00 PM' : 'Disabled'}</p>
                                </div>
                            </div>
                            <label className="toggle-switch relative inline-block w-12 h-6">
                                <input
                                    type="checkbox"
                                    checked={routines.night}
                                    onChange={() => toggleRoutine('night')}
                                    className="opacity-0 w-0 h-0"
                                />
                                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${routines.night ? 'bg-green-500' : 'bg-slate-600'}`}>
                                    <span className={`absolute content-[''] h-4 w-4 bottom-1 bg-white rounded-full transition-all duration-300 ${routines.night ? 'left-[26px]' : 'left-1'}`}></span>
                                </span>
                            </label>
                        </div>
                    </div>
                </Card>

                <Card className="bg-[#1e293b] border-slate-700 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">Energy Overview</h3>
                        <span className="text-xs text-slate-400">Last 24 Hours</span>
                    </div>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={energyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '0.5rem', color: '#fff' }}
                                />
                                <Line type="monotone" dataKey="kwh" stroke="#f472b6" strokeWidth={3} dot={{ r: 4, fill: '#f472b6' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};
export default SmartHome;
