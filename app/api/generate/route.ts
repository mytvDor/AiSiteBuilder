// // import { GoogleGenerativeAI } from "@google/generative-ai";

// // const genAI = new GoogleGenerativeAI("AIzaSyB_q_4nVwcmGsn9mpJEGmnd2cc7RlFnaMk");

// // export async function POST(request: Request) {
// //   const { prompt } = await request.json();

// //   try {
// //     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// //     const result = await model.generateContent(`
// //       Create a complete web site based on the following prompt:
// //       ${prompt}
      
// //       Respond with three complete code blocks:
// //       1. HTML (including a complete structure with <!DOCTYPE html>, <html>, <head>, and <body> tags)
// //       2. CSS (with complete styles for the HTML elements)
// //       3. JavaScript (with complete functionality for the web application)
      
// //       Separate each code block with ---DELIMITER---
// //     `);

// //     console.log('Gemini Response:', JSON.stringify(result, null, 2));

// //     const response = result.response;
// //     const text = response.text();
// //     const [html, css, javascript] = text.split('---DELIMITER---').map(code => code.trim());

// //     console.log('Generated HTML:', html);
// //     console.log('Generated CSS:', css);
// //     console.log('Generated JavaScript:', javascript);

// //     return new Response(JSON.stringify({ html, css, javascript }), {
// //       headers: { 'Content-Type': 'application/json' },
// //     });
// //   } catch (error) {
// //     console.error('Error generating code:', error);
// //     return new Response(JSON.stringify({ error: 'Failed to generate code' }), {
// //       status: 500,
// //       headers: { 'Content-Type': 'application/json' },
// //     });
// //   }
// // }


// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { NextResponse } from "next/server";

// // Define the expected request body
// interface GenerateRequestBody {
//   prompt: string;
// }

// // Define the expected structure of the API response
// interface GenerateResponse {
//   html: string;
//   css: string;
//   javascript: string;
// }

// // Define the POST handler
// export async function POST(request: Request) {
//   try {
//     // Parse the incoming request JSON
//     const body: GenerateRequestBody = await request.json();

//     // Validate the incoming prompt
//     if (!body.prompt) {
//       return NextResponse.json(
//         { error: "Missing prompt in the request body" },
//         { status: 400 }
//       );
//     }

//     // Initialize Google Generative AI with the API key
//     const genAI = new GoogleGenerativeAI("AIzaSyB_q_4nVwcmGsn9mpJEGmnd2cc7RlFnaMk");
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     // Generate content using the provided prompt
//     const result = await model.generateContent(`
//       Create a complete website based on the following prompt:
//       ${body.prompt}
      
//       Respond with three complete code blocks:
//       1. HTML (complete structure with <!DOCTYPE html>, <html>, <head>, and <body>)
//       2. CSS (complete styles for the HTML elements)
//       3. JavaScript (complete functionality for the web application)

//       Separate each code block with ---DELIMITER---
//     `);

//     // Ensure the response is valid and parse it
//     const generatedText = result.response?.text();
//     if (!generatedText) {
//       throw new Error("Empty response from Generative AI");
//     }

//     const [html = "", css = "", javascript = ""] = generatedText
//       .split("---DELIMITER---")
//       .map((code) => code.trim());

//     // Return the generated code blocks as a JSON response

//     console.log("generated html" + html);
//     console.log("generated css" + css);
//     console.log("generated  js" + javascript)
//     const response: GenerateResponse = { html, css, javascript };
//     return NextResponse.json(response);
//   } catch (error: any) {
//     console.error("Error generating code:", error);

//     // Return an error response with a status code of 500
//     return NextResponse.json(
//       { error: "Failed to generate code", details: error.message || "Unknown error" },
//       { status: 500 }
//     );
//   }
// }


import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Define the expected request body
interface GenerateRequestBody {
  prompt: string;
}

// Define the expected structure of the API response
interface GenerateResponse {
  html: string;
  css: string;
  javascript: string;
}

// Define the POST handler
export async function POST(request: Request) {
  try {
    // Parse the incoming request JSON
    const body: GenerateRequestBody = await request.json();

    // Validate the incoming prompt
    if (!body.prompt) {
      return NextResponse.json(
        { error: "Missing prompt in the request body" },
        { status: 400 }
      );
    }

    // Initialize Google Generative AI with the API key
    const genAI = new GoogleGenerativeAI("AIzaSyB_q_4nVwcmGsn9mpJEGmnd2cc7RlFnaMk");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate content using the provided prompt
    const result = await model.generateContent(`
      Create a complete website based on the following prompt:
      ${body.prompt}
      
      Respond with three complete code blocks:
      1. HTML (complete structure with <!DOCTYPE html>, <html>, <head>, and <body>)
      2. CSS (complete styles for the HTML elements)
      3. JavaScript (complete functionality for the web application)

      Separate each code block with ---HTML---, ---CSS---, and ---JS---
    `);

    // Ensure the response is valid and parse it
    const generatedText = result.response?.text();
    if (!generatedText) {
      throw new Error("Empty response from Generative AI");
    }

    console.log("Generated Text (Before Splitting):", generatedText);

    // Split the generated content using the delimiters
    const sections = generatedText.split("---HTML---");
    const html = sections[1]?.split("---CSS---")[0]?.trim() || "";
    const css = sections[1]?.split("---CSS---")[1]?.split("---JS---")[0]?.trim() || "";
    const javascript = sections[1]?.split("---JS---")[1]?.trim() || "";

    // Log the trimmed content of each block
    console.log("Generated HTML (Trimmed):", html);
    console.log("Generated CSS (Trimmed):", css);
    console.log("Generated JavaScript (Trimmed):", javascript);

    // Define file paths for each code block
    const htmlFilePath = path.join(process.cwd(), 'generated', 'index.html');
    const cssFilePath = path.join(process.cwd(), 'generated', 'styles.css');
    const jsFilePath = path.join(process.cwd(), 'generated', 'script.js');

    // Ensure the 'generated' directory exists
    fs.mkdirSync(path.dirname(htmlFilePath), { recursive: true });

    // Write the generated HTML, CSS, and JavaScript to respective files
    fs.writeFileSync(htmlFilePath, html);
    fs.writeFileSync(cssFilePath, css);
    fs.writeFileSync(jsFilePath, javascript);

    // Return the generated code blocks as a JSON response
    const response: GenerateResponse = { html, css, javascript };
    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Error generating code:", error);

    // Return an error response with a status code of 500
    return NextResponse.json(
      { error: "Failed to generate code", details: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
