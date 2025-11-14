
import './App.css';
import React, { useRef, useEffect } from 'react';

function App() {
    const canvasRef = useRef(null); // Create a ref to hold the canvas DOM element
    const [location, setLocation] = React.useState({ x: 50, y: 50 });
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d'); // Get the 2D rendering context

    // Drawing operations can be performed here
    ctx.fillStyle = 'blue';
    ctx.fillRect(location.x, location.y, 100, 100);

    const handle = setInterval(() => {
      setLocation(prev => {
        const newX = (prev.x + 5) % canvas.width;
        const newY = (prev.y + 5) % canvas.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.fillRect(newX, newY, 100, 100); // Draw the rectangle at new position
        return { x: newX, y: newY };
      });
    }, 1000);
    
    return () => {
      // Cleanup if necessary
      clearInterval(handle);
    }
  

  }, []); // Re-run effect if drawFunction prop changes

  return <canvas ref={canvasRef} width={400} height={300} />;
}

export default App;