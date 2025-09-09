import { useEffect, useRef } from 'react';

const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Paddle settings
  const paddleWidth = 100;
  const paddleHeight = 20;
  const paddleY = 570; // 600 (canvas height) - 30
  const paddleX = (800 - paddleWidth) / 2; // center horizontally

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const draw = () => {
      // Clear the canvas
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw paddle
      ctx.fillStyle = '#00f'; // blue
      ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);

      // Loop
      animationFrameId = requestAnimationFrame(draw);
    };

    draw(); // Start drawing

    return () => cancelAnimationFrame(animationFrameId);
  }, [paddleX]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{ border: '2px solid #fff', display: 'block', margin: '0 auto' }}
    />
  );
};

export default GameCanvas;
