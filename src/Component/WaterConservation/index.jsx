import React, { useState, useEffect } from 'react';
import { Card, Button } from '../WasteManagement/components/Shared';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WaterConservation = () => {
    const navigate = useNavigate();
    const [flowData, setFlowData] = useState([]);
    const [alerts, setAlerts] = useState([
        { id: 1, title: 'High Bathroom Usage', desc: 'Consider installing low-flow aerators. Potential savings: $15/mo.', type: 'warning', resolved: false },
        { id: 2, title: 'Optimal Washing Time', desc: 'Run dishwasher after 9 PM for lower peak rates.', type: 'info', resolved: false }
    ]);

    // Simulate real-time data
    useEffect(() => {
        const generateData = () => {
            const data = [];
            for (let i = 0; i < 24; i++) {
                data.push({
                    time: `${i}:00`,
                    usage: Math.floor(Math.random() * 50) + 10 + (i > 6 && i < 22 ? 30 : 0) // Higher usage during day
                });
            }
            return data;
        };
        setFlowData(generateData());

        const interval = setInterval(() => {
            setFlowData(prev => {
                const newData = [...prev.slice(1)];
                const lastTime = parseInt(prev[prev.length - 1].time);
                const nextTime = (lastTime + 1) % 24;
                newData.push({
                    time: `${nextTime}:00`,
                    usage: Math.floor(Math.random() * 50) + 10 + (nextTime > 6 && nextTime < 22 ? 30 : 0)
                });
                return newData;
            });
        }, 3000); // Update every 3 seconds

        return () => clearInterval(interval);
    }, []);

    const resolveAlert = (id) => {
        setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-8 font-sans">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Water Conservation AI
                    </h1>
                    <p className="text-slate-400">Intelligent monitoring for a water-smart home.</p>
                </div>
                <Button variant="secondary" onClick={() => navigate('/')}>Back into Home</Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-[#1e293b] border-slate-700 p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Daily Usage</p>
                            <h3 className="text-3xl font-bold text-white mt-1">145 L</h3>
                        </div>
                        <span className="text-2xl">💧</span>
                    </div>
                    <div className="text-sm text-emerald-400 font-medium">↓ 12% vs last week</div>
                </Card>

                <Card className="bg-[#1e293b] border-slate-700 p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Active Leaks</p>
                            <h3 className="text-3xl font-bold text-white mt-1">0</h3>
                        </div>
                        <span className="text-2xl">🛡️</span>
                    </div>
                    <div className="text-sm text-emerald-400 font-medium">System Secure</div>
                </Card>

                <Card className="bg-[#1e293b] border-slate-700 p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Projected Bill</p>
                            <h3 className="text-3xl font-bold text-white mt-1">$45.20</h3>
                        </div>
                        <span className="text-2xl">💰</span>
                    </div>
                    <div className="text-sm text-yellow-400 font-medium">On Track</div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-[#1e293b] border-slate-700 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">Real-time Flow Analysis</h3>
                        <div className="flex gap-2">
                            <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded-full">Live</span>
                            <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-full">24h</span>
                        </div>
                    </div>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={flowData}>
                                <defs>
                                    <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '0.5rem', color: '#fff' }}
                                    itemStyle={{ color: '#22d3ee' }}
                                />
                                <Area type="monotone" dataKey="usage" stroke="#06b6d4" fillOpacity={1} fill="url(#colorUsage)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="bg-[#1e293b] border-slate-700 p-6">
                    <h3 className="text-xl font-bold mb-4">AI Recommendations</h3>
                    <div className="space-y-4">
                        {alerts.map(alert => (
                            <div
                                key={alert.id}
                                className={`p-4 rounded-lg border-l-4 transition-all duration-300 ${alert.resolved ? 'opacity-50 bg-[#0f172a]/50' : 'bg-[#0f172a]'
                                    } ${alert.type === 'warning' ? 'border-yellow-500' : 'border-cyan-500'
                                    }`}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className={`font-bold text-white mb-1 ${alert.resolved ? 'line-through text-slate-500' : ''}`}>
                                            {alert.title}
                                        </h4>
                                        <p className="text-sm text-slate-400">{alert.desc}</p>
                                    </div>
                                    {!alert.resolved && (
                                        <button
                                            onClick={() => resolveAlert(alert.id)}
                                            className="text-xs px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded transition-colors"
                                        >
                                            Resolve
                                        </button>
                                    )}
                                    {alert.resolved && (
                                        <span className="text-xs text-green-500 font-medium">Done ✓</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🤖</span>
                            <div>
                                <h4 className="font-bold text-cyan-400 text-sm">AI Insight</h4>
                                <p className="text-xs text-slate-300">Your water usage pattern suggests a potential minor leak in the garden sector between 2-4 AM. Inspect irrigation valves.</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
export default WaterConservation;
