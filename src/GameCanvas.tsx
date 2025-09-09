import { useEffect, useRef } from 'react';

const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Paddle settings
  const paddleWidth = 100;
  const paddleHeight = 20;
  const paddleY = 570;
  const paddleSpeed = 7;

  // Store paddleX using useRef
  const paddleX = useRef((800 - paddleWidth) / 2); // center

  // Keys state
  const keys = useRef({
    ArrowLeft: false,
    ArrowRight: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const draw = () => {
      // Update paddle position
      if (keys.current.ArrowLeft) {
        paddleX.current -= paddleSpeed;
      }
      if (keys.current.ArrowRight) {
        paddleX.current += paddleSpeed;
      }

      // Keep paddle inside canvas
      if (paddleX.current < 0) paddleX.current = 0;
      if (paddleX.current + paddleWidth > canvas.width) {
        paddleX.current = canvas.width - paddleWidth;
      }

      // Clear canvas
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw paddle
      ctx.fillStyle = '#00f';
      ctx.fillRect(paddleX.current, paddleY, paddleWidth, paddleHeight);

      // Loop
      animationFrameId = requestAnimationFrame(draw);
    };

    // Handle keyboard input
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        keys.current[e.key] = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        keys.current[e.key] = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

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
