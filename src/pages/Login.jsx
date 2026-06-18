import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';  // ✅ YEH LINE ADD KARO
import './Login.css';

const Login = ({ setIsLoggedIn }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Register state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Forgot password state
  const [resetEmail, setResetEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email.trim(), 
          password: password 
        }),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (response.ok && data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (setIsLoggedIn) setIsLoggedIn(true);
        navigate('/');
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Network error. Please try again.');
    }
    setLoading(false);
  };

  // Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password, confirmPassword })
      });

      const data = await res.json();

      if (res.ok) {
        setShowOtpScreen(true);
        setMessage('OTP sent to your email! Please verify.');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
    setLoading(false);
  };

  // Handle OTP Verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (setIsLoggedIn) setIsLoggedIn(true);
        navigate('/');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
    setLoading(false);
  };

  // Handle Forgot Password - Send OTP
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail })
      });

      const data = await res.json();

      if (res.ok) {
        setShowResetPassword(true);
        setMessage('OTP sent to your email!');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
    setLoading(false);
  };

  // Handle Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (newPassword !== confirmNewPassword) {
      setMessage('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail, otp, newPassword, confirmPassword: confirmNewPassword })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Password reset successful! Please login.');
        setTimeout(() => {
          setShowForgotPassword(false);
          setShowResetPassword(false);
          setResetEmail('');
          setOtp('');
          setNewPassword('');
          setConfirmNewPassword('');
        }, 2000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
    setLoading(false);
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error sending OTP');
    }
    setLoading(false);
  };

  // OTP Verification Screen
  if (showOtpScreen) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" stroke="#d40000" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
            <h2>Verify Your Email</h2>
            <p>OTP sent to <strong>{email}</strong></p>
          </div>
          <form onSubmit={handleVerifyOtp}>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="auth-input"
              style={{ textAlign: 'center', fontSize: '18px', letterSpacing: '4px' }}
            />
            <button type="submit" disabled={loading} className="auth-btn">
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
          <button onClick={handleResendOtp} disabled={loading} className="auth-link-btn">
            Resend OTP
          </button>
          {message && <p className={`auth-message ${message.includes('OTP') ? 'success' : 'error'}`}>{message}</p>}
        </div>
      </div>
    );
  }

  // Forgot Password Screen
  if (showForgotPassword) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" stroke="#d40000" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
            <h2>Forgot Password</h2>
            <p>Enter your email to receive OTP</p>
          </div>
          
          {!showResetPassword ? (
            <form onSubmit={handleForgotPassword}>
              <input
                type="email"
                placeholder="Email Address"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                className="auth-input"
              />
              <button type="submit" disabled={loading} className="auth-btn">
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword}>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="auth-input"
              />
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="auth-input"
                />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm New Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                  className="auth-input"
                />
                <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? '🙈' : '👁️'}
                </button>
              </div>
              <button type="submit" disabled={loading} className="auth-btn">
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}
          
          <button onClick={() => {
            setShowForgotPassword(false);
            setShowResetPassword(false);
            setResetEmail('');
            setOtp('');
            setNewPassword('');
            setConfirmNewPassword('');
          }} className="auth-link-btn">
            Back to Login
          </button>
          
          {message && <p className={`auth-message ${message.includes('OTP') || message.includes('successful') ? 'success' : 'error'}`}>{message}</p>}
        </div>
      </div>
    );
  }

  // Main Login/Register Screen
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" stroke="#d40000" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Sign in to your account' : 'Register to get started'}</p>
        </div>

        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="auth-input"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="auth-input"
              />
            </>
          )}
          
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-input"
          />
          
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          
          {!isLogin && (
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="auth-input"
              />
              <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
          )}
          
          {isLogin && (
            <div className="forgot-password">
              <button type="button" onClick={() => setShowForgotPassword(true)}>
                Forgot Password?
              </button>
            </div>
          )}
          
          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>
        
        {/* ========== GOOGLE LOGIN SECTION ========== */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '15px', 
          margin: '25px 0 20px',
          color: '#666'
        }}>
          <hr style={{ flex: 1, border: 'none', borderTop: '1px solid rgba(224,224,224,0.2)' }} />
          <span style={{ fontSize: '0.85rem' }}>OR</span>
          <hr style={{ flex: 1, border: 'none', borderTop: '1px solid rgba(224,224,224,0.2)' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const res = await fetch('http://localhost:5000/api/auth/google', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ credential: credentialResponse.credential })
                });
                
                const data = await res.json();
                
                if (res.ok && data.success) {
                  localStorage.setItem('token', data.token);
                  localStorage.setItem('user', JSON.stringify(data.user));
                  if (setIsLoggedIn) setIsLoggedIn(true);
                  navigate('/');
                } else {
                  setMessage(data.message || 'Google login failed');
                }
              } catch (error) {
                console.error('Google login error:', error);
                setMessage('Server error. Please try again.');
              }
            }}
            onError={() => {
              setMessage('Google login failed. Please try again.');
            }}
            theme="filled_black"
            size="large"
            text="signin_with"
            shape="pill"
            logo_alignment="center"
            width="100%"
            containerProps={{
              style: { width: '100%' }
            }}
          />
        </div>
        {/* ========== END GOOGLE LOGIN SECTION ========== */}
        
        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage('');
                setName('');
                setPhone('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
              }}
            >
              {isLogin ? 'Create Account' : 'Sign In'}
            </button>
          </p>
        </div>
        
        {message && <p className={`auth-message ${message.includes('OTP') ? 'success' : 'error'}`}>{message}</p>}
      </div>
    </div>
  );
};

export default Login;