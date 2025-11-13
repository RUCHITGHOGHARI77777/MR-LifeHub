
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Ensure the API key is available
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface ImageData {
    mimeType: string;
    data: string;
}

export async function analyzeImage(imageData: ImageData, prompt: string): Promise<string> {
    try {
        const imagePart = {
            inlineData: {
                mimeType: imageData.mimeType,
                data: imageData.data,
            },
        };
        const textPart = {
            text: prompt,
        };

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
        });
        
        return response.text;
    } catch (error) {
        console.error("Error analyzing image with AI model:", error);
        throw new Error("Sorry, I couldn't get a response from the AI. There might be an issue with the connection or API key.");
    }
}