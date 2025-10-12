import React, { createContext, useContext, useEffect, useState } from "react";

const ChaosContext = createContext();
export const useChaos = () => useContext(ChaosContext);

const LS = {
  rooms: "hc_rooms",
  tasks: "hc_tasks",
  shopping: "hc_shopping",
  people: "hc_people",
  resources: "hc_res"
};

const uid = () => Math.random().toString(36).slice(2, 9);

export function ChaosProvider({ children }) {
  const [rooms, setRooms] = useState(() => {
    const raw = localStorage.getItem(LS.rooms);
    if (raw) return JSON.parse(raw);
    return [
      { id: "kitchen", name: "Kitchen", clutter: 30 },
      { id: "living", name: "Living Room", clutter: 45 },
      { id: "bedroom", name: "Bedroom", clutter: 20 }
    ];
  });

  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem(LS.tasks) || "[]"));
  const [shopping, setShopping] = useState(() => JSON.parse(localStorage.getItem(LS.shopping) || "[]"));
  const [people, setPeople] = useState(() => JSON.parse(localStorage.getItem(LS.people) || '["Alex","Sam"]'));
  const [resources, setResources] = useState(() => JSON.parse(localStorage.getItem(LS.resources) || '[{"id":"vacuum","name":"Vacuum"},{"id":"washer","name":"Washing Machine"}]'));

  useEffect(() => localStorage.setItem(LS.rooms, JSON.stringify(rooms)), [rooms]);
  useEffect(() => localStorage.setItem(LS.tasks, JSON.stringify(tasks)), [tasks]);
  useEffect(() => localStorage.setItem(LS.shopping, JSON.stringify(shopping)), [shopping]);
  useEffect(() => localStorage.setItem(LS.people, JSON.stringify(people)), [people]);
  useEffect(() => localStorage.setItem(LS.resources, JSON.stringify(resources)), [resources]);

  const addTask = (task) => setTasks(prev => [{ ...task, id: uid() }, ...prev]);
  const updateTask = (id, patch) => setTasks(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t));
  const removeTask = (id) => setTasks(prev => prev.filter(t => t.id !== id));

  const value = {
    rooms, setRooms,
    tasks, setTasks, addTask, updateTask, removeTask,
    shopping, setShopping,
    people, setPeople,
    resources, setResources
  };

  return <ChaosContext.Provider value={value}>{children}</ChaosContext.Provider>;
}