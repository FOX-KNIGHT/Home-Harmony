import React from "react";
import { useChaos } from "../context/ChaosContext";

export default function TaskList() {
  const { tasks, updateTask, removeTask } = useChaos();
  
  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort done tasks to the bottom
    if (a.done && !b.done) return 1;
    if (!a.done && b.done) return -1;
    // Sort undated tasks last
    if (!a.start && b.start) return 1;
    if (a.start && !b.start) return -1;
    if (!a.start && !b.start) return 0;
    // Sort dated tasks by start date
    return new Date(a.start) - new Date(b.start);
  });

  return (
    <>
      <h2>Tasks</h2>
      <div>
        {tasks.length === 0 && <div className="small">No tasks yet</div>}
        {sortedTasks.map(t => {
          const isDone = t.done;
          const resourceName = t.resource ? tasks.find(res => res.id === t.resource)?.name || t.resource : '';
          
          const formatTime = (isoString) => {
            if (!isoString) return 'N/A';
            const date = new Date(isoString);
            return date.toLocaleDateString() === new Date().toLocaleDateString() 
              ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              : date.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
          };

          const detail = `${t.assignee || "Unassigned"} ${resourceName ? '• ' + resourceName : ''} • ${formatTime(t.start)}`;
          
          return (
            <div 
              key={t.id} 
              className="list-item" 
              style={{ opacity: isDone ? 0.6 : 1, textDecoration: isDone ? 'line-through' : 'none' }}
            >
              <div className="list-item-content">
                <div style={{ fontWeight: 600 }}>{t.title}</div>
                <div className="small">{detail}</div>
              </div>
              <div className="list-item-actions">
                <button onClick={() => updateTask(t.id, { done: !t.done })} style={{ background: isDone ? "gray" : "var(--success)" }}>
                  {isDone ? "Undone" : "Done"}
                </button>
                <button onClick={() => removeTask(t.id)} style={{ background: "#ef4444" }}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}