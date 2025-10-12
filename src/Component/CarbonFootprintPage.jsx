import React, { useState } from "react";
import { motion } from "framer-motion";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"; // Removed to fix build error

const CarbonFootprintPage = ({ onBack }) => {
  const [inputs, setInputs] = useState({
    plasticBottles: 10,
    foodWaste: 1,
    electricity: 5,
  });
  const [result, setResult] = useState(null);

  const factors = {
    plasticBottles: 0.0828, // kg CO₂ per bottle
    foodWaste: 2.5,         // kg CO₂ per kg food
    electricity: 0.85,      // kg CO₂ per kWh (varies by region)
  };

  const COLORS = ["#60a5fa", "#f87171", "#34d399"]; // Blue, Red, Green

  const handleCalculate = (currentInputs = inputs) => {
    const footprint = {
      plastic: currentInputs.plasticBottles * factors.plasticBottles,
      food: currentInputs.foodWaste * factors.foodWaste,
      electricity: currentInputs.electricity * factors.electricity,
    };
    footprint.total =
      footprint.plastic + footprint.food + footprint.electricity;
    setResult(footprint);
  };
  
  // Initial calculation on load and live recalculation
  useState(() => {
    handleCalculate();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newInputs = { ...inputs, [name]: Number(value) };
    setInputs(newInputs);
    // Recalculate live
    handleCalculate(newInputs);
  };

  const chartData = result
    ? [
        { name: "Plastic Bottles", value: result.plastic },
        { name: "Food Waste", value: result.food },
        { name: "Electricity Usage", value: result.electricity },
      ]
    : [];

  return (
    <motion.div
      key="carbon-footprint"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-neutral-100 text-neutral-900 flex flex-col items-center p-6 font-inter"
    >
      <header className="w-full max-w-3xl flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Carbon Footprint Calculator</h1>
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-md bg-neutral-800 text-white hover:bg-neutral-700"
        >
          ← Back
        </button>
      </header>

      <div className="w-full max-w-3xl bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Enter Your Daily Usage</h2>
        {/* Adjusted grid for better mobile stacking */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium">Plastic Bottles</label>
            <input
              type="number"
              name="plasticBottles"
              value={inputs.plasticBottles}
              onChange={handleChange}
              className="w-full border rounded-md p-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Food Waste (kg)</label>
            <input
              type="number"
              name="foodWaste"
              value={inputs.foodWaste}
              onChange={handleChange}
              className="w-full border rounded-md p-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Electricity (kWh)</label>
            <input
              type="number"
              name="electricity"
              value={inputs.electricity}
              onChange={handleChange}
              className="w-full border rounded-md p-2 mt-1"
            />
          </div>
        </div>

        <p className="text-sm text-neutral-500">Calculated automatically on input change.</p>
      </div>

      {result && (
        <div className="w-full max-w-3xl mt-8 bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Your Impact Breakdown</h2>
          
          <div className="impact-bars-container">
            {chartData.map((entry, index) => (
              <div key={entry.name} className="impact-bar-item">
                <div className="impact-bar-label">
                    {entry.name}: {((entry.value / result.total) * 100).toFixed(1)}%
                </div>
                <div className="impact-bar-track">
                  <div 
                    className="impact-bar-fill" 
                    style={{ 
                      width: `${(entry.value / result.total) * 100}%`,
                      backgroundColor: COLORS[index % COLORS.length]
                    }}
                  ></div>
                </div>
                <div className="impact-bar-value">{entry.value.toFixed(2)} kg CO₂</div>
              </div>
            ))}
          </div>

          <p className="text-lg mb-4 mt-4 text-center">
            🌍 Your total daily carbon footprint is{" "}
            <span className="font-bold text-indigo-600">{result.total.toFixed(2)} kg CO₂</span>.
          </p>
          
          <div className="mt-4 text-sm text-neutral-600 text-center">
            Note: These calculations are based on average emission factors.
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CarbonFootprintPage;