import React from "react";
import { useChaos } from "../context/ChaosContext";

export default function Rooms() {
  const { rooms, setRooms } = useChaos();
  const update = (id, val) => setRooms(prev => prev.map(r => r.id === id ? { ...r, clutter: val } : r));

  return (
    <div className="space-y-4">
      {rooms.map(r => (
        <div key={r.id} className="bg-[#0f172a] p-4 rounded-lg border border-slate-700">
          <div className="flex justify-between items-center mb-2">
            <strong className="text-white text-lg">{r.name}</strong>
            <span className={`text-sm font-medium px-2 py-1 rounded-full ${r.clutter < 30 ? 'bg-green-500/20 text-green-400' : r.clutter < 70 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
              Clutter: {r.clutter}%
            </span>
          </div>
          <div className="relative w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full transition-all duration-300 ${r.clutter < 30 ? 'bg-green-500' : r.clutter < 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${r.clutter}%` }}
            ></div>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={r.clutter}
            onChange={e => update(r.id, +e.target.value)}
            className="w-full mt-3 accent-purple-500 bg-transparent cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
}