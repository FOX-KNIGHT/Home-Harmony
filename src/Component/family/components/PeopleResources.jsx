import React, { useState } from "react";
import { useChaos } from "../context/ChaosContext";

export default function PeopleResources() {
  const { people, setPeople, resources, setResources } = useChaos();
  const [p, setP] = useState("");
  const [r, setR] = useState("");

  const addPerson = () => { if (!p) return; setPeople(prev => [...prev, p]); setP(""); };
  const addRes = () => { if (!r) return; setResources(prev => [...prev, { id: r.toLowerCase().replace(/\s+/g, '-'), name: r }]); setR(""); };

  return (
    <>
      <h2>People & Resources</h2>
      <div style={{ display: "grid", gap: 8 }}>
        <div>
          <div className="small">People</div>
          <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
            <input value={p} onChange={e => setP(e.target.value)} placeholder="Add person" />
            <button onClick={addPerson}>Add</button>
          </div>
          <ul style={{ marginTop: 8 }}>
            {people.map(name => <li key={name} className="list-item">{name}</li>)}
          </ul>
        </div>

        <div>
          <div className="small">Resources</div>
          <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
            <input value={r} onChange={e => setR(e.target.value)} placeholder="Add resource" />
            <button onClick={addRes}>Add</button>
          </div>
          <ul style={{ marginTop: 8 }}>
            {resources.map(res => <li key={res.id} className="list-item">{res.name}</li>)}
          </ul>
        </div>
      </div>
    </>
  );
}
