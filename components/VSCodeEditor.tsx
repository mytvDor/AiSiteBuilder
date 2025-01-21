'use client'

import { useState } from 'react'
import Editor from '@monaco-editor/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const files = [
  { name: 'index.html', language: 'html' },
  { name: 'styles.css', language: 'css' },
  { name: 'script.js', language: 'javascript' },
]

export default function VSCodeEditor() {
  const [activeFile, setActiveFile] = useState(files[0].name)
  const [code, setCode] = useState({
    'index.html': '',
    'styles.css': '',
    'script.js': '',
  })
  const [output, setOutput] = useState('')
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleEditorChange = (value: string | undefined) => {
    setCode(prev => ({ ...prev, [activeFile]: value || '' }))
  }

  const generateCode = async () => {
  setIsGenerating(true);
  try {
    // console.log("VSCODEFILE")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    //  console.log("hi from VSCODEFILE"+data.html)

    if (data.html && data.css && data.javascript) {
      setCode({
        'index.html': data.html,
        'styles.css': data.css,
        'script.js': data.javascript,
      });
      setActiveFile('index.html');
      setOutput('Code generated successfully. Check the editor tabs for the generated code.');
    } else {
      setOutput('Error generating code');
    }
  } catch (error) {
    console.error('Error generating code:', error);
    setOutput('Error generating code');
  }
  setIsGenerating(false);
};

  const runCode = async () => {
    setIsRunning(true)
    setOutput('Running code...')

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
    `
    setOutput('<iframe srcdoc="' + fullHtml.replace(/"/g, '&quot;') + '" style="width:100%;height:300px;border:0;"></iframe>')

    setIsRunning(false)
  }

  const saveCode = async () => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          html: code['index.html'],
          css: code['styles.css'],
          javascript: code['script.js'],
        }),
      })
      const data = await response.json()
      if (data.message) {
        setOutput('Files saved successfully')
      } else {
        setOutput('Error saving files')
      }
    } catch (error) {
      console.error('Error saving files:', error)
      setOutput('Error saving files')
    }
    setIsSaving(false)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center space-x-4">
        <Input
          type="text"
          placeholder="Enter your prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-grow"
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
      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded">
          <Tabs value={activeFile} onValueChange={setActiveFile}>
            <TabsList className="w-full">
              {files.map((file) => (
                <TabsTrigger key={file.name} value={file.name} className="flex-1">
                  {file.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {files.map((file) => (
              <TabsContent key={file.name} value={file.name} className="p-0">
                <Editor
                  height="400px"
                  language={file.language}
                  value={code[file.name as keyof typeof code]}
                  onChange={handleEditorChange}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                  }}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
        <div className="border rounded p-4 bg-gray-100">
          <h3 className="text-lg font-semibold mb-2">Output:</h3>
          <div dangerouslySetInnerHTML={{ __html: output }} />
        </div>
      </div>
    </div>
  )
}

