// 'use client'

// import { useState, useEffect } from 'react'
// import Editor from '@monaco-editor/react'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'

// const files = [
//   { name: 'index.html', language: 'html' },
//   { name: 'styles.css', language: 'css' },
//   { name: 'script.js', language: 'javascript' },
// ]

// export default function CodeEditor() {
//   const [activeFile, setActiveFile] = useState(files[0].name)
//   const [code, setCode] = useState({
//     'index.html': '',
//     'styles.css': '',
//     'script.js': '',
//   })
//   const [output, setOutput] = useState('')
//   const [prompt, setPrompt] = useState('')
//   const [isGenerating, setIsGenerating] = useState(false)
//   const [isRunning, setIsRunning] = useState(false)
//   const [isSaving, setIsSaving] = useState(false)
//   const [blobUrl, setBlobUrl] = useState<string | null>(null)

//   const handleEditorChange = (value: string | undefined, event: any) => {
//     const fileName = event.target.id.split('-')[0]
//     console.log(`Updating ${fileName} with new value:`, value);
//     setCode(prev => ({ ...prev, [fileName]: value || '' }))
//   }

//   const generateCode = async () => {
//     setIsGenerating(true)
//     setOutput('Generating code...')
//     try {
//       const response = await fetch('/api/generate', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ prompt }),
//       })
//       const data = await response.json()
//       // Log the generated code for each file
//       console.log('Generated HTML:', data.html);
//       console.log('Generated CSS:', data.css);
//       console.log('Generated JavaScript:', data.javascript);
//       setCode({
//         'index.html': data.html,
//         'styles.css': data.css,
//         'script.js': data.javascript,
//       })
//       setActiveFile('index.html')
//       setOutput('Code generated successfully. Check the editor tabs for the generated code.')
//     } catch (error) {
//       console.error('Error generating code:', error)
//       setOutput('Error generating code')
//     }
//     setIsGenerating(false)
//   }

//   const runCode = async () => {
//     setIsRunning(true)
//     setOutput('Running code...')

//     const fullHtml = `
//       <html>
//         <head>
//           <style>${code['styles.css']}</style>
//         </head>
//         <body>
//           ${code['index.html']}
//           <script>${code['script.js']}</script>
//         </body>
//       </html>
//     `
//     const blob = new Blob([fullHtml], { type: 'text/html' })
//     const url = URL.createObjectURL(blob)
//     setBlobUrl(url)
//     setOutput('<iframe src="' + url + '" style="width:100%;height:300px;border:0;"></iframe>')

//     setIsRunning(false)
//   }

//   const saveCode = async () => {
//     setIsSaving(true)
//     try {
//       const response = await fetch('/api/save', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(code),
//       })
//       const data = await response.json()
//       if (data.message) {
//         setOutput('Files saved successfully')
//       } else {
//         setOutput('Error saving files')
//       }
//     } catch (error) {
//       console.error('Error saving files:', error)
//       setOutput('Error saving files')
//     }
//     setIsSaving(false)
//   }

//   const openInNewTab = () => {
//     if (blobUrl) {
//       window.open(blobUrl, '_blank')
//     }
//   }

//   useEffect(() => {
//     return () => {
//       if (blobUrl) {
//         URL.revokeObjectURL(blobUrl)
//       }
//     }
//   }, [blobUrl])

//   useEffect(() => {
//     console.log('Current code state:', code);
//   }, [code]);

//   return (
//     <div className="container mx-auto p-4">
//       <div className="mb-4 flex items-center space-x-4">
//         <Input
//           type="text"
//           placeholder="Enter your prompt"
//           value={prompt}
//           onChange={(e:any) => setPrompt(e.target.value)}
//           className="flex-grow text-black"
//         />
//         <Button onClick={generateCode} disabled={isGenerating}>
//           {isGenerating ? 'Generating...' : 'Generate'}
//         </Button>
//         <Button onClick={runCode} disabled={isRunning}>
//           {isRunning ? 'Running...' : 'Run Code'}
//         </Button>
//         <Button onClick={openInNewTab} disabled={!blobUrl}>
//           Open in New Tab
//         </Button>
//         <Button onClick={saveCode} disabled={isSaving}>
//           {isSaving ? 'Saving...' : 'Save Files'}
//         </Button>
//       </div>
//       <div className="grid grid-cols-2 gap-4">
//         <div className="border rounded">
//           <Tabs value={activeFile} onValueChange={setActiveFile}>
//             <TabsList className="w-full">
//               {files.map((file) => (
//                 <TabsTrigger key={file.name} value={file.name} className="flex-1">
//                   {file.name}
//                 </TabsTrigger>
//               ))}
//             </TabsList>
//             {files.map((file) => (
//               <TabsContent key={file.name} value={file.name} className="p-0">
//                 <Editor
//                   key={`${file.name}-${code[file.name as keyof typeof code]}`}
//                   height="400px"
//                   language={file.language}
//                   value={code[file.name as keyof typeof code]}
//                   onChange={handleEditorChange}
//                   theme="vs-dark"
//                   options={{
//                     minimap: { enabled: false },
//                     fontSize: 14,
//                   }}
//                   onMount={() => {
//                     console.log(`${file.name} content:`, code[file.name as keyof typeof code]);
//                   }}
//                 />
//               </TabsContent>
//             ))}
//           </Tabs>
//         </div>
//         <div className="border rounded p-4 bg-gray-100">
//           <h3 className="text-lg font-semibold mb-2">Output:</h3>
//           <div dangerouslySetInnerHTML={{ __html: output }} />
//         </div>
//       </div>
//     </div>
//   )
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import Editor from '@monaco-editor/react';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';

