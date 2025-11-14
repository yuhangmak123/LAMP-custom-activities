import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const LIGHTS = ['red', 'yellow', 'green'];

function App() {
  const [gameActive, setGameActive] = useState(false);
  const [currentColor, setCurrentColor] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [message, setMessage] = useState('');
  const [turnActive, setTurnActive] = useState(true);

  const reactionTimerRef = useRef(null);
  const gameTimerRef = useRef(null);
  const lastColorRef = useRef(null);
  const penaltiesRef = useRef(0);

  const resetLights = () => setCurrentColor(null);

  const nextColor = () => {
    if (remainingTime <= 0) return endGame();

    const colors = LIGHTS.filter(c => c !== lastColorRef.current);
    const nextIndex = Math.floor(Math.random() * colors.length);
    const color = colors[nextIndex];
    lastColorRef.current = color;

    resetLights();
    setCurrentColor(color);
    setMessage('');
    setTurnActive(true);
    penaltiesRef.current = 0;

    if (color === 'yellow') {
      reactionTimerRef.current = setTimeout(() => {
        if (turnActive) {
          setTurnActive(false);
          nextColor();
        }
      }, Math.random() * 2000 + 3000);
    } else {
      startReactionTimer();
    }
  };

  const startReactionTimer = () => {
    setTurnActive(true);
    penaltiesRef.current = 0;
    clearTimeout(reactionTimerRef.current);
    reactionTimerRef.current = setTimeout(() => {
      if (turnActive && penaltiesRef.current < 1) {
        setMessage('Quick!');
        updateScore('late');
        penaltiesRef.current = 1;
      }
    }, 3000);
  };

  const updateScore = (type) => {
    if (penaltiesRef.current >= 1) return;
    let newScore = score;
    if (type === 'perfect') newScore += 3;
    else if (type === 'wrong') newScore -= 2;
    else if (type === 'late') newScore -= 1;
    if (newScore < 0) newScore = 0;
    penaltiesRef.current = 1;
    setScore(newScore);
    if (newScore > highScore) setHighScore(newScore);
  };

  const handlePress = (button) => {
    if (!turnActive) return;
    clearTimeout(reactionTimerRef.current);

    if (currentColor === 'green') {
      button === 'left' ? updateScore('perfect') : updateScore('wrong');
      setMessage(button === 'left' ? 'Perfect' : 'Wrong');
    } else if (currentColor === 'yellow') {
      setMessage('Wrong');
      updateScore('wrong');
      setTurnActive(false);
      nextColor();
      return;
    } else if (currentColor === 'red') {
      button === 'right' ? updateScore('perfect') : updateScore('wrong');
      setMessage(button === 'right' ? 'Perfect' : 'Wrong');
    }

    setTurnActive(false);
    nextColor();
  };

  useEffect(() => {
    if (!gameActive) return;

    gameTimerRef.current = setInterval(() => {
      setRemainingTime(time => {
        if (time <= 1) {
          endGame();
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(gameTimerRef.current);
  }, [gameActive]);

  const startGame = (level) => {
    setCurrentLevel(level);
    setGameActive(true);
    setScore(0);
    setRemainingTime(level === 1 ? 30 : level === 2 ? 60 : 120);
    lastColorRef.current = null;
    nextColor();
  };

  const endGame = () => {
    clearInterval(gameTimerRef.current);
    clearTimeout(reactionTimerRef.current);
    setGameActive(false);
    setCurrentColor(null);
    setTurnActive(false);
    setMessage(`Round over! Final score: ${score}`);
  };

  const goHome = () => {
    setGameActive(false);
    setMessage('');
    setScore(0);
    setRemainingTime(0);
    setCurrentColor(null);
  };

  return (
    <div className="App">
      {!gameActive ? (
        <div id="home">
          <h1>Welcome to Traffic React!</h1>
          <h2>Select a game duration below to begin</h2>
          <div id="instructions">
            How to play: Press 'Gas' when green, press 'Brake' when red, and do nothing when yellow. React within 3 seconds to score points.
          </div>
          <button onClick={() => startGame(1)}>30 sec game</button>
          <button onClick={() => startGame(2)}>1 min game</button>
          <button onClick={() => startGame(3)}>2 min game</button>
        </div>
      ) : (
        <div id="game">
          <button onClick={goHome}>← Back</button>
          <div id="status">
            <div id="highScoreRow">High Score: {highScore}</div>
            <div id="scoreRow">Score: {score}</div>
            <div id="timeRow">Time: {remainingTime}s</div>
          </div>

          <div id="traffic-container">
            <div id="traffic">
              <div
                className="light"
                style={{ backgroundColor: currentColor === 'red' ? 'red' : '#333' }}
              />
              <div
                className="light"
                style={{ backgroundColor: currentColor === 'yellow' ? 'yellow' : '#333' }}
              />
              <div
                className="light"
                style={{ backgroundColor: currentColor === 'green' ? 'green' : '#333' }}
              />
            </div>
          </div>

          <div id="message">{message}</div>

          <div className="btn-container">
            <button onClick={() => handlePress('left')}>Gas</button>
            <button onClick={() => handlePress('right')}>Brake</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
