'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TodoItem from '../../components/TodoItem';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:5000/api/auth/me', { credentials: 'include' });
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);

        const todoRes = await fetch('http://localhost:5000/api/todos', { credentials: 'include' });
        setTodos(await todoRes.json());
      } else {
        router.push('/login');
      }
    };
    fetchData();
  }, [router]);

  const addTodo = async () => {
    if (!text.trim()) return;

    const res = await fetch('http://localhost:5000/api/todos', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, priority })
    });
    if (res.ok) {
      const newTodo = await res.json();
      setTodos([newTodo, ...todos]);
      setText('');
      setPriority('Medium');
    }
  };

  const toggleTodo = async (id) => {
    const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: 'PATCH',
      credentials: 'include'
    });
    if (res.ok) {
      const updated = await res.json();
      setTodos(todos.map(t => t._id === id ? updated : t));
    }
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    setTodos(todos.filter(t => t._id !== id));
  };

  const logout = async () => {
    await fetch('http://localhost:5000/api/auth/logout', { method: 'POST', credentials: 'include' });
    router.push('/login');
  };

  // Group todos by priority
  const groupedTodos = {
    High: todos.filter(t => t.priority === 'High'),
    Medium: todos.filter(t => t.priority === 'Medium'),
    Low: todos.filter(t => t.priority === 'Low'),
  };

  const priorityColors = {
    High: '#e63946',   // red
    Medium: '#ff9800', // orange
    Low: '#f6c90e'     // yellow
  };

  return (
    <div style={{ padding: '50px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1>📝 To-do App</h1>
      <p style={{ fontStyle: 'italic', marginBottom: '20px' }}>
        "Conquer chaos, one task at a time."
      </p>

      {user ? (
        <>
          <h2>Welcome, {user.email.split('@')[0]}!</h2>
          <button 
            onClick={logout} 
            style={{ marginTop: '10px', padding: '8px 15px', background: '#ef4444', color: '#fff' }}
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loading user info...</p>
      )}

      {/* Input area */}
      <div style={{ display: 'flex', marginTop: '20px', gap: '10px' }}>
        <input 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="New todo..."
          style={{ flex: 2, padding: '10px' }}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ flex: 1, padding: '10px' }}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <button 
          onClick={addTodo} 
          style={{ backgroundColor: '#2e7d32', color: '#fff', padding: '10px 20px' }}
        >
          Add
        </button>
      </div>

      {/* Todos grouped */}
      {Object.keys(groupedTodos).map(level => (
        <div key={level} style={{ marginTop: '30px', textAlign: 'left' }}>
          <h3 style={{ color: priorityColors[level] }}>{level} Priority</h3>
          {groupedTodos[level].length > 0 ? groupedTodos[level].map(todo => (
            <TodoItem 
              key={todo._id} 
              todo={todo} 
              onToggle={toggleTodo} 
              onDelete={deleteTodo}
              color={priorityColors[todo.priority]}
            />
          )) : <p>No {level.toLowerCase()} priority tasks.</p>}
        </div>
      ))}
    </div>
  );
}
