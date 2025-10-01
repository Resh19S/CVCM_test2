import React, { useState } from 'react';
import './LoginSection.css';
import maharashtraLogo from './maharashtra-logo.png';

interface LoginSectionProps {
  onLogin: (credentials: { email: string; password: string; name?: string; isSignup?: boolean }) => void;
}

export function LoginSection({ onLogin }: LoginSectionProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onLogin({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      isSignup: false
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <div className="login-card">
        {/* Logo Section */}
        <div className="flex justify-center">
          <div className="login-logo" style={{ backgroundColor: 'transparent', border: 'none', overflow: 'hidden' }}>
            <img 
              src={maharashtraLogo}
              alt="Maharashtra Government Logo" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Header Section */}
        <h2 className="login-header-text">महाराष्ट्र शासन</h2>
        <h1 className="login-title">CVC Draft Analyis</h1>
        <p className="login-acronym">(AI-BMS)</p>
        
        {/* Government Organization Details */}
        <div className="login-gov-text-close">Divisional Commissioners Office</div>
        <div className="login-gov-text-close">Konkan Division</div>
        <div className="login-gov-text">Government Of Maharashtra</div>

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="login-form">
          <input
            name="email"
            type="text"
            placeholder="Username"
            className="login-input"
            required
          />
          
          <div className="password-container">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="login-input"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginSection;