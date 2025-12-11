import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/tasks`);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      });
      if (!response.ok) throw new Error('Failed to create task');
      const data = await response.json();
      setTasks([data, ...tasks]);
      setNewTask({ title: '', description: '' });
    } catch (err) {
      setError(err.message);
      console.error('Error creating task:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (task) => {
    setLoading(true);
    setError(null);
    try {
      const taskId = task._id || task.id;
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, completed: !task.completed })
      });
      if (!response.ok) throw new Error('Failed to update task');
      const data = await response.json();
      setTasks(tasks.map(t => (t._id || t.id) === taskId ? data : t));
    } catch (err) {
      setError(err.message);
      console.error('Error updating task:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete task');
      setTasks(tasks.filter(t => (t._id || t.id) !== taskId));
    } catch (err) {
      setError(err.message);
      console.error('Error deleting task:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>📝 MERN Task Manager</h1>
          <p>A simple demo app for testing VS Code features</p>
        </header>

        {error && (
          <div className="error">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={createTask} className="task-form">
          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            disabled={loading}
            required
          />
          <input
            type="text"
            placeholder="Task description (optional)"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Task'}
          </button>
        </form>

        <div className="task-list">
          {loading && tasks.length === 0 ? (
            <p>Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="empty-state">No tasks yet. Create one above!</p>
          ) : (
            tasks.map((task) => (
              <div key={task._id || task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <div className="task-content" onClick={() => toggleTask(task)}>
                  <div className="task-checkbox">
                    {task.completed ? '✓' : '○'}
                  </div>
                  <div className="task-details">
                    <h3>{task.title}</h3>
                    {task.description && <p>{task.description}</p>}
                  </div>
                </div>
                <button 
                  className="delete-btn"
                  onClick={() => deleteTask(task._id || task.id)}
                  disabled={loading}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
