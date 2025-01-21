// // import { writeFile } from 'fs/promises';
// // import { join } from 'path';

// // export async function POST(request: Request) {
// //   const { html, css, javascript } = await request.json();

// //   try {
// //     const basePath = join(process.cwd(), 'public', 'generated');
    
// //     await writeFile(join(basePath, 'index.html'), html);
// //     await writeFile(join(basePath, 'styles.css'), css);
// //     await writeFile(join(basePath, 'script.js'), javascript);

// //     return new Response(JSON.stringify({ message: 'Files saved successfully' }), {
// //       headers: { 'Content-Type': 'application/json' },
// //     });
// //   } catch (error) {
// //     console.error('Error saving files:', error);
// //     return new Response(JSON.stringify({ error: 'Failed to save files' }), {
// //       status: 500,
// //       headers: { 'Content-Type': 'application/json' },
// //     });
// //   }
// // }

// // export async function POST_save(request: Request) {
// //     const { html, css, javascript } = await request.json();
  
// //     try {
// //       const basePath = join(process.cwd(), "public", "generated");
  
// //       await writeFile(join(basePath, "index.html"), html);
// //       await writeFile(join(basePath, "styles.css"), css);
// //       await writeFile(join(basePath, "script.js"), javascript);
  
// //       return new Response(JSON.stringify({ message: "Files saved successfully" }), {
// //         headers: { "Content-Type": "application/json" },
// //       });
// //     } catch (error) {
// //       console.error("Error saving files:", error);
// //       return new Response(JSON.stringify({ error: "Failed to save files" }), {
// //         status: 500,
// //         headers: { "Content-Type": "application/json" },
// //       });
// //     }
// //   }

// import { writeFile } from 'fs/promises';
// import { join } from 'path';

// export async function POST_save(request: Request) {
//   const { html, css, javascript } = await request.json();

//   try {
//     // Remove the '''html, '''css, and '''javascript markers
//     const cleanedHtml = html.replace(/^```html\s*/, '');
//     const cleanedCss = css.replace(/^```css\s*/, '');
//     const cleanedJavascript = javascript.replace(/^```javascript\s*/, '');

//     const basePath = join(process.cwd(), "public", "generated");

//     // Save cleaned content into respective files
//     await writeFile(join(basePath, "index.html"), cleanedHtml);
//     await writeFile(join(basePath, "styles.css"), cleanedCss);
//     await writeFile(join(basePath, "script.js"), cleanedJavascript);

//     return new Response(JSON.stringify({ message: "Files saved successfully" }), {
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error saving files:", error);
//     return new Response(JSON.stringify({ error: "Failed to save files" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

export async function POST_save(request: Request) {
  const { html, css, javascript } = await request.json();

  try {
    const basePath = join(process.cwd(), "public", "generated");

    // Save initial content to the files
    await writeFile(join(basePath, "index.html"), html);
    await writeFile(join(basePath, "styles.css"), css);
    await writeFile(join(basePath, "script.js"), javascript);

    // Read the files back and clean them
    const savedHtml = await readFile(join(basePath, "index.html"), 'utf-8');
    const savedCss = await readFile(join(basePath, "styles.css"), 'utf-8');
    const savedJavascript = await readFile(join(basePath, "script.js"), 'utf-8');

    // Remove the ```html, ```css, and ```javascript markers
    const cleanedHtml = savedHtml.replace(/^```html\s*/, '');
    const cleanedCss = savedCss.replace(/^```css\s*/, '');
    const cleanedJavascript = savedJavascript.replace(/^```javascript\s*/, '');

    // Write the cleaned content back to the files
    await writeFile(join(basePath, "index.html"), cleanedHtml);
    await writeFile(join(basePath, "styles.css"), cleanedCss);
    await writeFile(join(basePath, "script.js"), cleanedJavascript);

    return new Response(JSON.stringify({ message: "Files saved and cleaned successfully" }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error saving files:", error);
    return new Response(JSON.stringify({ error: "Failed to save and clean files" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
