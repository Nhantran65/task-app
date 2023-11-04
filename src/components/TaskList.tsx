import React, { useState, useEffect } from 'react';

interface Task {
  id: number;
  name: string;
  tags: string[];
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState<string>('');
  const [newTaskTags, setNewTaskTags] = useState<string[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3010/tasks');
      const data = await response.json();
      if (Array.isArray(data)) {
        setTasks(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTask = async () => {
    if (newTaskName.trim() === '') {
      return; // Don't add an empty task
    }

    const newTask: Task = {
      id: tasks.length + 1, // Assign a unique ID
      name: newTaskName,
      tags: newTaskTags,
    };

    try {
      const response = await fetch('http://localhost:3010/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (response.status === 201) {
        const createdTask = await response.json();
        setTasks([...tasks, createdTask]);
        setNewTaskName('');
        setNewTaskTags([]);
      } else {
        console.error('Error adding task:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setNewTaskName(task.name);
    setNewTaskTags(task.tags);
  };

  const handleSaveTask = async () => {
    if (newTaskName.trim() === '') {
      return; // Don't save an empty task name
    }

    if (editingTask) {
      const updatedTask: Task = {
        ...editingTask,
        name: newTaskName,
        tags: newTaskTags,
      };

      try {
        const response = await fetch(`http://localhost:3010/tasks/${editingTask.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTask),
        });

        if (response.status === 200) {
          const updatedTaskData = await response.json();
          const updatedTasks = tasks.map((task) =>
            task.id === updatedTaskData.id ? updatedTaskData : task
          );

          setTasks(updatedTasks);
          setNewTaskName('');
          setNewTaskTags([]);
          setEditingTask(null);
        } else {
          console.error('Error saving task:', response.statusText);
        }
      } catch (error) {
        console.error('Error saving task:', error);
      }
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      const response = await fetch(`http://localhost:3010/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (response.status === 204) {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
      } else {
        console.error('Error deleting task:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h3 className="text-2xl font-semibold mb-4">Tasks</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="mb-4 p-2 border rounded">
            {task === editingTask ? (
              <div>
                <input
                  type="text"
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="text"
                  placeholder="Add tags (comma-separated)"
                  value={newTaskTags.join(', ')}
                  onChange={(e) => setNewTaskTags(e.target.value.split(', '))}
                  className="w-full p-2 border rounded mb-2"
                />
                <button
                  onClick={handleSaveTask}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <p className="text-lg">{task.name}</p>
                <p className="text-gray-600 text-sm">Tags: {task.tags.join(', ')}</p>
                <button
                  onClick={() => handleEditTask(task)}
                  className="bg-yellow-500 text-white p-2 rounded m-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-500 text-white p-2 rounded m-2"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Task name"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Add tags (comma-separated)"
          value={newTaskTags.join(', ')}
          onChange={(e) => setNewTaskTags(e.target.value.split(', '))}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={handleAddTask}
          className="bg-green-500 text-white p-2 rounded"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default TaskList;
