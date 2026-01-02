import React, { useState } from 'react';
import { Card, Button } from './components/Shared';

const Reports = () => {
    const [reportPrompt, setReportPrompt] = useState('');
    const [reportResponse, setReportResponse] = useState('');
    // const [isReportLoading, setIsReportLoading] = useState(false); // Unused for now

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Community Reports</h1>
                <p className="page-subtitle">Collaborative issue tracking with blockchain verification</p>
            </div>

            <div className="reports-layout">
                <Card className="recent-reports">
                    <h3 className="card-title">Recent Community Issues</h3>
                    <div className="reports-list">
                        {[
                            {
                                title: 'Overflow at Pine Street',
                                status: 'resolved',
                                reporter: 'Community Member',
                                date: 'Sept 12, 2024',
                                priority: 'high'
                            },
                            {
                                title: 'Recycling contamination reported',
                                status: 'in-progress',
                                reporter: 'Environmental Officer',
                                date: 'Sept 10, 2024',
                                priority: 'medium'
                            }
                        ].map((report, index) => (
                            <div key={index} className="report-item">
                                <div className="report-content">
                                    <div className="report-header">
                                        <h4 className="report-title">{report.title}</h4>
                                        <span className={`status-badge status-badge--${report.status}`}>
                                            {report.status.replace('-', ' ')}
                                        </span>
                                    </div>
                                    <div className="report-meta">
                                        <span>By {report.reporter}</span>
                                        <span>•</span>
                                        <span>{report.date}</span>
                                        <span className={`priority-badge priority-badge--${report.priority}`}>
                                            {report.priority}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="report-generator">
                    <h3 className="card-title">AI Report Assistant</h3>
                    <div className="form-group">
                        <label className="form-label">Describe the issue</label>
                        <textarea
                            className="form-textarea"
                            rows="4"
                            placeholder="Describe the waste management issue in detail..."
                            value={reportPrompt}
                            onChange={(e) => setReportPrompt(e.target.value)}
                        />
                    </div>
                    <Button
                        /* Simplified button logic for presentation */
                        className="report-generate-btn"
                        onClick={() => setReportResponse('This is a simulated AI generated report based on your input.')}
                    >
                        {'Generate Report'}
                    </Button>

                    {/* Mocked response for demo */}
                    {reportResponse && (
                        <div className="report-result">
                            <h4 className="result-title">Generated Report</h4>
                            <div className="result-content">{reportResponse}</div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default Reports;
