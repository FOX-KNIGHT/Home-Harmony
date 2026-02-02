import React, { useState } from "react";
import { useChaos } from "../context/ChaosContext";
import { Button } from "../../../WasteManagement/components/Shared";
import { Icons } from "../../../WasteManagement/Icons";

export default function PeopleResources() {
  const { people, setPeople, resources, setResources } = useChaos();
  const [p, setP] = useState("");
  const [r, setR] = useState("");

  const addPerson = () => { if (!p) return; setPeople(prev => [...prev, p]); setP(""); };
  const addRes = () => { if (!r) return; setResources(prev => [...prev, { id: r.toLowerCase().replace(/\s+/g, '-'), name: r }]); setR(""); };

  const inputClass = "flex-1 bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-pink-500 transition-all text-sm";
  const listClass = "flex items-center gap-2 p-3 bg-slate-800/30 rounded-lg border border-white/5 text-slate-200 text-sm";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
      <div className="glass-panel p-6 rounded-xl border border-white/5 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <Icons.Users className="text-pink-400 w-5 h-5" />
          <h2 className="text-lg font-semibold text-slate-100">Family Members</h2>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            value={p}
            onChange={e => setP(e.target.value)}
            placeholder="Add person..."
            className={inputClass}
            onKeyDown={e => e.key === 'Enter' && addPerson()}
          />
          <Button onClick={addPerson} variant="primary" className="!p-2">
            <Icons.Plus className="w-5 h-5" />
          </Button>
        </div>

        <ul className="space-y-2 overflow-y-auto flex-1 custom-scrollbar pr-2">
          {people.map(name => (
            <li key={name} className={listClass}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-xs font-bold text-white">
                {name.charAt(0).toUpperCase()}
              </div>
              {name}
            </li>
          ))}
          {people.length === 0 && <li className="text-slate-500 text-center text-sm italic py-4">No family members added</li>}
        </ul>
      </div>

      <div className="glass-panel p-6 rounded-xl border border-white/5 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <Icons.Settings className="text-indigo-400 w-5 h-5" />
          <h2 className="text-lg font-semibold text-slate-100">Resources</h2>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            value={r}
            onChange={e => setR(e.target.value)}
            placeholder="Add resource (e.g. Car)..."
            className={inputClass}
            onKeyDown={e => e.key === 'Enter' && addRes()}
          />
          <Button onClick={addRes} variant="secondary" className="!p-2">
            <Icons.Plus className="w-5 h-5" />
          </Button>
        </div>

        <ul className="space-y-2 overflow-y-auto flex-1 custom-scrollbar pr-2">
          {resources.map(res => (
            <li key={res.id} className={listClass}>
              <div className="p-1.5 bg-indigo-500/20 rounded-md text-indigo-400">
                <Icons.Settings className="w-4 h-4" />
              </div>
              {res.name}
            </li>
          ))}
          {resources.length === 0 && <li className="text-slate-500 text-center text-sm italic py-4">No resources added</li>}
        </ul>
      </div>
    </div>
  );
}
