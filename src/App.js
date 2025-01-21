import React from 'react';
import VSCodeEditor from './components/VSCodeEditor';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>AI-powered Code Generator</h1>
      </header>
      <main>
        <VSCodeEditor />
      </main>
    </div>
  );
}

export default App;

