import logo from './logo.svg';
import './App.css';

// Convert logo to base64
const logoBase64 = `data:image/svg+xml;base64,${btoa(
  require('./logo.svg').default
)}`;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logoBase64} className="App-logo" alt="logo" />
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