// // Define the structure of your files
// const files = [
//   { name: 'index.html', language: 'html' },
//   { name: 'styles.css', language: 'css' },
//   { name: 'script.js', language: 'javascript' },
// ];

// // Define the structure of the code state
// type CodeState = {
//   [key: string]: string;
// };

// export default function CodeEditor() {
//   const [activeFile, setActiveFile] = useState(files[0].name); // Default to 'index.html'
//   const [code, setCode] = useState<CodeState>({
//     'index.html': '',
//     'styles.css': '',
//     'script.js': '',
//   });
//   const [output, setOutput] = useState('');
//   const [prompt, setPrompt] = useState('');
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isRunning, setIsRunning] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [blobUrl, setBlobUrl] = useState<string | null>(null);

//   const handleEditorChange = (value: string | undefined) => {
//     setCode((prev) => ({ ...prev, [activeFile]: value || '' }));
//   };

//   const generateCode = async () => {
//     setIsGenerating(true);
//     setOutput('Generating code...');
//     try {
//       const response = await fetch('/api/generate', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ prompt }),
//       });
//       const data = await response.json();
// // console.log("from code editor"+ data.html +"css"+data.css)
//       setCode({
//         'index.html': data.html || '',
//         'styles.css': data.css || '',
//         'script.js': data.javascript || '',
//       });

//       setActiveFile('index.html');
//       setOutput('Code generated successfully. Check the editor tabs for the generated code.');
//     } catch (error) {
//       console.error('Error generating code:', error);
//       setOutput('Error generating code.');
//     }
//     setIsGenerating(false);
//   };

//   const runCode = async () => {
//     setIsRunning(true);
//     setOutput('Running code...');

//     const fullHtml = `
//       <html>
//         <head>
//           <style>${code['styles.css']}</style>
//         </head>
//         <body>
//           ${code['index.html']}
//           <script>${code['script.js']}</script>
//         </body>
//       </html>
//     `;
//     const blob = new Blob([fullHtml], { type: 'text/html' });
//     const url = URL.createObjectURL(blob);
//     setBlobUrl(url);
//     setOutput(`<iframe src="${url}" style="width:100%;height:300px;border:0;"></iframe>`);

//     setIsRunning(false);
//   };

//   const saveCode = async () => {
//     setIsSaving(true);
//     try {
//       const response = await fetch('/api/save', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(code),
//       });
//       const data = await response.json();

//       if (data.message) {
//         setOutput('Files saved successfully.');
//       } else {
//         setOutput('Error saving files.');
//       }
//     } catch (error) {
//       console.error('Error saving files:', error);
//       setOutput('Error saving files.');
//     }
//     setIsSaving(false);
//   };

