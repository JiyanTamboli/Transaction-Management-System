import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import './To_do_list.css';

function To_do_list() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // Load from localStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem('myTasks');
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  const updateAndSaveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem('myTasks', JSON.stringify(newTasks));
  };

  const handleAddTask = () => {
    if (task.trim() !== '') {
      const newTasks = [...tasks, { text: task, completed: false }];
      updateAndSaveTasks(newTasks);
      setTask('');
    }
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    updateAndSaveTasks(updated);
  };

  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    updateAndSaveTasks(updated);
  };

  return (
    <div className="todo-container container mt-5">
      <h3 className="text-center mb-4">My To-Do List</h3>

      <div className="input-group shadow-sm mb-4">
        <Form.Control
          type="text"
          className="task-input"
          placeholder="What do you need to do?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button variant="primary" onClick={handleAddTask}>
          Add
        </Button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-muted text-center">No tasks yet. Start by adding one.</p>
      ) : (
        <ul className="list-group shadow-sm">
          {tasks.map((item, index) => (
            <li
              key={index}
              className={`list-group-item d-flex justify-content-between align-items-center task-item ${
                item.completed ? 'completed' : ''
              }`}
            >
              <div className="d-flex align-items-center">
                <Form.Check
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleComplete(index)}
                  className="me-2"
                />
                <span className="task-text" onClick={() => toggleComplete(index)}>
                  {item.text}
                </span>
              </div>

              <div className="d-flex align-items-center">
                <Badge bg={item.completed ? 'success' : 'secondary'} className="me-2">
                  {item.completed ? 'Completed' : 'Uncompleted'}
                </Badge>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="delete-btn"
                  onClick={() => handleDelete(index)}
                >
                  🗑
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default To_do_list;
