import React, { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const CarbonFootprintPage = ({ onBack }) => {
  const [inputs, setInputs] = useState({
    plasticBottles: 0,
    foodWaste: 0,
    electricity: 0,
  });
  const [result, setResult] = useState(null);

  const factors = {
    plasticBottles: 0.0828, // kg CO₂ per bottle
    foodWaste: 2.5,         // kg CO₂ per kg food
    electricity: 0.85,      // kg CO₂ per kWh (varies by region)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: Number(value) });
  };

  const handleCalculate = () => {
    const footprint = {
      plastic: inputs.plasticBottles * factors.plasticBottles,
      food: inputs.foodWaste * factors.foodWaste,
      electricity: inputs.electricity * factors.electricity,
    };
    footprint.total =
      footprint.plastic + footprint.food + footprint.electricity;
    setResult(footprint);
  };

  const chartData = result
    ? [
        { name: "Plastic", value: result.plastic },
        { name: "Food Waste", value: result.food },
        { name: "Electricity", value: result.electricity },
      ]
    : [];

  const COLORS = ["#60a5fa", "#f87171", "#34d399"];

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

        <motion.button
          onClick={handleCalculate}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md"
        >
          Calculate
        </motion.button>
      </div>

      {result && (
        <div className="w-full max-w-3xl mt-8 bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Your Impact</h2>
          <p className="text-lg mb-4">
            🌍 Your total daily carbon footprint is{" "}
            <span className="font-bold">{result.total.toFixed(2)} kg CO₂</span>.
          </p>

          <PieChart width={400} height={300}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      )}
    </motion.div>
  );
};

export default CarbonFootprintPage;
