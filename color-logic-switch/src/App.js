import React, { useState, useEffect, useRef } from "react";

export default function App() {
  /* ------------------ BASE OPTIONS ------------------ */
  const baseColors = ["red", "green", "blue"];
  const baseShapes = ["square", "circle", "triangle"];

  /* ------------------ SETTINGS ------------------ */
  const [maxLevel, setMaxLevel] = useState(10);
  const [levelGoal, setLevelGoal] = useState(5);
  const [baseTime, setBaseTime] = useState(20);
  const [shapeSize, setShapeSize] = useState(150);

  const [optionalColors, setOptionalColors] = useState({
    orange: true,
    purple: true,
  });
  const [optionalShapes, setOptionalShapes] = useState({
    diamond: true,
  });

  const [colors, setColors] = useState([]);
  const [shapes, setShapes] = useState([]);

  /* ------------------ GAME STATE ------------------ */
  const [level, setLevel] = useState(1);
  const [answersThisLevel, setAnswersThisLevel] = useState(0);
  const [timer, setTimer] = useState(baseTime);
  const [gameActive, setGameActive] = useState(true);

  const [currentColor, setCurrentColor] = useState("");
  const [currentShape, setCurrentShape] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [feedback, setFeedback] = useState("");

  const timerRef = useRef(null);

  /* ------------------ HELPERS ------------------ */
  const getRandomItem = (arr) =>
    arr[Math.floor(Math.random() * arr.length)];

  const rebuildActiveLists = () => {
    const newColors = [...baseColors];
    if (optionalColors.orange) newColors.push("orange");
    if (optionalColors.purple) newColors.push("purple");

    const newShapes = [...baseShapes];
    if (optionalShapes.diamond) newShapes.push("diamond");

    setColors(newColors);
    setShapes(newShapes);
  };

  /* ------------------ START LEVEL ------------------ */
  const startLevel = () => {
    setAnswersThisLevel(0);

    const newTime = Math.max(5, baseTime - (level - 1) * 2);
    setTimer(newTime);

    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (!gameActive) return t;
        if (t <= 1) {
          gameOver();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    drawShape();
  };

  /* ------------------ DRAW SHAPE ------------------ */
  const drawShape = () => {
    const color = getRandomItem(colors);
    const shape = getRandomItem(shapes);

    setCurrentColor(color);
    setCurrentShape(shape);
    setCurrentPrompt(Math.random() < 0.5 ? "color" : "shape");
  };

  /* ------------------ CHECK ANSWER ------------------ */
  const checkAnswer = (value) => {
    if (!gameActive) return;

    let correct = false;
    if (currentPrompt === "color" && value === currentColor) correct = true;
    if (currentPrompt === "shape" && value === currentShape) correct = true;

    if (correct) {
      const newAnswers = answersThisLevel + 1;
      setAnswersThisLevel(newAnswers);
      setFeedback(`✅ Correct (${newAnswers}/${levelGoal})`);

      if (newAnswers >= levelGoal) {
        nextLevel();
        return;
      }
    } else {
      setFeedback("❌ Wrong!");
    }

    drawShape();
  };

  /* ------------------ NEXT LEVEL ------------------ */
  const nextLevel = () => {
    const newLevel = level + 1;

    if (newLevel > maxLevel) {
      youWin();
      return;
    }

    setLevel(newLevel);
    setFeedback("");
    startLevel();
  };

  /* ------------------ END STATES ------------------ */
  const youWin = () => {
    setGameActive(false);
    clearInterval(timerRef.current);
    setFeedback("🏆 YOU WIN! Incredible focus!");
  };

  const gameOver = () => {
    setGameActive(false);
    clearInterval(timerRef.current);
    setFeedback("💥 Time’s up! Game Over!");
  };

  /* ------------------ SETTINGS APPLY ------------------ */
  const applySettings = () => {
    rebuildActiveLists();
    setLevel(1);
    setGameActive(true);
    setFeedback("");
    startLevel();
  };

  const resetDefaults = () => {
    setMaxLevel(10);
    setLevelGoal(5);
    setBaseTime(20);
    setShapeSize(150);

    setOptionalColors({ orange: true, purple: true });
    setOptionalShapes({ diamond: true });

    rebuildActiveLists();
    setLevel(1);
    setGameActive(true);
    setFeedback("");
    startLevel();
  };

  /* ------------------ INIT ------------------ */
  useEffect(() => {
    rebuildActiveLists();
  }, []);

  useEffect(() => {
    startLevel();
    return () => clearInterval(timerRef.current);
  }, [colors.length, shapes.length]);

  /* ------------------ SHAPE RENDERING ------------------ */
  const renderShape = () => {
    const size = shapeSize;

    if (currentShape === "square") {
      return {
        width: size,
        height: size,
        backgroundColor: currentColor,
        margin: "auto",
      };
    }
    if (currentShape === "circle") {
      return {
        width: size,
        height: size,
        backgroundColor: currentColor,
        borderRadius: "50%",
        margin: "auto",
      };
    }
    if (currentShape === "triangle") {
      return {
        width: 0,
        height: 0,
        borderLeft: `${size / 2}px solid transparent`,
        borderRight: `${size / 2}px solid transparent`,
        borderBottom: `${size}px solid ${currentColor}`,
        margin: "auto",
      };
    }
    if (currentShape === "diamond") {
      return {
        width: 0,
        height: 0,
        borderLeft: `${size / 2}px solid transparent`,
        borderRight: `${size / 2}px solid transparent`,
        borderBottom: `${size / 2}px solid ${currentColor}`,
        margin: "auto",
        position: "relative",
      };
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 30, fontFamily: "Arial" }}>
      <h2>Game Settings</h2>

      {/* SETTINGS MENU */}
      <div
        style={{
          padding: 12,
          border: "2px solid #aaa",
          width: "80%",
          margin: "auto",
          borderRadius: 10,
          marginBottom: 25,
        }}
      >
        <label>
          Levels:
          <input
            type="number"
            min="1"
            max="20"
            value={maxLevel}
            onChange={(e) => setMaxLevel(Number(e.target.value))}
          />
        </label>

        <label style={{ marginLeft: 15 }}>
          Answers Per Level:
          <input
            type="number"
            min="1"
            max="20"
            value={levelGoal}
            onChange={(e) => setLevelGoal(Number(e.target.value))}
          />
        </label>

        <label style={{ marginLeft: 15 }}>
          Starting Time:
          <input
            type="number"
            min="5"
            max="60"
            value={baseTime}
            onChange={(e) => setBaseTime(Number(e.target.value))}
          />
        </label>

        <label style={{ marginLeft: 15 }}>
          Shape Size:
          <input
            type="range"
            min="50"
            max="250"
            value={shapeSize}
            onChange={(e) => setShapeSize(Number(e.target.value))}
          />
        </label>

        <div style={{ marginTop: 15 }}>
          <strong>Optional Colors:</strong><br />
          <label>
            <input
              type="checkbox"
              checked={optionalColors.orange}
              onChange={(e) =>
                setOptionalColors((o) => ({
                  ...o,
                  orange: e.target.checked,
                }))
              }
            />{" "}
            Orange
          </label>

          <label style={{ marginLeft: 10 }}>
            <input
              type="checkbox"
              checked={optionalColors.purple}
              onChange={(e) =>
                setOptionalColors((o) => ({
                  ...o,
                  purple: e.target.checked,
                }))
              }
            />{" "}
            Purple
          </label>
        </div>

        <div style={{ marginTop: 15 }}>
          <strong>Optional Shapes:</strong><br />
          <label>
            <input
              type="checkbox"
              checked={optionalShapes.diamond}
              onChange={(e) =>
                setOptionalShapes((o) => ({
                  ...o,
                  diamond: e.target.checked,
                }))
              }
            />{" "}
            Diamond
          </label>
        </div>

        <button onClick={applySettings} style={{ marginTop: 15 }}>
          Apply
        </button>
        <button onClick={resetDefaults} style={{ marginLeft: 10 }}>
          Reset Defaults
        </button>
      </div>

      <h1>Color-Logic Switch</h1>
      <p>Tap the {currentPrompt}</p>

      {/* SHAPE */}
      <div style={{ marginTop: 30 }}>
        <div style={renderShape()}>
          {/* Diamond bottom half */}
          {currentShape === "diamond" && (
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: `${shapeSize / 2}px solid transparent`,
                borderRight: `${shapeSize / 2}px solid transparent`,
                borderTop: `${shapeSize / 2}px solid ${currentColor}`,
                marginTop: 0,
              }}
            ></div>
          )}
        </div>
      </div>

      {/* COLOR BUTTONS */}
      <div style={{ margin: 10 }}>
        {["red", "green", "blue"].map(
          (c) => (
            <button key={c} onClick={() => checkAnswer(c)}>
              {c}
            </button>
          )
        )}

        {optionalColors.orange && (
          <button onClick={() => checkAnswer("orange")}>Orange</button>
        )}
        {optionalColors.purple && (
          <button onClick={() => checkAnswer("purple")}>Purple</button>
        )}
      </div>

      {/* SHAPE BUTTONS */}
      <div style={{ margin: 10 }}>
        {["square", "circle", "triangle"].map((s) => (
          <button key={s} onClick={() => checkAnswer(s)}>
            {s}
          </button>
        ))}
        {optionalShapes.diamond && (
          <button onClick={() => checkAnswer("diamond")}>Diamond</button>
        )}
      </div>

      <p style={{ fontWeight: "bold", fontSize: 20 }}>{feedback}</p>
      <p style={{ fontSize: 20 }}>Level: {level}</p>
      <p style={{ fontSize: 20 }}>⏱ Time: {timer}s</p>
    </div>
  );
}
