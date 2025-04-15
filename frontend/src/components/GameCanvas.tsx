import { useEffect, useRef, useState } from "react";

const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [position, setPosition] = useState({ x: 500, y: 500 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "red";
      ctx.fillRect(position.x, position.y, 50, 50);
    };

    draw();
  }, [position]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setPosition((prev) => {
        const step = 10;
        switch (e.key.toLowerCase()) {
          case "e":
            return { ...prev, y: prev.y - step };
          case "s":
            return { ...prev, x: prev.x - step };
          case "d":
            return { ...prev, y: prev.y + step };
          case "f":
            return { ...prev, x: prev.x + step };
          default:
            return prev;
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return <canvas ref={canvasRef} className="block" />;
};

export default GameCanvas;
