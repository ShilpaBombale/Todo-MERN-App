//frontend/app/login/page.jsx

'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        router.push('/dashboard');
      } else {
        const data = await res.json();
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div style={{
      padding: '50px',
      maxWidth: '400px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      
      {/* App Title + Slogan on top */}
      <h1 style={{ fontSize: '28px', marginBottom: '5px' }}>📝 To-do App</h1>
      <p style={{ fontStyle: 'italic', marginBottom: '30px' }}>
        "Conquer chaos, one task at a time."
      </p>

      {/* Login Form */}
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input 
        type="email"
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        placeholder="Email"
        style={{ width: '100%', padding: '10px', margin: '10px 0' }}
      />
      <input 
        type="password" 
        value={password} 
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        style={{ width: '100%', padding: '10px', margin: '10px 0' }}
      />
      <button 
        onClick={handleLogin}
        style={{ width: '100%', padding: '10px', fontSize: '16px', cursor: 'pointer' }}
      >
        Login
      </button>
      <p style={{ marginTop: '20px' }}>
        Don't have an account? <a href="/register" style={{ color: 'blue' }}>Register</a>
      </p>
    </div>
  );
}
