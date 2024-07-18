import { OpenAI } from "openai";
import PDFJS from "pdfjs-dist";
PDFJS.disableTextLayer = true;
// PDFJS.disableWorker = true;

PDFJS.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.943/pdf.worker.min.js";

const openai = new OpenAI({ apiKey: "", dangerouslyAllowBrowser: true });

export const analyzePersonaTextWithGPT = async (text) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a PDF analysis assistant.
You are given transcript of a user interview. generate user bio and use these categories

user details - show name, gender, location .. etc
About user - A paragraph about the user
core needs - list of requirements or needs of the user
frustrations - list of critique 
        
and output as HTML to be displayed on a div`,
      },
      { role: "user", content: text },
    ],
  });

  return response.choices[0].message.content;
};

export const extractTagsFromTextWithGPT = async (text) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `you will be given a transcript and you have to list the tags that are suitable for the transcript
        These are a few tags and you can add more like these
        
        Easy to navigate
        Slow load times
        Positive design feedback
        Lack of budgeting tools
        Security concerns 
        
        After finding suitable tags list them and suggest possible actions if any
        `,
      },
      { role: "user", content: text },
    ],
  });

  return response.choices[0].message.content;
};

export const mergeDataWithGPT = async (text) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: `Merge data` },
      { role: "user", content: text },
    ],
  });

  return response.choices[0].message.content;
};
export const extractTextFromPdf = async (pdfFile) => {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFJS.getDocument({ data: arrayBuffer }).promise;
  let text = "";

  for (let i = 0; i < pdf.numPages; i++) {
    const page = await pdf.getPage(i + 1);
    const content = await page.getTextContent();
    text += content.items.map((item) => item.str).join("\n");
  }

  return text;
};
