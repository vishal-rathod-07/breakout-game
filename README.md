# 🧱 Breakout Game in React

This is a classic **Breakout/Brick Breaker** game built using **React** and the HTML5 **Canvas API**.

You control a paddle at the bottom of the screen to bounce a ball and break all the bricks. Lose all your lives and it's game over. Break all the bricks and you win!

---

## 🎮 Features

- Real-time paddle and ball movement
- Brick collision detection
- Score and lives tracking
- Win and game over states with canvas animations
- Responsive paddle controls with arrow keys
- Restart button to reset game state

---

## 🛠️ Tech Stack

- [React](https://reactjs.org/)
- HTML5 `<canvas>`
- TypeScript (optional, but assumed in code)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/react-breakout-game.git
cd react-breakout-game
````

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

This will open the game in your browser at `http://localhost:3000`

---

## 🎯 Controls

* **Left Arrow**: Move paddle left
* **Right Arrow**: Move paddle right
* **Restart Button**: Resets the entire game (score, lives, bricks, ball, paddle)

---

## 📁 Project Structure

```
src/
├── components/
│   └── GameCanvas.tsx     # Main game logic using canvas
├── App.tsx                # App wrapper
└── index.tsx              # Entry point
```

---

## 📦 Build for Production

```bash
npm run build
```

This will generate a production-ready build in the `build/` directory.

---

## 🧩 Ideas for Improvements

* Add power-ups (extra life, wider paddle, multi-ball, etc.)
* Add sound effects and music
* Add difficulty levels or multiple stages
* Mobile/touch controls
* Better graphics with sprite images

---

## 🙌 Acknowledgements

Inspired by the original **Breakout** game by Atari.
Built for learning and fun using React + Canvas!