//   const openInNewTab = () => {
//     if (blobUrl) {
//       window.open(blobUrl, '_blank');
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (blobUrl) {
//         URL.revokeObjectURL(blobUrl);
//       }
//     };
//   }, [blobUrl]);

//   return (
//     <div className="container mx-auto p-4">
//       <div className="mb-4 flex items-center space-x-4">
//         <Input
//           type="text"
//           placeholder="Enter your prompt"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           className="flex-grow text-black"
//         />
//         <Button onClick={generateCode} disabled={isGenerating}>
//           {isGenerating ? 'Generating...' : 'Generate'}
//         </Button>
//         <Button onClick={runCode} disabled={isRunning}>
//           {isRunning ? 'Running...' : 'Run Code'}
//         </Button>
//         <Button onClick={openInNewTab} disabled={!blobUrl}>
//           Open in New Tab
//         </Button>
//         <Button onClick={saveCode} disabled={isSaving}>
//           {isSaving ? 'Saving...' : 'Save Files'}
//         </Button>
//       </div>
//       <div className="grid grid-cols-2 gap-4">
//         <div className="border rounded">
//           <Tabs value={activeFile} onValueChange={setActiveFile}>
//             <TabsList className="w-full">
//               {files.map((file) => (
//                 <TabsTrigger key={file.name} value={file.name} className="flex-1">
//                   {file.name}
//                 </TabsTrigger>
//               ))}
//             </TabsList>
//             {files.map((file) => (
//               <TabsContent key={file.name} value={file.name} className="p-0">
//                 <Editor
//                   height="400px"
//                   language={file.language}
//                   value={code[file.name] || ''}
//                   onChange={handleEditorChange}
//                   theme="vs-dark"
//                   options={{
//                     minimap: { enabled: false },
//                     fontSize: 14,
//                   }}
//                 />
//               </TabsContent>
//             ))}
//           </Tabs>
//         </div>
//         <div className="border rounded p-4 bg-gray-100">
//           <h3 className="text-lg font-semibold mb-2">Output:</h3>
//           <div dangerouslySetInnerHTML={{ __html: output }} />
//         </div>
//       </div>
//     </div>
//   );
// }


"use client"

import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaPlay, FaExternalLinkAlt, FaDownload } from 'react-icons/fa';
import JSZip from 'jszip';
// Define the structure of your files
const files = [
  { name: 'index.html', language: 'html' },
  { name: 'styles.css', language: 'css' },
  { name: 'script.js', language: 'javascript' },
];

// Define the structure of the code state
type CodeState = {
  [key: string]: string;
};

export default function CodeEditor() {
  const [activeFile, setActiveFile] = useState(files[0].name); // Default to 'index.html'
  const [code, setCode] = useState<CodeState>({
    'index.html': '',
    'styles.css': '',
    'script.js': '',
  });
  const [output, setOutput] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  // Handle editor change for real-time updates
  const handleEditorChange = (value: string | undefined) => {
    setCode((prev) => ({ ...prev, [activeFile]: value || '' }));

    // Save the code in real-time
    saveCode(value || '');
  };

  // Generate code based on the provided prompt
  const generateCode = async () => {
    setIsGenerating(true);
    setOutput('Generating code...');
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        setOutput(`Error: ${response.statusText}`);
        return;
      }

      const data = await response.json().catch(() => null); // Safely handle invalid JSON
      if (data) {
        setCode({
          'index.html': data.html || '',
          'styles.css': data.css || '',
          'script.js': data.javascript || '',
        });
        setActiveFile('index.html');
        setOutput('Code generated successfully. Check the editor tabs for the generated code.');
      } else {
        setOutput('Invalid response or no data returned.');
      }
    } catch (error) {
      console.error('Error generating code:', error);
      setOutput('Error generating code.');
    }
    setIsGenerating(false);
  };

  // Run the generated code
  const runCode = async () => {
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
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    setBlobUrl(url);
    setOutput(`<iframe src="${url}" style="width:100%;height:300px;border:0;"></iframe>`);

    setIsRunning(false);
  };

  // Save the current code to the server
  const saveCode = async (codeContent: string) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(code),
      });

      if (!response.ok) {
        setOutput(`Error: ${response.statusText}`);
        return;
      }

      const data = await response.json().catch(() => null); // Catch any errors during JSON parsing

      if (data && data.message) {
        setOutput('Files saved successfully.');
      } else {
        setOutput('Error saving files or invalid response.');
      }
    } catch (error) {
      console.error('Error saving files:', error);
      setOutput('Error saving files.');
    }
    setIsSaving(false);
  };

  // Download the code as a zip
  const downloadCode = () => {
    const zip = new JSZip();
    for (const [filename, content] of Object.entries(code)) {
      zip.file(filename, content);
    }
    zip.generateAsync({ type: 'blob' }).then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'code.zip';
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  // Open the code in a new tab
  const openInNewTab = () => {
    if (blobUrl) {
      window.open(blobUrl, '_blank');
    }
  };

  // Clean up the blob URL when the component is unmounted
  useEffect(() => {
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [blobUrl]);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center space-x-4">
        <Input
          type="text"
          placeholder="Enter your prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-grow text-black"
        />
        <Button onClick={generateCode} disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Generate'}
        </Button>
        <Button onClick={runCode} disabled={isRunning}>
          <FaPlay /> {isRunning ? 'Running...' :""}
        </Button>
        <Button onClick={openInNewTab} disabled={!blobUrl}>
          <FaExternalLinkAlt /> 
        </Button>
        <Button onClick={downloadCode}>
          <FaDownload /> 
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
                  value={code[file.name] || ''}
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
          <h3 className="text-lg font-semibold mb-2 text-black">Output:</h3>
          <div dangerouslySetInnerHTML={{ __html: output }} />
        </div>
      </div>
    </div>
  );
}
