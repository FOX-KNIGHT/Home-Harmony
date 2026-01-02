import React from 'react';
import { Card, Button } from '../WasteManagement/components/Shared';

const AIDesign = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">AI System Design Consultation</h1>
                <p className="page-subtitle">Use AI to generate optimal panel layout and size recommendations.</p>
            </div>

            <div className="reports-layout" style={{ display: 'grid', gap: '2rem' }}>
                <Card className="report-generator">
                    <h3 className="card-title" style={{ marginBottom: '1rem' }}>AI Design Prompt</h3>
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>Describe your roof/needs</label>
                        <textarea
                            className="form-textarea"
                            rows="4"
                            placeholder="E.g., South-facing roof, 2-story house, maximum output required..."
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: '#1e293b', border: '1px solid #334155', color: 'white', fontFamily: 'inherit' }}
                        />
                    </div>
                    <Button
                        onClick={() => alert("Simulating AI Design...")}
                        className="report-generate-btn"
                        variant="accent"
                    >
                        Generate Optimal Design
                    </Button>
                    <div className="report-result" style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '0.5rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                        <h4 className="result-title" style={{ color: '#60a5fa', marginBottom: '0.5rem' }}>AI Recommendation (Placeholder)</h4>
                        <div className="result-content" style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
                            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
                                <li><strong>System Size:</strong> 8.5 kW recommended.</li>
                                <li><strong>Layout:</strong> 18 panels on the south-facing roof, 6 on west-facing.</li>
                                <li><strong>Expected Annual Output:</strong> 12,000 kWh.</li>
                            </ul>
                        </div>
                    </div>
                </Card>

                <Card className="recent-reports">
                    <h3 className="card-title" style={{ marginBottom: '1rem' }}>Roof Image Classifier</h3>
                    <div className="classifier-upload" style={{ textAlign: 'center', padding: '2rem', border: '2px dashed #334155', borderRadius: '1rem' }}>
                        <div className="upload-content" style={{ marginBottom: '1.5rem' }}>
                            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>📷</span>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Upload Roof Photo</h3>
                            <p style={{ color: '#94a3b8' }}>Get instant feedback on roof condition and size.</p>
                        </div>
                        <Button variant="secondary" onClick={() => document.getElementById('roof-image-upload')?.click()}>
                            Select Image
                        </Button>
                        <input id="roof-image-upload" type="file" style={{ display: 'none' }} />
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AIDesign;
