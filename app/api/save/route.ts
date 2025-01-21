import { writeFile } from 'fs/promises';
import { join } from 'path';

// export async function POST(request: Request) {
//   const { html, css, javascript } = await request.json();

//   try {
//     const basePath = join(process.cwd(), 'public', 'generated');
    
//     await writeFile(join(basePath, 'index.html'), html);
//     await writeFile(join(basePath, 'styles.css'), css);
//     await writeFile(join(basePath, 'script.js'), javascript);

//     return new Response(JSON.stringify({ message: 'Files saved successfully' }), {
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Error saving files:', error);
//     return new Response(JSON.stringify({ error: 'Failed to save files' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }

export async function POST_save(request: Request) {
    const { html, css, javascript } = await request.json();
  
    try {
      const basePath = join(process.cwd(), "public", "generated");
  
      await writeFile(join(basePath, "index.html"), html);
      await writeFile(join(basePath, "styles.css"), css);
      await writeFile(join(basePath, "script.js"), javascript);
  
      return new Response(JSON.stringify({ message: "Files saved successfully" }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error saving files:", error);
      return new Response(JSON.stringify({ error: "Failed to save files" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }