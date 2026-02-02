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
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-100">Tasks</h2>
      <div className="space-y-3">
        {tasks.length === 0 && <div className="text-slate-500 italic text-center py-4 border border-dashed border-slate-700 rounded-lg">No tasks yet</div>}
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

          const detail = `${t.assignee || "Unassigned"} ${resourceName ? '• ' + resourceName : ''}`;
          const time = t.start ? formatTime(t.start) : '';

          return (
            <div
              key={t.id}
              className={`
                group flex items-center justify-between p-4 rounded-xl border transition-all duration-300
                ${isDone
                  ? 'bg-slate-800/30 border-transparent opacity-60'
                  : 'bg-slate-800/50 border-white/5 hover:border-white/10 hover:bg-slate-800/80 shadow-sm'}
              `}
            >
              <div className="flex-1 min-w-0 pr-4">
                <div className={`font-medium truncate ${isDone ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                  {t.title}
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                  {time && <span className="bg-slate-700/50 px-2 py-0.5 rounded text-slate-300">{time}</span>}
                  <span>{detail}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => updateTask(t.id, { done: !t.done })}
                  className={`
                        px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors
                        ${isDone
                      ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/20'}
                    `}
                >
                  {isDone ? "Undo" : "Complete"}
                </button>
                <button
                  onClick={() => removeTask(t.id)}
                  className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Delete"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path></svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
