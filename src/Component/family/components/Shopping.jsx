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
          className="flex-1 bg-[#0f172a] border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
        />
        <button
          onClick={add}
          className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors"
        >
          <Icons.Plus />
        </button>
      </div>
      <ul className="space-y-2 overflow-y-auto max-h-[300px] pr-2">
        {shopping.length === 0 && <p className="text-slate-500 text-center italic mt-4">List is empty</p>}
        {shopping.map(i => (
          <li key={i.id} className="flex justify-between items-center bg-[#0f172a] p-3 rounded-lg border border-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <span className="text-slate-200">{i.name}</span>
            <button
              className="text-slate-500 hover:text-red-400 p-1"
              onClick={() => remove(i.id)}
            >
              <Icons.Close />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
