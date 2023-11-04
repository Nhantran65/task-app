// src/App.tsx

import React from 'react';
import MyComponent from './MyComponent';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="App">
      <MyComponent />
      <TaskList/>
    </div>
  );
}

export default App;
