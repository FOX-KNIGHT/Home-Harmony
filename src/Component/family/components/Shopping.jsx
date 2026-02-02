import React, { useState } from "react";
import { useChaos } from "../context/ChaosContext";
import { Icons } from "../../WasteManagement/Icons";

export default function Shopping() {
  const { shopping, setShopping } = useChaos();
  const [item, setItem] = useState("");

  const add = () => {
    if (!item.trim()) return;
    setShopping(prev => [{ id: Math.random().toString(36).slice(2, 9), name: item }, ...prev]);
    setItem("");
  };

  const remove = (id) => setShopping(prev => prev.filter(i => i.id !== id));

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') add();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex gap-2 mb-4">
        <input
          value={item}
          onChange={e => setItem(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add item..."
          className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
        />
        <button
          onClick={add}
          className="bg-sky-600 hover:bg-sky-500 text-white p-2 rounded-lg transition-colors shadow-lg shadow-sky-900/20"
        >
          <Icons.Plus className="w-5 h-5" />
        </button>
      </div>
      <ul className="space-y-2 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
        {shopping.length === 0 && <p className="text-slate-500 text-center italic mt-4 py-8 border border-dashed border-slate-800 rounded-lg">List is empty</p>}
        {shopping.map(i => (
          <li key={i.id} className="flex justify-between items-center bg-slate-800/30 hover:bg-slate-800/50 p-3 rounded-lg border border-white/5 transition-colors group">
            <span className="text-slate-200">{i.name}</span>
            <button
              className="text-slate-500 hover:text-rose-400 p-1 opacity-0 group-hover:opacity-100 transition-all"
              onClick={() => remove(i.id)}
            >
              <Icons.Close className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
