import React from "react";
import { useChaos } from "../context/ChaosContext";
import { detectConflicts } from "../utils/conflicts";
import { Icons } from "../../../WasteManagement/Icons";

export default function Conflicts() {
  const { tasks, updateTask } = useChaos();
  const conflicts = detectConflicts(tasks);

  const autoResolve = (ids) => {
    // push second task by 30 minutes
    const id = ids[1];
    const t = tasks.find(x => x.id === id);
    if (!t) return;
    const newStart = new Date(new Date(t.start).getTime() + 30 * 60000);
    const newEnd = new Date(new Date(t.end).getTime() + 30 * 60000);
    updateTask(id, { start: newStart.toISOString(), end: newEnd.toISOString() });
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-semibold text-slate-100 mb-4 flex items-center gap-2">
        <Icons.AlertTriangle className="text-amber-500" />
        Detected Conflicts
      </h2>

      <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2">
        {conflicts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-500 border border-dashed border-slate-700 rounded-xl bg-slate-800/20">
            <Icons.Smile className="w-12 h-12 mb-2 opacity-50 text-emerald-500" />
            <p>No conflicts detected! 🎉</p>
          </div>
        ) : (
          conflicts.map((c, idx) => (
            <div key={idx} className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-amber-500">
                  <Icons.AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-amber-200 text-sm font-medium">{c.message}</p>
                  <p className="text-amber-500/60 text-xs mt-1">Conflict between tasks sharing the same resource/person.</p>
                </div>
              </div>

              {c.ids && (
                <button
                  onClick={() => autoResolve(c.ids)}
                  className="shrink-0 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-xs font-bold rounded-lg transition-colors border border-amber-500/20"
                >
                  Auto-Resolve
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
