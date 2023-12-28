import React, { useState, useEffect } from 'react';
import './Game.css'; // Import your CSS file

const GRID_SIZE = 20;
const CELL_SIZE = 20;

const Game: React.FC = () => {
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]); // Initial position of the snake
  const [direction, setDirection] = useState('RIGHT'); // Initial direction of the snake

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    // Update the position of the head based on the current direction
    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
      default:
        break;
    }

    // Add a new segment to the snake at the new head position
    newSnake.unshift(head);

    // Check if the snake has reached the target length
    if (newSnake.length > 5) {
      // Remove the last segment of the snake to maintain its length
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    // Update the direction based on the pressed arrow key
    switch (event.key) {
      case 'ArrowUp':
        setDirection('UP');
        break;
      case 'ArrowDown':
        setDirection('DOWN');
        break;
      case 'ArrowLeft':
        setDirection('LEFT');
        break;
      case 'ArrowRight':
        setDirection('RIGHT');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Set up a timer to move the snake every 0.3 seconds
    const intervalId = setInterval(() => {
      moveSnake();
    }, 300);

    // Add event listener for arrow keys
    window.addEventListener('keydown', handleKeyDown);

    // Clean up the timer and event listener when the component unmounts
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [snake, direction]);

  return (
    <div className="max-w-lg mx-auto p-4">
      <h3 className="text-2xl font-semibold mb-4">Game View</h3>
      <div className="grid">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
          const x = index % GRID_SIZE;
          const y = Math.floor(index / GRID_SIZE);
          const isSnakeCell = snake.some((segment) => segment.x === x && segment.y === y);

          return (
            <div
              key={index}
              className={`cell ${isSnakeCell ? 'snake-cell' : 'empty-cell'}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Game;
