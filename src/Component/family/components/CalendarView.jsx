import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useChaos } from "../context/ChaosContext";
import '../style.css'; // We might need some overrides for dark mode, but for now relying on parent styles

export default function CalendarView() {
  const { tasks, setTasks } = useChaos();

  const events = tasks.map(t => ({
    id: t.id,
    title: t.title,
    start: t.start,
    end: t.end,
    backgroundColor: t.done ? '#475569' : '#0ea5e9',
    borderColor: t.done ? '#334155' : '#0284c7',
  }));

  function handleEventDrop(info) {
    const id = info.event.id;
    const newStart = info.event.start;
    const newEnd = info.event.end;
    setTasks(prev => prev.map(t => t.id === id ? { ...t, start: newStart.toISOString(), end: newEnd ? newEnd.toISOString() : t.end } : t));
  }

  function handleDateSelect(selectInfo) {
    const title = prompt("New task title");
    if (!title) return;
    const start = selectInfo.start.toISOString();
    const end = new Date(selectInfo.start.getTime() + 60 * 60000).toISOString();
    setTasks(prev => [{ id: Math.random().toString(36).slice(2, 9), title, start, end }, ...prev]);
  }

  return (
    <div className="calendar-container text-slate-200" style={{ '--fc-border-color': 'rgba(255,255,255,0.1)', '--fc-page-bg-color': 'transparent' }}>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{ left: 'prev,next today', center: 'title', right: 'timeGridWeek,timeGridDay' }}
        editable
        selectable
        select={handleDateSelect}
        events={events}
        eventDrop={handleEventDrop}
        height="auto"
        themeSystem="standard"
      />
    </div>
  );
}
