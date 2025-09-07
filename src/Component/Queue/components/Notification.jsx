import React from "react";

const Notification = ({ messages }) => {
  return (
    <div className="notifications">
      <h2>Notifications</h2>
      {messages.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul>
          {messages.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
