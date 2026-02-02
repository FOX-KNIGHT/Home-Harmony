import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, Button } from '../WasteManagement/components/Shared';

const StatBox = ({ value, label, icon, color }) => (
    <div className={`p-4 rounded-xl border border-white/5 bg-slate-800/50 flex flex-col items-center text-center hover:bg-slate-800/80 transition-colors`}>
        <div className="text-2xl mb-2">{icon}</div>
        <div className="text-2xl font-bold text-slate-100 mb-1">{value}</div>
        <div className="text-xs text-slate-400 font-medium uppercase tracking-wide">{label}</div>
    </div>
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

    const COLORS = ["#0ea5e9", "#475569"]; // Sky 500, Slate 600

    return (
        <div className="min-h-screen p-6 md:p-8 max-w-7xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">ROI & Savings Calculator</h1>
                <p className="text-slate-400 text-lg">Estimate your return on investment and financial impact.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Calculator Input Panel */}
                <Card className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-semibold text-slate-100">Input Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-400">Avg. Monthly Bill ($)</label>
                            <input
                                type="number"
                                name="avgBill"
                                value={inputs.avgBill}
                                onChange={handleInputChange}
                                min="50" max="1000" step="10"
                                className="w-full bg-slate-800/50 border border-slate-700 text-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-sky-500 transition-all font-mono"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-400">System Cost ($)</label>
                            <input
                                type="number"
                                name="solarCost"
                                value={inputs.solarCost}
                                onChange={handleInputChange}
                                min="10000" max="50000" step="1000"
                                className="w-full bg-slate-800/50 border border-slate-700 text-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-sky-500 transition-all font-mono"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-400">System Size (kW)</label>
                            <input
                                type="number"
                                name="systemSize"
                                value={inputs.systemSize}
                                onChange={handleInputChange}
                                min="3" max="15" step="0.5"
                                className="w-full bg-slate-800/50 border border-slate-700 text-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-sky-500 transition-all font-mono"
                            />
                        </div>
                    </div>

                    <Button
                        onClick={calculateROI}
                        variant="primary"
                        className="w-full py-4 text-lg font-bold shadow-lg shadow-sky-900/20"
                    >
                        Calculate ROI & Impact
                    </Button>

                    {results && (
                        <div className="h-[350px] mt-8 bg-slate-800/30 rounded-xl p-4 border border-white/5">
                            <h3 className='text-center text-slate-300 font-medium mb-4'>Annual Financial Breakdown</h3>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0.1)" />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
                                        itemStyle={{ color: '#cbd5e1' }}
                                    />
                                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: '20px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </Card>

                {/* Results Metrics Sidebar */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-slate-100 px-1">Key Results</h2>
                    {results ? (
                        <div className="grid grid-cols-1 gap-4">
                            <StatBox label="Annual Savings" value={`$${results.annualSavings}`} icon={"💰"} color="primary" />
                            <StatBox label="Breakeven Time" value={`${results.breakevenYears} yrs`} icon={"⏳"} color="secondary" />
                            <StatBox label="Net Gain (10yr)" value={`$${results.tenYearSavings}`} icon={"📈"} color="accent" />
                            <StatBox label="CO₂ Offset" value={`${results.co2} kg`} icon={"🌱"} color="info" />
                        </div>
                    ) : (
                        <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center text-slate-500 flex flex-col items-center justify-center h-64">
                            <div className="text-4xl mb-4 opacity-50">👆</div>
                            <p>Enter inputs and click "Calculate" to view projected savings.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Analytics;
