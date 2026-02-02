import React from 'react';
import { Icons } from '../WasteManagement/Icons';
import { Card, Button } from '../WasteManagement/components/Shared';

const StatBox = ({ value, label, icon, color, className = '' }) => {
    // Map colors to gradients
    const gradients = {
        primary: 'from-sky-500 to-blue-600',
        secondary: 'from-violet-500 to-purple-600',
        accent: 'from-pink-500 to-rose-600',
        info: 'from-emerald-400 to-teal-500'
    };

    const iconColors = {
        primary: 'text-sky-400',
        secondary: 'text-violet-400',
        accent: 'text-rose-400',
        info: 'text-emerald-400'
    };

    return (
        <Card className={`relative overflow-hidden group hover:shadow-lg transition-all duration-300 ${className}`}>
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${iconColors[color]}`}>
                {typeof icon === 'function' ? icon({ size: 48 }) : icon}
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                    <span className={`${iconColors[color]}`}>
                        {typeof icon === 'function' ? icon({ size: 20 }) : icon}
                    </span>
                    <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">{label}</h3>
                </div>
                <div className="text-3xl font-bold text-slate-100 mb-1">{value}</div>
                <div className="text-xs text-slate-500 flex items-center gap-1">
                    <span className="text-emerald-400 font-medium">↑ 12%</span> vs. last month
                </div>
            </div>
            <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${gradients[color] || 'from-slate-700 to-slate-600'}`}></div>
        </Card>
    );
};

const Dashboard = () => {
    return (
        <div className="min-h-screen p-6 md:p-8 max-w-7xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">Solar Performance Dashboard</h1>
                <p className="text-slate-400 text-lg">Real-time monitoring of your sustainable energy system.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatBox label="Current Output" value="7.2 kW" icon={Icons.Lightning} color="primary" />
                <StatBox label="YTD Energy Generated" value="4.5 MWh" icon={Icons.Sun} color="secondary" />
                <StatBox label="Annual Savings" value="$1,520" icon={Icons.User} color="accent" />
                <StatBox label="Carbon Offset" value="3.1 Tons" icon={Icons.Home} color="info" />
            </div>

            <Card className="min-h-[400px] flex flex-col justify-center items-center text-center p-8 border-dashed border-2 border-slate-700 hover:border-slate-600 transition-colors">
                <div className="bg-slate-800/50 p-4 rounded-full mb-4">
                    <Icons.Sun className="w-12 h-12 text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-200 mb-2">Hourly Generation Trend</h3>
                <p className="text-slate-400 max-w-md">Interactive line chart visualization would appear here locally using Recharts.</p>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
                <Button variant="primary" className="w-full">View Detailed Reports</Button>
                <Button variant="secondary" className="w-full">Check System Health</Button>
            </div>
        </div>
    );
};

export default Dashboard;
