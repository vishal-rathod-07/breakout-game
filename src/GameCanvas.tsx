import React, { useEffect, useRef } from 'react';

const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [score, setScore] = React.useState(0);
  const [lives, setLives] = React.useState(3);
  const [gameOver, setGameOver] = React.useState(false);
  const [gameWin, setGameWin] = React.useState(false);

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
  const ballDX = useRef(4); // x speed
  const ballDY = useRef(-4); // y speed

  // Key tracking
  const keys = useRef({
    ArrowLeft: false,
    ArrowRight: false,
  });

  // Brick settings
  const brickRowCount = 5;
  const brickColumnCount = 8;
  const brickWidth = 75;
  const brickHeight = 20;
  const brickPadding = 10;
  const brickOffsetTop = 20;
  const brickOffsetLeft = 65;

  // Create 2D array of bricks
  const bricks = useRef(
    Array.from({ length: brickRowCount }, (_, row) =>
      Array.from({ length: brickColumnCount }, (_, col) => ({
        x: col * (brickWidth + brickPadding) + brickOffsetLeft,
        y: row * (brickHeight + brickPadding) + brickOffsetTop,
        width: brickWidth,
        height: brickHeight,
        active: true,
      })),
    ),
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const draw = () => {
  if (gameOver || gameWin) return; // Stop animation on game end

  // Update paddle position based on keys
  if (keys.current.ArrowLeft) paddleX.current -= paddleSpeed;
  if (keys.current.ArrowRight) paddleX.current += paddleSpeed;

  // Keep paddle inside canvas
  if (paddleX.current < 0) paddleX.current = 0;
  if (paddleX.current + paddleWidth > canvas.width) paddleX.current = canvas.width - paddleWidth;

  // Update ball position
  ballX.current += ballDX.current;
  ballY.current += ballDY.current;

  // Bounce ball off left/right walls
  if (ballX.current - ballRadius < 0 || ballX.current + ballRadius > canvas.width) {
    ballDX.current *= -1;
  }

  // Bounce ball off top
  if (ballY.current - ballRadius < 0) {
    ballDY.current *= -1;
  }

  // Check if ball hits bottom (miss paddle)
  if (ballY.current + ballRadius > canvas.height) {
    if (lives > 1) {
      setLives(lives - 1);

      // Reset ball and paddle positions
      ballX.current = canvas.width / 2;
      ballY.current = canvas.height - 30;
      ballDX.current = 4;
      ballDY.current = -4;
      paddleX.current = (canvas.width - paddleWidth) / 2;
    } else {
      setGameOver(true);
      cancelAnimationFrame(animationFrameId);
      return;
    }
  }

  // Bounce ball off paddle
  if (
    ballY.current + ballRadius >= paddleY &&
    ballX.current >= paddleX.current &&
    ballX.current <= paddleX.current + paddleWidth
  ) {
    ballDY.current *= -1;

    // Add some angle based on hit location
    const hitPoint = ballX.current - (paddleX.current + paddleWidth / 2);
    ballDX.current = hitPoint * 0.15;
  }

  // Check collision with bricks
  bricks.current.forEach((row) => {
    row.forEach((brick) => {
      if (brick.active) {
        if (
          ballX.current > brick.x &&
          ballX.current < brick.x + brick.width &&
          ballY.current > brick.y &&
          ballY.current < brick.y + brick.height
        ) {
          ballDY.current *= -1;
          brick.active = false;
          setScore((prev) => prev + 1);

          // Check win condition
          const allCleared = bricks.current.every(row => row.every(b => !b.active));
          if (allCleared) {
            setGameWin(true);
            cancelAnimationFrame(animationFrameId);
            return;
          }
        }
      }
    });
  });

  // Clear the canvas
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw bricks
  bricks.current.forEach((row) => {
    row.forEach((brick) => {
      if (brick.active) {
        ctx.fillStyle = '#0f0';
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
      }
    });
  });

  // Draw paddle
  ctx.fillStyle = '#00f';
  ctx.fillRect(paddleX.current, paddleY, paddleWidth, paddleHeight);

  // Draw ball
  ctx.beginPath();
  ctx.arc(ballX.current, ballY.current, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#f00';
  ctx.fill();
  ctx.closePath();

  // Draw score and lives
  ctx.fillStyle = '#fff';
  ctx.font = '16px Arial';
  ctx.fillText(`Score: ${score}`, 8, 20);
  ctx.fillText(`Lives: ${lives}`, canvas.width - 75, 20);

  // Draw game over or win message
  if (gameOver) {
    ctx.font = '48px Arial';
    ctx.fillText('GAME OVER', canvas.width / 2 - 120, canvas.height / 2);
  }
  if (gameWin) {
    ctx.font = '48px Arial';
    ctx.fillText('YOU WIN!', canvas.width / 2 - 100, canvas.height / 2);
  }

  // Continue the animation loop
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
  }, [gameOver, gameWin, lives, score]);

  return (
    <>
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{ border: '2px solid #fff', display: 'block', margin: '0 auto' }}
      />
    <button onClick={() => {
      setScore(0);
      setLives(3);
      setGameOver(false);
      setGameWin(false);
      // Reset positions here as well
    }}>Restart</button>
    </>
  );
};

export default GameCanvas;
