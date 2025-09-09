import GameCanvas from './GameCanvas';
import './App.css'

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', color: '#fff' }}>Breakout Game</h1>
      <GameCanvas />
    </div>
  );
}

export default App;
