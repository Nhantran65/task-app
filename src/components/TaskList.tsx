import React, { useState, useEffect } from 'react';

interface Task {
  id: number;
  name: string;
  tags: string[];
  active: boolean;
}

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskName, setNewTaskName] = useState<string>('');
    const [newTaskTags, setNewTaskTags] = useState<string[]>([]);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
  
    // Trạng thái lọc hiện tại (tất cả, active, unactive)
    const [filteredStatus, setFilteredStatus] = useState<string>('all');

    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const [showAllTags, setShowAllTags] = useState(false); // New state to toggle displaying all tags
  
    const [existingTags, setExistingTags] = useState<string[]>([]); // New state to store existing tags
    const [dragging, setDragging] = useState(null); // State to store the dragging task

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
  
    // Thêm công việc
    const handleAddTask = async () => {
      if (newTaskName.trim() === '') {
        return; // Không thêm công việc trống
      }
    
      const newTask = {
        name: newTaskName,
        tags: newTaskTags,
        active: true,
      };
    
      try {
        const response = await fetch('http://localhost:3010/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTask),
        });
    
        if (response.ok) {
          const createdTask = await response.json();
          setTasks([...tasks, createdTask]);
          setNewTaskName('');
          setNewTaskTags([]);
        } else {
          const errorData = await response.json();
          console.error('Error adding task:', errorData);
        }
      } catch (error) {
        console.error('Error adding task:', error);
      }
    };
  
    // Chỉnh sửa công việc
    const handleEditTask = (task: Task) => {
      setEditingTask(task);
      setNewTaskName(task.name);
      setNewTaskTags(task.tags);
    };

    const handleCancleEditTask  = () => {
        setEditingTask(null);
        setNewTaskName('');
        setNewTaskTags([]);
      };                                     
  
    // Lưu công việc đã chỉnh sửa
    const handleSaveTask = async () => {
      if (newTaskName.trim() === '') {
        return; // Không lưu công việc trống
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
  
    // Xóa công việc
    const handleDeleteTask = async (taskId: number) => {
      try {
        const response = await fetch(`http://localhost:3010/tasks/${taskId}`, {
          method: 'DELETE',
        });
    
        if (response.status === 204) {
          // Xoá thành công từ phía client
          const updatedTasks = tasks.filter((task) => task.id !== taskId);
          setTasks(updatedTasks);
    
          // Sau đó cố gắng đồng bộ hóa với server bằng cách gửi danh sách công việc mới
          await fetch('http://localhost:3010/tasks', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTasks),
          });
        } else {
          console.error('Error deleting task:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    };
  
    // Toggle trạng thái active của một tag trong công việc
    // Hàm xử lý sự kiện để thay đổi trạng thái Active/Inactive của Task
const handleToggleTaskActive = async (task: Task) => {
    const updatedTask: Task = {
      ...task,
      active: !task.active, // Đảo ngược trạng thái
    };
  
    try {
      const response = await fetch(`http://localhost:3010/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
  
      if (response.status === 200) {
        const updatedTaskData = await response.json();
        const updatedTasks = tasks.map((t) =>
          t.id === updatedTaskData.id ? updatedTaskData : t
        );
        setTasks(updatedTasks);
      } else {
        console.error('Error toggling task active status:', response.statusText);
      }
    } catch (error) {
      console.error('Error toggling task active status:', error);
    }
  };

  // Hàm xử lý sự kiện để thay đổi trạng thái của Task
const handleToggleTaskStatus = async (taskId: number, active: boolean) => {
    const task = tasks.find((t) => t.id === taskId);
  
    if (task) {
      const updatedTask: Task = {
        ...task,
        active,
      };
  
      try {
        const response = await fetch(`http://localhost:3010/tasks/${taskId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTask),
        });
  
        if (response.status === 200) {
          const updatedTaskData = await response.json();
          const updatedTasks = tasks.map((t) =>
            t.id === updatedTaskData.id ? updatedTaskData : t
          );
          setTasks(updatedTasks);
        } else {
          console.error('Error toggling task status:', response.statusText);
        }
      } catch (error) {
        console.error('Error toggling task status:', error);
      }
    }
  };
  const handleReloadData = async () => {
    // Thực hiện tải lại dữ liệu từ server và cập nhật trạng thái
    fetchData();
  };
  

  // Function to toggle selected tags
  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const uniqueTags = Array.from(new Set(tasks.flatMap((task) => task.tags)));

  
  return (
    <div className="max-w-lg mx-auto p-4">
      <h3 className="text-2xl font-semibold mb-4">Tasks</h3>

      <div className="mb-4">
        <button
          onClick={() => setFilteredStatus('all')}
          className={`mr-2 ${filteredStatus === 'all' ? 'bg-blue-500' : 'bg-gray-300'} text-white p-2 rounded`}
        >
          All
        </button>
        <button
          onClick={() => setFilteredStatus('active')}
          className={`mr-2 ${filteredStatus === 'active' ? 'bg-blue-500' : 'bg-gray-300'} text-white p-2 rounded`}
        >
          Active
        </button>
        <button
          onClick={() => setFilteredStatus('unactive')}
          className={`mr-2 ${filteredStatus === 'unactive' ? 'bg-blue-500' : 'bg-gray-300'} text-white p-2 rounded`}
        >
          Unactive
        </button>
      </div>

      <div className="mb-4">
        {showAllTags
          ? uniqueTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleToggleTag(tag)}
                className={`mr-2 ${
                  selectedTags.includes(tag) ? 'bg-blue-500' : 'bg-gray-300'
                } text-white p-2 rounded`}
              >
                {tag}
              </button>
            ))
            : uniqueTags.slice(0, 5).map((tag) => (
              <button
                key={tag}
                onClick={() => handleToggleTag(tag)}
                className={`mr-2 ${
                  selectedTags.includes(tag) ? 'bg-blue-500' : 'bg-gray-300'
                } text-white p-2 rounded`}
              >
                {tag}
              </button>
            ))}
        {uniqueTags.length > 5 && (
          <button
            onClick={() => setShowAllTags(!showAllTags)}
            className={`mr-2 bg-blue-500 text-white p-2 rounded`}
          >
            {showAllTags ? 'Show Less' : 'Show More'}
          </button>
        )
        }
        <button
          onClick={() => setSelectedTags([])}
          className={`mr-2 ${
            selectedTags.length === 0 ? 'bg-blue-500' : 'bg-gray-300'
          } text-white p-2 rounded`}
        >
          Clear Tags
        </button>
      </div>

      <div className='mb-4'>
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
        <button
          onClick={handleReloadData}
          className="bg-blue-500 text-white p-2 rounded m-2"
        >
          Reload Data
        </button>
      </div>

      <ul>
        {tasks
          .filter((task) => {
            if (filteredStatus === 'active') {
              return task.active;
            } else if (filteredStatus === 'unactive') {
              return !task.active;
            }
            return true;
          })
          .filter((task) => {
            if (selectedTags.length === 0) {
              return true;
            } else {
              return task.tags.some((tag) => selectedTags.includes(tag));
            }
          })
          .map((task) => (
      <li key={task.id} className="mb-4 p-2 border rounded">
          {task === editingTask ? (
          <div>
              <input
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              />
              {newTaskTags.map((tag, index) => (
              <div key={index}>
                  <input
                  type="text"
                  value={tag}
                  onChange={(e) => {
                      const updatedTags = [...newTaskTags];
                      updatedTags[index] = e.target.value;
                      setNewTaskTags(updatedTags);
                  }}
                  className="w-full p-2 border rounded mb-2"
                  />
              </div>
              ))}
              <button
              onClick={handleSaveTask}
              className="bg-blue-500 text-white p-2 rounded"
              >
              Save
              </button>
              <button
                  onClick={handleCancleEditTask}
                  className="bg-gray-400 text-white p-2 rounded ml-2"
                >
                  Cancel
                </button>
          </div>
          ) : (
          <div>
              <p className="text-lg">{task.name}</p>
              {task.tags.map((tag, index) => (
              <div key={index}>
                  <p className="text-gray-600 text-sm">Tag: {tag}</p>
              </div>
              ))}
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
              {/* Thêm nút Toggle Task Active/Inactive */}
              <button
              onClick={() => handleToggleTaskActive(task)}
              className={`bg-${task.active ? 'red' : 'green'}-500 text-white p-2 rounded`}
              >
                {task.active ? 'Deactivate' : 'Activate'}
              </button>
               {/* Thêm nút "Active" và "Inactive" */}
               {task.active ? (
                  <button
                      onClick={() => handleToggleTaskStatus(task.id, false)}
                      className="bg-blue-500 text-white p-2 rounded m-2"
                  >
                      Inactive
                  </button>
              ) : (
                  <button
                      onClick={() => handleToggleTaskStatus(task.id, true)}
                      className="bg-green-500 text-white p-2 rounded m-2"
                  >
                      Active
                  </button>)}
          </div>
          )}
      </li>
      ))}
</ul>
      
    </div>
  );
}

export default TaskList;