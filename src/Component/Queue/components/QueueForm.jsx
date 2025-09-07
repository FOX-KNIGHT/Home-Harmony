import React, { useState } from "react";
import { motion } from "framer-motion";

const formStyle = {
  form: {
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
    justifyContent: "center",
  },
  input: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    flex: 1,
  },
  select: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "6px",
  },
  button: {
    background: "#3498db",
    color: "white",
    padding: "10px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

const QueueForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [serviceType, setServiceType] = useState("Hospital");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name, serviceType);
    setName("");
  };

  return (
    <motion.form
      style={formStyle.form}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={formStyle.input}
      />
      <select
        value={serviceType}
        onChange={(e) => setServiceType(e.target.value)}
        style={formStyle.select}
      >
        <option value="Hospital">Hospital</option>
        <option value="Salon">Salon</option>
        <option value="Bank">Bank</option>
      </select>
      <motion.button
        type="submit"
        style={formStyle.button}
        whileHover={{ scale: 1.05, backgroundColor: "#2980b9" }}
        whileTap={{ scale: 0.95 }}
      >
        Join Queue
      </motion.button>
    </motion.form>
  );
};

export default QueueForm;
