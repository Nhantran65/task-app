import React, { useState } from 'react';

interface Task {
  id: number;
  name: string;
  tags: string[];
}

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: 'Task 1', tags: ['tag1', 'tag2'] },
    { id: 2, name: 'Task 2', tags: ['tag3'] },
  ]);

  const [newTaskName, setNewTaskName] = useState<string>('');
  const [newTaskTags, setNewTaskTags] = useState<string[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddTask = () => {
    // Validate and add a new task to the tasks list
    if (newTaskName.trim() === '') {
      return; // Don't add an empty task
    }

    const newTask: Task = {
      id: tasks.length + 1,
      name: newTaskName,
      tags: newTaskTags,
    };

    setTasks([...tasks, newTask]);
    setNewTaskName('');
    setNewTaskTags([]);
  };

  const handleEditTask = (taskId: number) => {
    // Set the task to be edited
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditingTask(taskToEdit || null);
  };

  const handleSaveTask = () => {
    // Validate and save the edited task
    if (newTaskName.trim() === '') {
      return; // Don't save an empty task name
    }

    const updatedTasks = tasks.map((task) =>
      task.id === editingTask?.id
        ? { ...task, name: newTaskName, tags: newTaskTags }
        : task
    );

    setTasks(updatedTasks);
    setNewTaskName('');
    setNewTaskTags([]);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId: number) => {
    // Delete the task with the specified ID
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h3>Tasks</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task === editingTask ? (
              <>
                <input
                  type="text"
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Add tags (comma-separated)"
                  value={newTaskTags.join(', ')}
                  onChange={(e) => setNewTaskTags(e.target.value.split(', '))}
                />
                <button onClick={handleSaveTask}>Save</button>
              </>
            ) : (
              <>
                {task.name} - Tags: {task.tags.join(', ')}
                <button onClick={() => handleEditTask(task.id)}>Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </>
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
        />
        <input
          type="text"
          placeholder="Add tags (comma-separated)"
          value={newTaskTags.join(', ')}
          onChange={(e) => setNewTaskTags(e.target.value.split(', '))}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
}

export default TaskList;
