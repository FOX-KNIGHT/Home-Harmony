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
        <aside className="sidebar">
            <div className="sidebar-header">
                <Icons.Home className="sidebar-logo-icon" style={{ color: '#ec4899' }} />
                <div className="sidebar-logo-text">
                    <h1 className="sidebar-title">Family Harmony</h1>
                    <span className="sidebar-subtitle">Chaos Manager</span>
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
                <div className="sidebar-quote">
                    "A tidy home is a happy home."
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
