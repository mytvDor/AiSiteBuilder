import CodeEditor from '@/components/CodeEditor'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-black">Gemini-powered Code Generator</h1>
      <CodeEditor />
    </main>
  )
}

