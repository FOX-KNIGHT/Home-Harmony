import React, { useState } from "react";
import { useChaos } from "../context/ChaosContext";

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

  return (
    <>
      <h2>Add Task</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 8 }}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <select value={assignee} onChange={e => setAssignee(e.target.value)}>
          <option value="">-- Person (optional) --</option>
          {people.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select value={resource} onChange={e => setResource(e.target.value)}>
          <option value="">-- Resource (optional) --</option>
          {resources.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>
        <div style={{ display: "flex", gap: 8 }}>
          <input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} />
          <input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} />
        </div>
        <button type="submit">Add</button>
      </form>
    </>
  );
}
