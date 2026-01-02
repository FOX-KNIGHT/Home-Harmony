import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icons } from '../WasteManagement/Icons'; // Reusing existing icons for now

const Sidebar = () => {
    const navigationItems = [
        { id: 'Dashboard', label: 'Overview', icon: Icons.Home, path: '' },
        { id: 'Join', label: 'Join Queue', icon: Icons.PlusCircle, path: 'join' },
        { id: 'History', label: 'History', icon: Icons.History, path: 'history' },
    ];

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <Icons.Activity className="sidebar-logo-icon" />
                <h1 className="sidebar-title">Smart Queue</h1>
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
                <div className="sidebar-user">
                    <div className="sidebar-user-avatar">
                        <Icons.User />
                    </div>
                    <div className="sidebar-user-info">
                        <span className="sidebar-user-name">User</span>
                        <span className="sidebar-user-role">Resident</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
