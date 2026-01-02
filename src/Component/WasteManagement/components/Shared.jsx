import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Icons } from '../Icons';

export const Button = ({ children, onClick, variant = 'primary', disabled = false, className = '', ...props }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`btn btn--${variant} ${className} ${disabled ? 'btn--loading' : ''}`}
        {...props}
    >
        {children}
    </button>
);

export const Card = ({ children, className = '', hover = false, style = {} }) => (
    <div className={`card ${hover ? 'card--hover' : ''} ${className}`} style={style}>
        {children}
    </div>
);

export const Modal = ({ isOpen, onClose, title, children, actions }) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-container" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                    <button onClick={onClose} className="modal-close">
                        <Icons.Close />
                    </button>
                </div>
                <div className="modal-content">{children}</div>
                {actions && <div className="modal-actions">{actions}</div>}
            </div>
        </div>,
        document.body
    );
};

export const Toast = ({ message }) => {
    if (!message) return null;
    return <div className="toast">{message}</div>;
};
