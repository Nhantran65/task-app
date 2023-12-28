import React, { useState } from 'react';

const Edit: React.FC = () => {
  const [level, setLevel] = useState(1);

  const handleLevelChange = (newLevel: number) => {
    setLevel(newLevel);
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h3 className="text-2xl font-semibold mb-4">Edit View</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Game Level:</label>
        <select
          className="mt-1 p-2 border border-gray-300 rounded-md"
          value={level}
          onChange={(e) => handleLevelChange(parseInt(e.target.value))}
        >
          <option value={1}>Level 1</option>
          <option value={2}>Level 2</option>
          <option value={3}>Level 3</option>
        </select>
      </div>
    </div>
  );
};

export default Edit;
