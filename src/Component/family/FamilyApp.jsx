import React from "react";
import { ChaosProvider } from "./context/ChaosContext";
import Rooms from "./components/Rooms";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Shopping from "./components/Shopping";
import PeopleResources from "./components/PeopleResources";
import Conflicts from "./components/Conflicts";
import CalendarView from "./components/CalendarView";
// import "./style.css"; // Removed legacy styles

export default function FamilyApp() {
  return (
    <ChaosProvider>
      <div className="wrap">
        <header className="top">
          <h1>🏡 Household Chaos Manager</h1>
          <p className="muted">Cozy home dashboard — rooms, tasks, shopping, calendar</p>
        </header>

        <main className="main-grid">
          <div className="panel">
            <Rooms />
          </div>

          <div className="panel">
            <TaskForm />
          </div>

          <div className="panel">
            <TaskList />
          </div>

          <div className="panel">
            <Shopping />
          </div>

          <div className="panel calendar-panel">
            <CalendarView />
          </div>

          <div className="panel">
            <Conflicts />
          </div>

          <div className="panel">
            <PeopleResources />
          </div>
        </main>

        <footer style={{ padding: 16, textAlign: "center", color: "var(--muted)" }}>
          Local demo — data saved in your browser.
        </footer>
      </div>
    </ChaosProvider>
  );
}
