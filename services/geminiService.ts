
import { GoogleGenAI } from "@google/genai";
import { Player } from "../types";

export const generateScoutingReport = async (player: Player): Promise<string> => {
  try {
    // Guidelines: Always use new GoogleGenAI({apiKey: process.env.API_KEY})
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `Analyze this baseball player's performance data and provide a concise professional scouting report (3-4 sentences):
    Name: ${player.name}
    Position: ${player.position}
    Clutch Factor: ${player.clutchFactor}
    Year of Graduation: ${player.graduationYear || 'Not Specified'}
    
    Focus on what the 'Clutch Factor' might indicate for a player in their position. Be realistic and professional.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    return response.text || "Unable to generate scouting report at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return a friendly error message instead of throwing an uncaught exception
    return "Scouting report service is currently unavailable. Please verify API configuration.";
  }
};