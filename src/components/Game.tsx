import React, { useState, useEffect } from 'react';
import './Game.css';

const GRID_SIZE = 20;

interface SnakeSegment {
  x: number;
  y: number;
}

interface Obstacle {
  x: number;
  y: number;
}

const Game: React.FC = () => {
  const [snake, setSnake] = useState<SnakeSegment[]>([{ x: 0, y: 0 }]);
  const [direction, setDirection] = useState('RIGHT');
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [level, setLevel] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(1);

  const CELL_SIZE = 20;
  const obstacleColor = 'red';
  const obstacleTypes = [
    { level: 1, density: 0 },
    { level: 2, density: 2 },
    { level: 3, density: 5 },
    // Add more levels and densities as needed
  ];

  const moveSnake = () => {
    if (!isPaused) {
      const newSnake = [...snake];
      const head = { ...newSnake[0] };

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

      newSnake.unshift(head);

      const collisionWithObstacle = obstacles.some(
        (obstacle) => obstacle.x === head.x && obstacle.y === head.y
      );

      if (collisionWithObstacle) {
        resetGame();
        return;
      }

      if (newSnake.length > GRID_SIZE * GRID_SIZE / 2) {
        setLevel(level + 1);
        resetGame();
      }

      newSnake.pop();

      setSnake(newSnake);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
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

  const resetGame = () => {
    setSnake([{ x: 0, y: 0 }]);
    setDirection('RIGHT');
    setObstacles(generateObstacles());
  };

  const generateObstacles = () => {
    const currentObstacleType = obstacleTypes.find((type) => type.level === selectedLevel);

    if (!currentObstacleType) {
      return [];
    }

    const newObstacles: Obstacle[] = [];

    for (let i = 0; i < currentObstacleType.density; i++) {
      newObstacles.push({
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      });
    }

    return newObstacles;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      moveSnake();
    }, 300);

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [snake, direction, isPaused]);

  useEffect(() => {
    setObstacles(generateObstacles());
  }, [selectedLevel]);

  return (
    <div className="game-container">
      <div className="sidebar">
        <h4>Select Level:</h4>
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(Number(e.target.value))}
        >
          <option value={1}>Level 1</option>
          <option value={2}>Level 2</option>
          <option value={3}>Level 3</option>
          {/* Add more levels as needed */}
        </select>
      </div>
      <div className="max-w-lg mx-auto p-4">
        <h3 className="text-2xl font-semibold mb-4">Game View - Level {level}</h3>
        <div className="grid">
          {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
            const x = index % GRID_SIZE;
            const y = Math.floor(index / GRID_SIZE);
            const isSnakeCell = snake.some((segment) => segment.x === x && segment.y === y);
            const isObstacleCell = obstacles.some((obstacle) => obstacle.x === x && obstacle.y === y);

            return (
              <div
                key={index}
                className={`cell w-${CELL_SIZE} h-${CELL_SIZE} ${
                  isSnakeCell
                    ? 'snake-cell'
                    : isObstacleCell
                    ? obstacleTypes.find((type) => type.level === selectedLevel)?.density === 0
                      ? obstacleColor
                      : `obstacle-type-${selectedLevel}`
                    : 'empty-cell'
                }`}
              />
            );
          })}
        </div>
        <div className="mt-4">
          <button
            onClick={resetGame}
            className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Reset
          </button>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game;