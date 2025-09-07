import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const listStyle = {
  ul: {
    listStyle: "none",
    padding: 0,
  },
  li: {
    margin: "10px 0",
    padding: "12px",
    background: "#ecf0f1",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    marginLeft: "15px",
    background: "#2ecc71",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  wait: {
    marginLeft: "10px",
    color: "#555",
    fontSize: "0.9em",
  },
  empty: {
    color: "#888",
    fontStyle: "italic",
  },
};

const QueueList = ({ queue, onServe }) => {
  return (
    <div>
      <h2>Current Queue</h2>
      <AnimatePresence>
        {queue.length === 0 ? (
          <motion.p
            style={listStyle.empty}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            No one in queue
          </motion.p>
        ) : (
          <motion.ul style={listStyle.ul}>
            {queue.map((user, index) => (
              <motion.li
                key={user.id}
                style={listStyle.li}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <span>
                  <strong>{index + 1}. {user.name}</strong> - {user.serviceType}
                  <span style={listStyle.wait}>
                    (Est. wait: {user.waitTime} min)
                  </span>
                </span>
                <motion.button
                  style={listStyle.button}
                  onClick={() => onServe(user.id)}
                  whileHover={{ scale: 1.05, backgroundColor: "#27ae60" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Serve
                </motion.button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QueueList;
