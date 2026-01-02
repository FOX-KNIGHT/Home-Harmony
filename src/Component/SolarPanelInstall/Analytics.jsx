import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, Button } from '../WasteManagement/components/Shared';

const StatBox = ({ value, label, icon, color, className = '' }) => (
    <Card className={`metric-card metric-card--${color} ${className}`}>
        <div className="metric-header">
            <h3 className="metric-title">{label}</h3>
            <span style={{ fontSize: '1.5rem' }}>{icon}</span>
        </div>
        <div className="metric-value">{value}</div>
    </Card>
);

const Analytics = () => {
    const [inputs, setInputs] = useState({ avgBill: 150, solarCost: 25000, systemSize: 7 });
    const [results, setResults] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: Number(value) }));
    };

    const calculateROI = () => {
        const { avgBill, solarCost, systemSize } = inputs;
        const annualKWhSaved = systemSize * 1400; // 1kW saves ~1400 kWh/year
        const estimatedAnnualSavings = annualKWhSaved * (avgBill / (inputs.systemSize * 1500));
        // Rough estimation logic preserved from original
        const breakevenYears = solarCost / estimatedAnnualSavings;
        const tenYearSavings = (estimatedAnnualSavings * 10) - solarCost;
        const annualCo2Avoided = annualKWhSaved * 0.5;

        setResults({
            annualSavings: estimatedAnnualSavings.toFixed(0),
            breakevenYears: breakevenYears.toFixed(1),
            tenYearSavings: tenYearSavings.toFixed(0),
            co2: annualCo2Avoided.toFixed(0),
        });
    };

    const chartData = results
        ? [
            { name: "Cost Offset", value: Number(results.annualSavings) },
            { name: "Current Bill", value: inputs.avgBill * 12 - Number(results.annualSavings) },
        ]
        : [{ name: "Potential Savings", value: 50 }, { name: "Current Spending", value: 50 }];

    const COLORS = ["#3b82f6", "#64748b"];

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">ROI & Savings Calculator</h1>
                <p className="page-subtitle">Estimate your return on investment and financial impact.</p>
            </div>

            <div className="analytics-layout">
                {/* Calculator Input Panel */}
                <Card className="analytics-main">
                    <h2 className="card-title">Input Details</h2>

                    <div className="input-group">
                        <label>Avg. Monthly Electric Bill ($)</label>
                        <input type="number" name="avgBill" value={inputs.avgBill} onChange={handleInputChange} min="50" max="1000" step="10" className="form-input" />
                    </div>

                    <div className="input-group">
                        <label>Estimated System Cost ($)</label>
                        <input type="number" name="solarCost" value={inputs.solarCost} onChange={handleInputChange} min="10000" max="50000" step="1000" className="form-input" />
                    </div>

                    <div className="input-group">
                        <label>System Size (kW)</label>
                        <input type="number" name="systemSize" value={inputs.systemSize} onChange={handleInputChange} min="3" max="15" step="0.5" className="form-input" />
                    </div>

                    <Button
                        onClick={calculateROI}
                        className="calculate-btn"
                        variant="accent"
                        style={{ marginTop: '1.5rem', width: '100%' }}
                    >
                        Calculate ROI & Impact
                    </Button>

                    {results && (
                        <div className="chart-container" style={{ height: '300px', marginTop: '2rem' }}>
                            <h3 className='chart-title' style={{ marginBottom: '1rem', textAlign: 'center' }}>Annual Financial Breakdown</h3>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        dataKey="value"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </Card>

                {/* Results Metrics Sidebar */}
                <div className="analytics-sidebar">
                    <h2 className="panel-heading" style={{ marginBottom: '1rem' }}>Key Results</h2>
                    {results ? (
                        <div className="results-metrics" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <StatBox label="Annual Savings" value={`$${results.annualSavings}`} icon={"$"} color="primary" />
                            <StatBox label="Breakeven Time" value={`${results.breakevenYears} yrs`} icon={"⏳"} color="secondary" />
                            <StatBox label="Net Gain (10yr)" value={`$${results.tenYearSavings}`} icon={"🏆"} color="accent" />
                            <StatBox label="CO₂ Offset" value={`${results.co2} kg`} icon={"🌍"} color="info" />
                        </div>
                    ) : (
                        <div className="placeholder-content" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8', border: '1px dashed #475569', borderRadius: '0.5rem' }}>
                            <div className="placeholder-icon" style={{ fontSize: '2rem', marginBottom: '1rem' }}>👆</div>
                            <p>Enter inputs and calculate to view results here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Analytics;
