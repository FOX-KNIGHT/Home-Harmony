import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Leaf, RefreshCcw, Zap, Trash2, Droplet, ArrowRight, Save } from "lucide-react";

const CarbonFootprintPage = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    plasticBottles: 10,
    foodWaste: 1,
    electricity: 5,
    transport: 20, // km driven
    water: 100 // liters
  });
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('calculator'); // calculator, tips, history

  // Expanded factors
  const factors = {
    plasticBottles: 0.0828, // kg CO2 per bottle
    foodWaste: 2.5,         // kg CO2 per kg food
    electricity: 0.85,      // kg CO2 per kWh
    transport: 0.12,        // kg CO2 per km (avg car)
    water: 0.001            // kg CO2 per liter (treatment/pumping)
  };

  const COLORS = ["#00f2ff", "#ff00ff", "#00ff9d", "#ffb800", "#7000ff"]; // Neon Cyan, Magenta, Lime, Gold, Purple

  useEffect(() => {
    handleCalculate();
  }, [inputs]);

  const handleCalculate = () => {
    const footprint = {
      plastic: inputs.plasticBottles * factors.plasticBottles,
      food: inputs.foodWaste * factors.foodWaste,
      electricity: inputs.electricity * factors.electricity,
      transport: inputs.transport * factors.transport,
      water: inputs.water * factors.water
    };
    footprint.total = Object.values(footprint).reduce((a, b) => a + b, 0);
    setResult(footprint);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: Math.max(0, Number(value)) }));
  };

  const chartData = result
    ? [
      { name: "Plastic", value: result.plastic, icon: Trash2 },
      { name: "Food", value: result.food, icon: Leaf },
      { name: "Energy", value: result.electricity, icon: Zap },
      { name: "Transport", value: result.transport, icon: ArrowRight },
      { name: "Water", value: result.water, icon: Droplet },
    ]
    : [];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/90 border border-slate-700 p-3 rounded-lg backdrop-blur-md shadow-xl">
          <p className="font-bold text-white mb-1">{payload[0].name}</p>
          <p className="text-cyan-400 font-mono">
            {payload[0].value.toFixed(2)} kg CO₂
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-12 font-sans overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2"
            >
              EcoTracker AI
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg"
            >
              Monitor and reduce your daily carbon footprint.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-4"
          >
            <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-4 rounded-xl flex items-center gap-4">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Daily Goal</p>
                <p className="text-xl font-bold text-white">15.0 <span className="text-xs text-slate-500">kg</span></p>
              </div>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${result?.total < 15 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {result?.total < 15 ? <Leaf size={20} /> : <Zap size={20} />}
              </div>
            </div>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <RefreshCcw className="text-cyan-400" size={20} />
                Daily Activity Input
              </h2>

              <div className="space-y-6">
                {/* Input Group: Plastic */}
                <div className="group">
                  <div className="flex justify-between mb-2">
                    <label className="text-slate-300 text-sm flex items-center gap-2">
                      <Trash2 size={16} className="text-cyan-400" /> Plastic Bottles
                    </label>
                    <span className="text-cyan-400 font-mono text-sm">{inputs.plasticBottles}</span>
                  </div>
                  <input
                    type="range"
                    name="plasticBottles"
                    min="0" max="50"
                    value={inputs.plasticBottles}
                    onChange={handleChange}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                {/* Input Group: Food */}
                <div className="group">
                  <div className="flex justify-between mb-2">
                    <label className="text-slate-300 text-sm flex items-center gap-2">
                      <Leaf size={16} className="text-pink-500" /> Food Waste (kg)
                    </label>
                    <span className="text-pink-500 font-mono text-sm">{inputs.foodWaste}</span>
                  </div>
                  <input
                    type="range"
                    name="foodWaste"
                    min="0" max="10" step="0.1"
                    value={inputs.foodWaste}
                    onChange={handleChange}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                </div>

                {/* Input Group: Electricity */}
                <div className="group">
                  <div className="flex justify-between mb-2">
                    <label className="text-slate-300 text-sm flex items-center gap-2">
                      <Zap size={16} className="text-yellow-400" /> Electricity (kWh)
                    </label>
                    <span className="text-yellow-400 font-mono text-sm">{inputs.electricity}</span>
                  </div>
                  <input
                    type="range"
                    name="electricity"
                    min="0" max="50" step="1"
                    value={inputs.electricity}
                    onChange={handleChange}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                  />
                </div>

                {/* Input Group: Transport */}
                <div className="group">
                  <div className="flex justify-between mb-2">
                    <label className="text-slate-300 text-sm flex items-center gap-2">
                      <ArrowRight size={16} className="text-purple-400" /> Transport (km)
                    </label>
                    <span className="text-purple-400 font-mono text-sm">{inputs.transport}</span>
                  </div>
                  <input
                    type="range"
                    name="transport"
                    min="0" max="200"
                    value={inputs.transport}
                    onChange={handleChange}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-400"
                  />
                </div>

                {/* Input Group: Water */}
                <div className="group">
                  <div className="flex justify-between mb-2">
                    <label className="text-slate-300 text-sm flex items-center gap-2">
                      <Droplet size={16} className="text-blue-400" /> Water Usage (L)
                    </label>
                    <span className="text-blue-400 font-mono text-sm">{inputs.water}</span>
                  </div>
                  <input
                    type="range"
                    name="water"
                    min="0" max="500"
                    value={inputs.water}
                    onChange={handleChange}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-400"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white p-4 rounded-xl font-bold shadow-lg shadow-cyan-500/20 transition-all active:scale-95 flex justify-center items-center gap-2"
                onClick={() => alert("Data saved to history!")}
              >
                <Save size={18} /> Save Log
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 p-4 rounded-xl font-bold transition-all active:scale-95"
              >
                Dashboard
              </button>
            </div>
          </motion.div>

          {/* Visualization Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7 flex flex-col gap-8"
          >
            {/* Main Stats Card */}
            <div className="bg-[#1e293b]/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-8 h-full">
                <div className="text-center md:text-left z-10">
                  <p className="text-slate-400 mb-2">Your Total Footprint</p>
                  <div className="text-6xl md:text-7xl font-bold text-white tracking-tight mb-2">
                    {result?.total.toFixed(1)}
                    <span className="text-2xl text-slate-500 ml-2 font-normal">kg CO₂</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
                    <div className={`w-2 h-2 rounded-full ${result?.total < 15 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-xs text-slate-300">
                      {result?.total < 15 ? 'Within sustainable limits' : 'High impact warning'}
                    </span>
                  </div>
                </div>

                <div className="h-64 w-full md:w-1/2 min-w-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0.2)" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Breakdown Bar Chart */}
            <div className="bg-[#1e293b]/50 backdrop-blur-md border border-slate-700/30 rounded-2xl p-6 h-64">
              <h3 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">Comparative Breakdown</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 12 }} width={80} />
                  <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<CustomTooltip />} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CarbonFootprintPage;