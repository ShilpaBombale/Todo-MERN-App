//frontend/app/page.js

'use client'
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Welcome to MERN Auth App</h1>
      <div style={{ marginTop: '30px' }}>
        <button 
          onClick={() => router.push('/login')}
          style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}
        >
          Login
        </button>
        <button 
          onClick={() => router.push('/register')}
          style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}
        >
          Register
        </button>
      </div>
    </div>
  );
}
