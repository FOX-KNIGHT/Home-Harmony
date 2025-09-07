import React from "react";
import { useChaos } from "../context/ChaosContext";

export default function Rooms() {
  const { rooms, setRooms } = useChaos();
  const update = (id, val) => setRooms(prev => prev.map(r => r.id === id ? { ...r, clutter: val } : r));
  return (
    <>
      <h2>Rooms</h2>
      <div>
        {rooms.map(r => (
          <div key={r.id} className="list-item">
            <div>
              <strong>{r.name}</strong>
              <div className="small">Clutter: {r.clutter}%</div>
            </div>
            <div>
              <input type="range" min="0" max="100" value={r.clutter} onChange={e => update(r.id, +e.target.value)} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
