import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icons } from '../WasteManagement/Icons';

const Sidebar = () => {
    const navigationItems = [
        { id: 'Dashboard', label: 'Chaos Dashboard', icon: Icons.Home, path: '' },
        { id: 'Tasks', label: 'Tasks & Chores', icon: Icons.FileText, path: 'tasks' },
        { id: 'Shopping', label: 'Shopping', icon: Icons.Shopping, path: 'shopping' },
        { id: 'Calendar', label: 'Calendar', icon: Icons.Calendar, path: 'calendar' },
        { id: 'Conflicts', label: 'Resolutions', icon: Icons.Smile, path: 'conflicts' },
        { id: 'People', label: 'Family Members', icon: Icons.Users, path: 'people' },
    ];

    return (
        <aside className="w-64 bg-slate-800/50 border-r border-white/5 flex flex-col h-full backdrop-blur-xl">
            <div className="p-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-500/10 rounded-lg">
                        <Icons.Home className="w-6 h-6 text-pink-500" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-slate-100 leading-tight">Family Harmony</h1>
                        <span className="text-xs text-slate-400 font-medium tracking-wide">Chaos Manager</span>
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
                                ? 'bg-pink-500/10 text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.1)]'
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
                <div className="bg-slate-800/50 p-3 rounded-lg border border-white/5 text-center">
                    <p className="text-xs text-slate-400 italic">"A tidy home is a happy home."</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
