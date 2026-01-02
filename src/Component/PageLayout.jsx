import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Reuse existing styles for now

const PageLayout = ({ children, className = '', backPath = '/', backLabel = 'Back to Services' }) => {
    const navigate = useNavigate();

    return (
        <div className={`fullscreen-modal ${className}`}>
            <button
                className="fullscreen-back-btn"
                onClick={() => navigate(backPath)}
                title={backLabel}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H6m0 0l6 6m-6-6l6-6" />
                </svg>
                <span>{backLabel}</span>
            </button>

            {/* Close button that also goes back, or we can remove it if redundant */}
            <button
                className="fullscreen-close-btn"
                onClick={() => navigate(backPath)}
                title="Close"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>

            <div className={`${className.split(' ')[0]}-container`}>
                {children}
            </div>
        </div>
    );
};

export default PageLayout;
