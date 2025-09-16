//frontend/app/register/page.jsx


'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        router.push('/dashboard');
      } else {
        const data = await res.json();
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '400px', margin: '0 auto' }}>
<h1>📝 To-do App</h1>
<p style={{ fontStyle: 'italic', marginBottom: '20px' }}>
  "Conquer chaos, one task at a time."
</p>


      <h2>Register</h2>
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
      <input 
        type="password" 
        value={confirmPassword} 
        onChange={e => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        style={{ width: '100%', padding: '10px', margin: '10px 0' }}
      />
      <button 
        onClick={handleRegister}
        style={{ width: '100%', padding: '10px', fontSize: '16px', cursor: 'pointer' }}
      >
        Register
      </button>
      <p style={{ marginTop: '20px' }}>
        Already have an account? <a href="/login" style={{ color: 'blue' }}>Login</a>
      </p>
    </div>
  );
}
