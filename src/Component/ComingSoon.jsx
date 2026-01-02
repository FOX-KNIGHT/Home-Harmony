import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ComingSoon = () => {
  const navigate = useNavigate();
  const words = ["Innovation", "Excellence", "Future"];
  const [currentWord, setCurrentWord] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const current = words[currentWord];
    let typingSpeed = deleting ? 50 : 120;

    const handleTyping = () => {
      if (!deleting && displayText.length < current.length) {
        setDisplayText(current.slice(0, displayText.length + 1));
      } else if (deleting && displayText.length > 0) {
        setDisplayText(current.slice(0, displayText.length - 1));
      } else if (!deleting && displayText.length === current.length) {
        setTimeout(() => setDeleting(true), 1500);
      } else if (deleting && displayText.length === 0) {
        setDeleting(false);
        setCurrentWord((prev) => (prev + 1) % words.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, deleting, words, currentWord]);

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <button
        style={styles.backButton}
        onClick={() => navigate('/')}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.5rem' }}>
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Home
      </button>

      {/* Animated Background */}
      <div style={styles.background}>
        <div style={styles.gradientOverlay} />
        {particles.map(particle => (
          <div
            key={particle.id}
            style={{
              ...styles.particle,
              left: particle.left,
              top: particle.top,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div style={styles.content}>
        <div style={styles.badge}>
          <span style={styles.badgeIcon}>✨</span>
          <span style={styles.badgeText}>Coming Soon</span>
        </div>

        <h1 style={styles.title}>
          <span style={styles.titleMain}>Building the</span>
          <span style={styles.titleHighlight}>{displayText}</span>
          <span style={styles.cursor}>|</span>
        </h1>

        <p style={styles.subtitle}>
          We're crafting something extraordinary. A revolutionary experience that will transform the way you interact with sustainable living solutions.
        </p>

        {/* Loader */}
        <div style={styles.loaderContainer}>
          <div style={styles.loaderRing}>
            <div style={styles.loaderInner} />
          </div>
          <div style={styles.loaderText}>Launching Soon</div>
        </div>

        {/* Stats */}
        <div style={styles.stats}>
          <div style={styles.stat}>
            <div style={styles.statValue}>98%</div>
            <div style={styles.statLabel}>Complete</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statValue}>15+</div>
            <div style={styles.statLabel}>Features</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statValue}>100%</div>
            <div style={styles.statLabel}>Eco-Friendly</div>
          </div>
        </div>

        {/* Newsletter */}
        <div style={styles.newsletter}>
          <div style={styles.newsletterTitle}>Get notified when we launch</div>
          <div style={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Enter your email"
              style={styles.emailInput}
            />
            <button style={styles.notifyButton}>
              <span>Notify Me</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    padding: '2rem'
  },
  backButton: {
    position: 'absolute',
    top: '2rem',
    left: '2rem',
    zIndex: 10,
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#cbd5e1',
    padding: '0.75rem 1.25rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  },
  background: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden'
  },
  gradientOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
    animation: 'pulse 8s ease-in-out infinite'
  },
  particle: {
    position: 'absolute',
    background: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '50%',
    animation: 'float 20s infinite ease-in-out',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
  },
  content: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    maxWidth: '900px',
    width: '100%',
    animation: 'fadeIn 1s ease-out'
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '9999px',
    padding: '0.5rem 1.25rem',
    marginBottom: '2rem',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#cbd5e1',
    animation: 'slideDown 0.6s ease-out'
  },
  badgeIcon: {
    fontSize: '1.2rem'
  },
  badgeText: {
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  title: {
    fontSize: 'clamp(2.5rem, 8vw, 5rem)',
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  titleMain: {
    color: '#f1f5f9',
    animation: 'slideUp 0.8s ease-out 0.2s both'
  },
  titleHighlight: {
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundSize: '200% 200%',
    animation: 'slideUp 0.8s ease-out 0.4s both, gradientShift 3s ease infinite',
    minHeight: '1.2em'
  },
  cursor: {
    display: 'inline-block',
    animation: 'blink 1s step-end infinite',
    color: '#3b82f6',
    marginLeft: '0.1em'
  },
  subtitle: {
    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
    color: '#94a3b8',
    lineHeight: 1.7,
    maxWidth: '700px',
    margin: '0 auto 3rem',
    animation: 'slideUp 0.8s ease-out 0.6s both'
  },
  loaderContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
    marginBottom: '3rem',
    animation: 'slideUp 0.8s ease-out 0.8s both'
  },
  loaderRing: {
    position: 'relative',
    width: '80px',
    height: '80px'
  },
  loaderInner: {
    position: 'absolute',
    inset: 0,
    border: '4px solid rgba(59, 130, 246, 0.2)',
    borderTop: '4px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  loaderText: {
    fontSize: '0.875rem',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontWeight: 600
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
    animation: 'slideUp 0.8s ease-out 1s both'
  },
  stat: {
    padding: '1.5rem',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '1rem',
    transition: 'all 0.3s ease'
  },
  statValue: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '0.5rem'
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontWeight: 600
  },
  newsletter: {
    animation: 'slideUp 0.8s ease-out 1.2s both'
  },
  newsletterTitle: {
    fontSize: '1.125rem',
    color: '#f1f5f9',
    fontWeight: 600,
    marginBottom: '1rem'
  },
  newsletterForm: {
    display: 'flex',
    gap: '1rem',
    maxWidth: '500px',
    margin: '0 auto',
    flexWrap: 'wrap'
  },
  emailInput: {
    flex: 1,
    minWidth: '250px',
    padding: '1rem 1.5rem',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '0.75rem',
    color: '#f1f5f9',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease'
  },
  notifyButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    border: 'none',
    borderRadius: '0.75rem',
    color: 'white',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)'
  }
};

// Add keyframes through a style tag
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0) translateX(0); }
    25% { transform: translateY(-20px) translateX(10px); }
    50% { transform: translateY(-40px) translateX(-10px); }
    75% { transform: translateY(-20px) translateX(10px); }
  }
  input:focus {
    border-color: rgba(59, 130, 246, 0.5) !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
  }
  button:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 15px 35px rgba(59, 130, 246, 0.4) !important;
  }
  button:active {
    transform: translateY(0) !important;
  }
  .stat:hover {
    transform: translateY(-4px) !important;
    border-color: rgba(59, 130, 246, 0.3) !important;
    background: rgba(255, 255, 255, 0.08) !important;
  }
  @media (max-width: 768px) {
    input, button {
      width: 100% !important;
      min-width: 100% !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default ComingSoon;