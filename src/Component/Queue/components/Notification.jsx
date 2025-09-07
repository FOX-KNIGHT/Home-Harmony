import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const notificationStyle = {
  container: {
    marginTop: "20px",
  },
  ul: {
    listStyle: "none",
    padding: 0,
  },
  li: {
    margin: "8px 0",
    padding: "10px",
    background: "#f0f9ff",
    borderLeft: "5px solid #3498db",
    borderRadius: "6px",
  },
  empty: {
    color: "#888",
    fontStyle: "italic",
  },
};

const Notification = ({ messages }) => {
  return (
    <div style={notificationStyle.container}>
      <h2>Notifications</h2>
      <AnimatePresence>
        {messages.length === 0 ? (
          <motion.p
            style={notificationStyle.empty}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            No new notifications
          </motion.p>
        ) : (
          <motion.ul style={notificationStyle.ul}>
            {messages.map((msg, i) => (
              <motion.li
                key={i}
                style={notificationStyle.li}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                {msg}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notification;
