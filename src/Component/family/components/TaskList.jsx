import React from "react";
import { useChaos } from "../context/ChaosContext";

export default function TaskList() {
  const { tasks, updateTask, removeTask } = useChaos();
  return (
    <>
      <h2>Tasks</h2>
      <div>
        {tasks.length === 0 && <div className="small">No tasks yet</div>}
        {tasks.map(t => (
          <div key={t.id} className="list-item">
            <div>
              <div style={{ fontWeight: 600 }}>{t.title}</div>
              <div className="small">{t.assignee || "Unassigned"} • {new Date(t.start).toLocaleString()}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => updateTask(t.id, { done: !t.done })} style={{ background: t.done ? "gray" : "var(--success)" }}>
                {t.done ? "Undone" : "Done"}
              </button>
              <button onClick={() => removeTask(t.id)} style={{ background: "#ef4444" }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
