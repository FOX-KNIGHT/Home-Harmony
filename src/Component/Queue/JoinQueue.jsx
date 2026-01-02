import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import QueueForm from './components/QueueForm';
import { Card } from '../WasteManagement/components/Shared';

const JoinQueue = () => {
    const { addToQueue } = useOutletContext();
    const navigate = useNavigate();

    const handleJoin = (name, serviceType) => {
        addToQueue(name, serviceType);
        // Optional: navigate back to dashboard or show success message
        navigate('/queue');
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>Join the Queue</h2>
            <Card>
                <div style={{ padding: '1rem' }}>
                    <p style={{ marginBottom: '1.5rem', color: '#94a3b8', textAlign: 'center' }}>
                        Enter your details below to secure your spot. Estimated wait times are updated in real-time.
                    </p>
                    {/* Reusing existing QueueForm but wrapping logic */}
                    <QueueForm onAdd={handleJoin} />
                </div>
            </Card>
        </div>
    );
};

export default JoinQueue;
