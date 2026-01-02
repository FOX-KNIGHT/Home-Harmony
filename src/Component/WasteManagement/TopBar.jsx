import React from 'react';
import { Icons } from './Icons';
import '../WasteManage.css'; // Ensure styles are available

const TopBar = ({ title }) => (
    <div className="topbar">
        <div className="topbar-content">
            {title && <h2 className="topbar-title-text">{title}</h2>}
            <div className="search-container">
                <Icons.Search />
                <input
                    type="text"
                    placeholder="Search..."
                    className="search-input"
                />
            </div>
            <div className="topbar-actions">
                <button className="topbar-action topbar-action--notification" aria-label="Notifications">
                    <Icons.Bell />
                    <span className="notification-badge">3</span>
                </button>
                <div className="user-avatar"></div>
            </div>
        </div>
    </div>
);

export default TopBar;
