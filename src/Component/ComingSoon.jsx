// ComingSoon.jsx
import React, { useEffect, useState } from "react";
import "./ComingSoon.css";

const ComingSoon = () => {
  const words = ["Website", "Platform", "Experience"];
  const [currentWord, setCurrentWord] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[currentWord];
    let typingSpeed = deleting ? 50 : 120;

    const handleTyping = () => {
      if (!deleting && displayText.length < current.length) {
        setDisplayText(current.slice(0, displayText.length + 1));
      } else if (deleting && displayText.length > 0) {
        setDisplayText(current.slice(0, displayText.length - 1));
      } else if (!deleting && displayText.length === current.length) {
        setTimeout(() => setDeleting(true), 1000);
      } else if (deleting && displayText.length === 0) {
        setDeleting(false);
        setCurrentWord((prev) => (prev + 1) % words.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, deleting, words, currentWord]);

  return (
    <div className="coming-soon-container">
      <div className="overlay" />
      <h1 className="title">Something Exciting is Coming</h1>
      <h2 className="subtitle">
        Our <span className="highlight">{displayText}</span> is on the way...
      </h2>
      <div className="loader"></div>
      <p className="footer">Stay tuned for the launch 🚀</p>
    </div>
  );
};

export default ComingSoon;
