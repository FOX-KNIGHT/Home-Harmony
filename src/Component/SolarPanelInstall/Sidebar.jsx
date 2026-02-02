import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icons } from '../WasteManagement/Icons';

const Sidebar = () => {
    const navigationItems = [
        { id: 'Dashboard', label: 'Dashboard', icon: Icons.Home, path: '' },
        { id: 'Analytics', label: 'ROI Calculator', icon: Icons.Analytics, path: 'analytics' },
        { id: 'Schedule', label: 'Schedule Install', icon: Icons.Calendar, path: 'schedule' },
        { id: 'AIDesign', label: 'AI Design', icon: Icons.Sun, path: 'ai-design' },
        { id: 'Settings', label: 'Settings', icon: Icons.Settings, path: 'settings' }
    ];

    return (
        <aside className="w-64 bg-slate-800/50 border-r border-white/5 flex flex-col h-full backdrop-blur-xl">
            <div className="p-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/10 rounded-lg">
                        <Icons.Sun className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-slate-100 leading-tight">Solar Path</h1>
                        <span className="text-xs text-slate-400 font-medium tracking-wide">Energy Manager</span>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navigationItems.map((item) => (
                    <NavLink
                        key={item.id}
                        to={item.path}
                        end={item.path === ''}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                            ${isActive
                                ? 'bg-sky-500/10 text-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.1)]'
                                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5 opacity-80" />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-6 border-t border-white/5">
                <div className="flex items-center justify-between px-3 py-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-xs font-semibold text-emerald-400">System Online</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
