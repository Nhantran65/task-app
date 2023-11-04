import React from 'react';



const About: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white rounded p-6 shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">About Me</h1>
        <p className="mb-4">
          <strong>Author:</strong> Nhan Tran
        </p>
        <p className="mb-4">
          <strong>Instructions:</strong> Using the application should be intuitive and straightforward. The user interface is designed to provide a user-friendly experience. If you encounter any issues or have questions, please feel free to contact us for support.
        </p>
        <p className="mb-4">
          <strong>Content:</strong> All images and content used in this application are originally created by [Your Name].
        </p>
        <p className="mb-4">
          <strong>Working Hours:</strong> I spent approximately from 40 to 50 hours working on this programming assignment.
        </p>
        <p>
          <strong>Most Difficult Feature:</strong> The most challenging aspect of this project was [brief description of the most difficult or tedious feature you implemented, e.g., handling complex user input validations, integrating external APIs, etc.].
        </p>
      </div>
    </div>
  );
}

export default About;
