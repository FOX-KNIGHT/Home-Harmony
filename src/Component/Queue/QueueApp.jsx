import React, { useState } from "react";
import QueueForm from "./components/QueueForm";
import QueueList from "./components/QueueList";
import Notification from "./components/Notification";
import { predictWaitTime } from "./services/predictor";

const QueueApp = () => {
  const [queue, setQueue] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [slots, setSlots] = useState([
    { id: 1, busy: false, user: null },
    { id: 2, busy: false, user: null }
  ]); // Example: 2 slots

  // Add user to queue
  const addToQueue = (name, serviceType) => {
    const waitTime = predictWaitTime(queue.length);
    const newEntry = { id: Date.now(), name, serviceType, waitTime };
    setQueue((prev) => [...prev, newEntry]);
    setNotifications((prev) => [
      ...prev,
      `Hi ${name}, your estimated wait time is ${waitTime} minutes.`
    ]);

    assignToSlot(); 
  };


  const assignToSlot = () => {
    setSlots((prevSlots) => {
      const updated = [...prevSlots];
      for (let i = 0; i < updated.length; i++) {
        if (!updated[i].busy && queue.length > 0) {
          const nextUser = queue[0];
          updated[i] = { ...updated[i], busy: true, user: nextUser };
          setQueue((q) => q.slice(1)); 
          setNotifications((prev) => [
            ...prev,
            `${nextUser.name} is now being served at Slot ${updated[i].id}`
          ]);
        }
      }
      return updated;
    });
  };

  
  const serveSlot = (slotId) => {
    setSlots((prev) =>
      prev.map((s) =>
        s.id === slotId ? { ...s, busy: false, user: null } : s
      )
    );
    setNotifications((prev) => [
      ...prev,
      `Slot ${slotId} is now free.`
    ]);

    assignToSlot(); 
  };

  return (
    <div className="app">
      <h1>Smart Queue & Appointment System</h1>
      <QueueForm onAdd={addToQueue} />
      
      <div className="slots">
        <h2>Service Slots</h2>
        <ul>
          {slots.map((slot) => (
            <li key={slot.id}>
              {slot.busy ? (
                <>
                  <strong>Slot {slot.id}:</strong> Serving {slot.user.name} ({slot.user.serviceType})
                  <button onClick={() => serveSlot(slot.id)}>Done</button>
                </>
              ) : (
                <strong>Slot {slot.id}:</strong> 
              )}
            </li>
          ))}
        </ul>
      </div>

      <QueueList queue={queue} onServe={() => {}} /> 
      {/* Queue still shows waiting users */}
      
      <Notification messages={notifications} />
    </div>
  );
};

export default QueueApp;
