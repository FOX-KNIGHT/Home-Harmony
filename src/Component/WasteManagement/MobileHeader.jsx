import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icons } from './Icons';
import '../wastemanage.css';

const MobileHeader = ({ onMenuClick, isNavOpen, setIsNavOpen, navigationItems, isDarkMode, setIsDarkMode }) => {
    // If external control (onMenuClick) is provided, use it (for other layouts).
    // If local control (setIsNavOpen) is provided, use that (for WasteManage).
    const handleMenuClick = () => {
        if (onMenuClick) {
            onMenuClick();
        } else if (setIsNavOpen) {
            setIsNavOpen(!isNavOpen);
        }
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-left">
                    <button
                        onClick={handleMenuClick}
                        className="nav-toggle"
                        aria-label="Toggle navigation"
                    >
                        {(isNavOpen && setIsNavOpen) ? <Icons.Close /> : <Icons.Menu />}
                    </button>
                    <div className="logo">
                        <span className="logo-icon">🌱</span>
                        <span className="logo-text">CleanPath</span>
                    </div>
                </div>
                <div className="header-right">
                    <button className="header-action" aria-label="Search">
                        <Icons.Search />
                    </button>
                    <button className="header-action header-action--notification" aria-label="Notifications">
                        <Icons.Bell />
                        <span className="notification-badge">3</span>
                    </button>
                    <div className="user-avatar"></div>
                </div>
            </div>

            {/* Render Mobile Nav Menu ONLY if we are handling local state (WasteManage) */}
            {isNavOpen && setIsNavOpen && navigationItems && (
                <nav className="mobile-nav">
                    <div className="mobile-nav-content">
                        {navigationItems.map(item => (
                            <NavLink
                                key={item.id}
                                to={item.path}
                                end={item.path === ''}
                                onClick={() => setIsNavOpen(false)}
                                className={({ isActive }) =>
                                    `mobile-nav-item ${isActive ? 'mobile-nav-item--active' : ''}`
                                }
                            >
                                <item.icon />
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </div>
                    <div className="mobile-nav-footer">
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
                </nav>
            )}
        </header>
    );
};

export default MobileHeader;
