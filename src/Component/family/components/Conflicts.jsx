import React from "react";
import { useChaos } from "../context/ChaosContext";
import { detectConflicts } from "../utils/conflicts";

export default function Conflicts() {
  const { tasks, updateTask } = useChaos();
  const conflicts = detectConflicts(tasks);

  const autoResolve = (ids) => {
    // push second task by 30 minutes
    const id = ids[1];
    const t = tasks.find(x => x.id === id);
    if (!t) return;
    const newStart = new Date(new Date(t.start).getTime() + 30*60000);
    const newEnd = new Date(new Date(t.end).getTime() + 30*60000);
    updateTask(id, { start: newStart.toISOString(), end: newEnd.toISOString() });
  };

  return (
    <>
      <h2>Conflicts</h2>
      {conflicts.length === 0 ? <div className="small">No conflicts 🎉</div> :
        conflicts.map((c, idx) => (
          <div key={idx} className="list-item" style={{ background: "#fff3e0" }}>
            <div>{c.message}</div>
            {c.ids && <div><button onClick={() => autoResolve(c.ids)} style={{ background: "#d97706" }}>Auto-resolve</button></div>}
          </div>
        ))
      }
    </>
  );
}
