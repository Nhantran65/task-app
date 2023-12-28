  import React from 'react';



  const Info: React.FC = () => {
    return (
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-3xl mx-auto bg-white rounded p-6 shadow-lg">
          <h1 className="text-3xl font-semibold mb-4">Info View</h1>
          <p className="mb-4">
            <strong>Author:</strong> Nhan Tran
          </p>
          <p className="mb-4">
            <strong>Instructions:</strong> You can see almost on the Instruction Page 
          </p>
          <p className="mb-4">
            <strong>Content:</strong> All Images I used in this App Created by myself.
          </p>
          <p className="mb-4">
            <strong>Working Hours:</strong> I spent approximately from 25-30 hours working on this programming assignment.
          </p>
          <p>
            <strong>Most Difficult Feature:</strong> I have many problems bugs I have to fixed so I cannot fix all of this that's the reason I just can do a bit
          </p>
        </div>
      </div>
    );
  }

  export default Info;