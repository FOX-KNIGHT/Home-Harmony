import React from 'react';
import { Card } from '../WasteManagement/components/Shared';

const History = () => {
    // Mock history data
    const historyData = [
        { id: 1, action: "Joined Queue", detail: "Laundry Room #2", time: "2 hours ago", status: "Completed" },
        { id: 2, action: "Task Completed", detail: "Kitchen Cleanup", time: "Yesterday", status: "Done" },
        { id: 3, action: "Joined Queue", detail: "Bathroom #1", time: "2 days ago", status: "Completed" },
        { id: 4, action: "Alert", detail: "High Water Usage", time: "Last Week", status: "Warning" },
    ];

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Activity History</h1>
                <p className="page-subtitle">Track your past queue activities and system events.</p>
            </div>

            <div className="history-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {historyData.map(item => (
                    <Card key={item.id} className="history-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                        <div className="history-info">
                            <h4 style={{ margin: 0, color: 'white', fontSize: '1.1rem' }}>{item.action}</h4>
                            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>{item.detail}</p>
                        </div>
                        <div className="history-meta" style={{ textAlign: 'right' }}>
                            <span className={`status-badge ${item.status.toLowerCase()}`} style={{
                                display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '1rem',
                                background: item.status === 'Completed' || item.status === 'Done' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                                color: item.status === 'Completed' || item.status === 'Done' ? '#22c55e' : '#eab308',
                                fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.25rem'
                            }}>
                                {item.status}
                            </span>
                            <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{item.time}</div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default History;
