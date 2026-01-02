import React from 'react';
import { useOutletContext } from 'react-router-dom';
import QueueList from './components/QueueList';
import Notification from './components/Notification';
import { Card, Button } from '../WasteManagement/components/Shared';
import { Icons } from '../WasteManagement/Icons';

const Dashboard = () => {
    const { queue, slots, notifications, serveSlot } = useOutletContext();

    return (
        <div className="dashboard-grid">
            {/* Service Slots */}
            <div className="dashboard-section" style={{ gridColumn: '1 / -1' }}>
                <h2 className="section-title">Active Service Slots</h2>
                <div className="stats-grid">
                    {slots.map((slot) => (
                        <Card key={slot.id} className={`stat-card ${slot.busy ? 'stat-card--busy' : 'stat-card--free'}`} style={{ borderColor: slot.busy ? '#ef4444' : '#22c55e' }}>
                            <div className="stat-card__header">
                                <span className="stat-card__label">Slot {slot.id}</span>
                                <div className={`status-indicator ${slot.busy ? 'status-busy' : 'status-free'}`}>
                                    {slot.busy ? 'Busy' : 'Available'}
                                </div>
                            </div>
                            <div className="stat-card__value" style={{ fontSize: '1.2rem', margin: '1rem 0' }}>
                                {slot.busy ? (
                                    <span>Serving: <strong>{slot.user.name}</strong></span>
                                ) : (
                                    <span style={{ color: '#94a3b8' }}>Waiting for user...</span>
                                )}
                            </div>
                            {slot.busy && (
                                <div className="stat-card__footer">
                                    <span className="text-sm">{slot.user.serviceType}</span>
                                    <Button size="sm" variant="danger" onClick={() => serveSlot(slot.id)}>
                                        Complete
                                    </Button>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            </div>

            {/* Waiting List */}
            <div className="dashboard-section" style={{ gridColumn: 'span 8' }}>
                <h2 className="section-title">Waiting Details</h2>
                <QueueList queue={queue} onServe={() => { }} />
            </div>

            {/* Notifications */}
            <div className="dashboard-section" style={{ gridColumn: 'span 4' }}>
                <h2 className="section-title">Notifications</h2>
                <Notification messages={notifications} />
            </div>
        </div>
    );
};

export default Dashboard;
