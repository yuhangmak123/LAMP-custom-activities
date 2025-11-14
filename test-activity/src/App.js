
import './App.css';

const logoBase64 = 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgc3R5bGU9ImZpbGw6I2ZmYzAwMDsiIC8+Cjwvc3ZnPg==';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={`data:image/svg+xml;base64,${logoBase64}`} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;