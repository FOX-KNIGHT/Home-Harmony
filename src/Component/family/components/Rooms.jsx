import React from "react";
import { useChaos } from "../context/ChaosContext";

export default function Rooms() {
  const { rooms, setRooms } = useChaos();
  const update = (id, val) => setRooms(prev => prev.map(r => r.id === id ? { ...r, clutter: val } : r));

  return (
    <div className="space-y-4">
      {rooms.map(r => (
        <div key={r.id} className="bg-slate-800/50 p-4 rounded-xl border border-white/5 hover:bg-slate-800/80 transition-colors">
          <div className="flex justify-between items-center mb-2">
            <strong className="text-slate-200 text-lg font-medium">{r.name}</strong>
            <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider ${r.clutter < 30 ? 'bg-emerald-500/20 text-emerald-400' : r.clutter < 70 ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'}`}>
              Clutter: {r.clutter}%
            </span>
          </div>
          <div className="relative w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full transition-all duration-300 ${r.clutter < 30 ? 'bg-emerald-500' : r.clutter < 70 ? 'bg-amber-500' : 'bg-rose-500'}`}
              style={{ width: `${r.clutter}%` }}
            ></div>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={r.clutter}
            onChange={e => update(r.id, +e.target.value)}
            className="w-full mt-3 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500 hover:accent-sky-400"
          />
        </div>
      ))}
    </div>
  );
}