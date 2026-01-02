import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icons } from './Icons';

export const Sidebar = ({ isDarkMode, setIsDarkMode, navigationItems }) => {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <span className="logo-icon">🌱</span>
                    <span className="logo-text">CleanPath</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                {navigationItems.map(item => (
                    <NavLink
                        key={item.id}
                        to={item.path}
                        end={item.path === ''} // Exact match for root
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
                <div className="theme-toggle">
                    <span>Dark Mode</span>
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`toggle-switch ${isDarkMode ? 'toggle-switch--active' : ''}`}
                        aria-label="Toggle dark mode"
                    >
                        <div className="toggle-slider"></div>
                    </button>
                </div>
            </div>
        </aside>
    );
};
