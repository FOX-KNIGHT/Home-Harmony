import React from "react";

const QueueList = ({ queue, onServe }) => {
  return (
    <div className="queue-list">
      <h2>Current Queue</h2>
      {queue.length === 0 ? (
        <p>No one in queue</p>
      ) : (
        <ul>
          {queue.map((user, index) => (
            <li key={user.id}>
              <strong>{index + 1}. {user.name}</strong> - {user.serviceType} 
              (Est. wait: {user.waitTime} min)
              <button onClick={() => onServe(user.id)}>Serve</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QueueList;
