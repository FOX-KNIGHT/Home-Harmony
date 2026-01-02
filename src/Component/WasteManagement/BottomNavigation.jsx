import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icons } from './Icons';
import '../WasteManage.css';

const BottomNavigation = ({ navigationItems = [], onFabClick }) => (
    <div className="bottom-nav">
        <div className="bottom-nav-items">
            {navigationItems.length > 0 ? (
                navigationItems.slice(0, 5).map(item => (
                    <NavLink
                        key={item.id}
                        to={item.path}
                        end={item.path === ''}
                        className={({ isActive }) =>
                            `bottom-nav-item ${isActive ? 'bottom-nav-item--active' : ''}`
                        }
                    >
                        {/* Check if item.icon is a function or component */}
                        <item.icon />
                        <span className="bottom-nav-label">{item.label}</span>
                    </NavLink>
                ))
            ) : (
                // Fallback if no items provided (prevent empty empty)
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', padding: '1rem' }}>
                    No items
                </div>
            )}
        </div>

        <button
            onClick={onFabClick}
            className="floating-action-button"
            aria-label="Quick actions"
        >
            <Icons.Plus />
        </button>
    </div>
);

export default BottomNavigation;
