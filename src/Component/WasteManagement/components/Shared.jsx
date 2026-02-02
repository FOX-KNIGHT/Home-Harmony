import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Icons } from '../Icons';

export const Button = ({ children, onClick, variant = 'primary', disabled = false, className = '', ...props }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`btn-${variant} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        {...props}
    >
        {children}
    </button>
);

export const Card = ({ children, className = '', hover = false, style = {} }) => (
    <div className={`glass-card ${className}`} style={style}>
        {children}
    </div>
);

export const Modal = ({ isOpen, onClose, title, children, actions }) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div className="glass-panel w-full max-w-lg rounded-xl p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-slate-100">{title}</h2>
                    <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                        <Icons.Close className="w-6 h-6 text-slate-400" />
                    </button>
                </div>
                <div className="mb-6 text-slate-300">{children}</div>
                {actions && <div className="flex justify-end gap-3">{actions}</div>}
            </div>
        </div>,
        document.body
    );
};

export const Toast = ({ message }) => {
    if (!message) return null;
    return (
        <div className="fixed bottom-4 right-4 z-50 glass-panel px-6 py-3 rounded-lg text-slate-100 shadow-lg animate-fade-in-up">
            {message}
        </div>
    );
};
