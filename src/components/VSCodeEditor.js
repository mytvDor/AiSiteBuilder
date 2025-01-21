import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Button, Input, Tabs, Tab } from './ui-components';

const files = [
  { name: 'index.html', language: 'html' },
  { name: 'styles.css', language: 'css' },
  { name: 'script.js', language: 'javascript' },
];

function VSCodeEditor() {
  const [activeFile, setActiveFile] = useState(files[0].name);
  const [code, setCode] = useState({
    'index.html': '',
    'styles.css': '',
    'script.js': '',
  });
  const [output, setOutput] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleEditorChange = (value) => {
    setCode(prev => ({ ...prev, [activeFile]: value || '' }));
  };

  const generateCode = async () => {
    setIsGenerating(true);
    setOutput('Generating code...');
    try {
      if (!prompt.trim()) {
        throw new Error('Please enter a prompt before generating code.');
      }
      // In a real application, you would make an API call here
      // For this example, we'll use our simulated function
      const simulatedResponse = await simulateCodeGeneration(prompt);
      setCode(simulatedResponse);
      setOutput('Code generated successfully');
    } catch (error) {
      console.error('Error generating code:', error);
      setOutput(`Error generating code: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput('Running code...');

    const fullHtml = `
      <html>
        <head>
          <style>${code['styles.css']}</style>
        </head>
        <body>
          ${code['index.html']}
          <script>${code['script.js']}</script>
        </body>
      </html>
    `;
    setOutput('<iframe srcdoc="' + fullHtml.replace(/"/g, '&quot;') + '" style="width:100%;height:300px;border:0;"></iframe>');

    setIsRunning(false);
  };

  const saveCode = () => {
    setIsSaving(true);
    // In a real application, you would make an API call or use local storage here
    // For this example, we'll just simulate saving
    setTimeout(() => {
      setOutput('Files saved successfully');
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="vscode-editor">
      <div className="editor-controls">
        <Input
          type="text"
          placeholder="Enter your prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button onClick={generateCode} disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Generate'}
        </Button>
        <Button onClick={runCode} disabled={isRunning}>
          {isRunning ? 'Running...' : 'Run Code'}
        </Button>
        <Button onClick={saveCode} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Files'}
        </Button>
      </div>
      <div className="editor-container">
        <div className="code-editor">
          <Tabs activeTab={activeFile} onChange={setActiveFile}>
            {files.map((file) => (
              <Tab key={file.name} label={file.name}>
                <Editor
                  height="400px"
                  language={file.language}
                  value={code[file.name]}
                  onChange={handleEditorChange}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                  }}
                />
              </Tab>
            ))}
          </Tabs>
        </div>
        <div className="output">
          <h3>Output:</h3>
          <div dangerouslySetInnerHTML={{ __html: output }} />
        </div>
      </div>
    </div>
  );
}

// Simulated code generation function
function simulateCodeGeneration(prompt) {
  return new Promise((resolve, reject) => {
    // Simulate API call delay
    setTimeout(() => {
      if (Math.random() < 0.1) {  // 10% chance of error for demonstration
        reject(new Error('Failed to generate code. Please try again.'));
      } else {
        resolve({
          'index.html': `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated from prompt: ${prompt}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Generated from prompt: ${prompt}</h1>
    <div id="app"></div>
    <script src="script.js"></script>
</body>
</html>`,
          'styles.css': `
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    color: #2c3e50;
    text-align: center;
}

#app {
    background-color: #ecf0f1;
    border-radius: 5px;
    padding: 20px;
    margin-top: 20px;
}`,
          'script.js': `
document.addEventListener('DOMContentLoaded', (event) => {
    const app = document.getElementById('app');
    app.innerHTML = '<p>This is a simple web app generated from the prompt: "${prompt}"</p>';
    
    // Add a button that changes text color when clicked
    const button = document.createElement('button');
    button.textContent = 'Click me!';
    button.addEventListener('click', () => {
        app.style.color = getRandomColor();
    });
    app.appendChild(button);
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}`,
        });
      }
    }, 1000);  // Simulate 1 second delay
  });
}

export default VSCodeEditor;

