import React, { useState } from "react";
import { useChaos } from "../context/ChaosContext";
import { Button } from "../../../WasteManagement/components/Shared";

export default function TaskForm() {
  const { addTask, people, resources } = useChaos();
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [resource, setResource] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!title || !start || !end) return alert("Fill title, start and end");
    addTask({ title, assignee, resource, start, end });
    setTitle(""); setAssignee(""); setResource(""); setStart(""); setEnd("");
  }

  const inputClass = "w-full bg-slate-800/50 border border-slate-700 text-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-sky-500 transition-all text-sm";

  return (
    <div className="glass-panel p-6 rounded-xl border border-white/5 space-y-4">
      <h2 className="text-xl font-semibold text-slate-100">Add New Task</h2>
      <form onSubmit={submit} className="space-y-4">
        <input
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className={inputClass}
        />

        <div className="grid grid-cols-2 gap-4">
          <select value={assignee} onChange={e => setAssignee(e.target.value)} className={inputClass}>
            <option value="">-- Assign Person --</option>
            {people.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select value={resource} onChange={e => setResource(e.target.value)} className={inputClass}>
            <option value="">-- Related Resource --</option>
            {resources.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-slate-400 ml-1">Start Time</label>
            <input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} className={inputClass} />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400 ml-1">End Time</label>
            <input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} className={inputClass} />
          </div>
        </div>

        <Button type="submit" variant="primary" className="w-full">
          Add Task to Schedule
        </Button>
      </form>
    </div>
  );
}
