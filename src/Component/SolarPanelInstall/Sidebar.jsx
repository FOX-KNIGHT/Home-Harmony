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
        <aside className="sidebar">
            <div className="sidebar-header">
                <Icons.Sun className="sidebar-logo-icon" style={{ color: '#fbbf24' }} />
                <div className="sidebar-logo-text">
                    <h1 className="sidebar-title">Solar Path</h1>
                    <span className="sidebar-subtitle">Energy Manager</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                {navigationItems.map((item) => (
                    <NavLink
                        key={item.id}
                        to={item.path}
                        end={item.path === ''}
                        className={({ isActive }) =>
                            `sidebar-nav-item ${isActive ? 'sidebar-nav-item--active' : ''}`
                        }
                    >
                        <item.icon />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <div className="sidebar-status">
                    <span className="status-dot status-dot--active"></span>
                    <span>System Online</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
