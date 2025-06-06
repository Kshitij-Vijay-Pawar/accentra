import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables.");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Use the correct model name
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });

    const prompt = `
      You are a friendly English teacher bot for a language learning app.
      A user sent this sentence: "${message}"

      Your task is to:
      1. Analyze the sentence for grammatical errors.
      2. If there are mistakes, clearly state the "Correction:" followed by the corrected sentence.
      3. If there are mistakes, provide a clear and concise "Explanation:" of the grammar rule violated and what should have been used.
      4. After the correction/explanation (or if no mistakes), provide an appropriate and encouraging "Reply:" to continue the conversation in a friendly tone. The reply should be relevant to the user's input, or ask a follow-up question related to the learning context.

      Ensure your response strictly follows this format. If there are no mistakes, the "Correction:" and "Explanation:" fields should be empty, like this:

      Correction:
      Explanation:
      Reply: That's a perfect sentence! What else did you do today?

      Here's an example for a sentence with mistakes:
      User: I goes to the store.
      Correction: I go to the store.
      Explanation: The verb 'go' should agree with the plural subject 'I'. For 'I', 'you', 'we', 'they', use the base form of the verb.
      Reply: Great effort! What did you buy at the store?

      Now, please process the user's sentence: "${message}"
    `;

    let result, response, text;
    try {
      result = await model.generateContent(prompt);
      response = result.response;
      text = response.text();
    } catch (err) {
      console.error("Gemini API error:", err);
      return NextResponse.json({ error: "Failed to get response from Gemini API." }, { status: 502 });
    }

    if (!text) {
      return NextResponse.json({ error: "No response from Gemini API." }, { status: 502 });
    }

    return NextResponse.json({ reply: text });

  } catch (error) {
    console.error('Error in chat API route:', error);
    return NextResponse.json({ error: 'Failed to process request. Please try again.' }, { status: 500 });
  }
}

// chatGPT code
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(req: Request) {
//   const { message } = await req.json();

//   const prompt = `
// You are a friendly English teacher bot. 
// A user sent this sentence: "${message}"
// 1. Correct their grammar.
// 2. Explain the mistake.
// 3. Reply appropriately to continue the conversation.

// Return the response in this format:
// Correction: <corrected sentence>
// Explanation: <why it's wrong>
// Reply: <natural reply from the bot>
// `;

//   const response = await openai.chat.completions.create({
//     messages: [{ role: "user", content: prompt }],
//     model: "gpt-3.5-turbo",
//   });

//   return NextResponse.json({ reply: response.choices[0].message.content });
// }