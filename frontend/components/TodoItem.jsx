export default function TodoItem({ todo, onToggle, onDelete, color }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px',
      marginBottom: '10px',
      backgroundColor: color || '#89ea5fff',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      color: '#000'
    }}>
      <span
        onClick={() => onToggle(todo._id)}
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          cursor: 'pointer'
        }}
      >
        {todo.text}
      </span>
      <button 
        onClick={() => onDelete(todo._id)}
        style={{ backgroundColor: 'var(--danger)', color: '#ffffffff', padding: '5px 10px' }}
      >
        Delete
      </button>
    </div>
  );
}
