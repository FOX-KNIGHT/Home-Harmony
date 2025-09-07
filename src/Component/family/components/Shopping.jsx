import React, { useState } from "react";
import { useChaos } from "../context/ChaosContext";

export default function Shopping() {
  const { shopping, setShopping } = useChaos();
  const [item, setItem] = useState("");

  const add = () => {
    if (!item.trim()) return;
    setShopping(prev => [{ id: Math.random().toString(36).slice(2,9), name: item }, ...prev]);
    setItem("");
  };

  const remove = (id) => setShopping(prev => prev.filter(i => i.id !== id));

  return (
    <>
      <h2>Shopping</h2>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={item} onChange={e => setItem(e.target.value)} placeholder="Item" />
        <button onClick={add}>Add</button>
      </div>
      <ul style={{ marginTop: 8 }}>
        {shopping.map(i => (
          <li key={i.id} className="list-item">
            <div>{i.name}</div>
            <div><button style={{ background: "#ef4444" }} onClick={() => remove(i.id)}>Remove</button></div>
          </li>
        ))}
      </ul>
    </>
  );
}
