import { useEffect, useRef } from 'react';

const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Paddle settings
  const paddleWidth = 100;
  const paddleHeight = 20;
  const paddleY = 570;
  const paddleSpeed = 7;
  const paddleX = useRef((800 - paddleWidth) / 2);

  // Ball settings
  const ballRadius = 10;
  const ballX = useRef(400); // center of canvas
  const ballY = useRef(300);
  const ballDX = useRef(4);  // x speed
  const ballDY = useRef(-4); // y speed

  // Key tracking
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
      if (keys.current.ArrowLeft) paddleX.current -= paddleSpeed;
      if (keys.current.ArrowRight) paddleX.current += paddleSpeed;

      // Keep paddle in bounds
      if (paddleX.current < 0) paddleX.current = 0;
      if (paddleX.current + paddleWidth > canvas.width) {
        paddleX.current = canvas.width - paddleWidth;
      }

      // Update ball position
      ballX.current += ballDX.current;
      ballY.current += ballDY.current;

      // Bounce off left/right walls
      if (ballX.current - ballRadius < 0 || ballX.current + ballRadius > canvas.width) {
        ballDX.current *= -1;
      }

      // Bounce off top
      if (ballY.current - ballRadius < 0) {
        ballDY.current *= -1;
      }

      // Bounce off bottom (for now, reverse direction — we'll handle game over later)
      if (ballY.current + ballRadius > canvas.height) {
        ballDY.current *= -1;
      }

      // Clear canvas
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw paddle
      ctx.fillStyle = '#00f';
      ctx.fillRect(paddleX.current, paddleY, paddleWidth, paddleHeight);

      // Draw ball
      ctx.beginPath();
      ctx.arc(ballX.current, ballY.current, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#f00';
      ctx.fill();
      ctx.closePath();

      // Loop
      animationFrameId = requestAnimationFrame(draw);
    };

    // Keyboard handlers
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

    draw(); // Start game loop

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
