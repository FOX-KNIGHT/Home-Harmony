import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import './Login.css';

function Login() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const response = await fetch('http://localhost:5001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage(`Welcome ${form.name}, logged in successfully!`);
      // Optional: Save user info to context/localStorage
    } else {
      setMessage(data.error || 'Login failed on server.');
    }
  } catch (error) {
    setMessage('Network error during login.');
  }

    // Your existing POST request logic here...
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log('Google credential:', credentialResponse.credential);
    try {
      const response = await fetch('http://localhost:5001/api/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Welcome ${data.user.name}, logged in successfully!`);
        // Additional logic to set user state can be added here
      } else {
        setMessage(data.error || 'Login failed on server.');
      }
    } catch (error) {
      setMessage('Network error during login.');
    }
  };

  const handleGoogleError = () => {
    console.log('Google Login Failed');
    setMessage('Google login failed. Try again.');
  };

  return (
    <div className="">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="icon">👤</span>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <span className="icon">📧</span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>

        <p>{message}</p>
      </div>
    </div>
  );
}

export default Login;
