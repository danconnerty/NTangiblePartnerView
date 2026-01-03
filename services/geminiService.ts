
import { GoogleGenAI, Type } from "@google/genai";
import { Player } from "../types";

export interface FullPlayerReport {
  summary: string;
  practiceSuggestion: string;
  approach: string;
  coachingSuggestion: string;
  exercises: { title: string; description: string }[];
  nterpret: {
    summary: string;
    coachingConsiderations: string[];
    mentalToughness: string;
    communicationStyle: { style: string; detail: string };
    learningStyle: { style: string; detail: string };
    motivationalAnchor: { anchor: string; detail: string };
  };
}

export const generateFullAthleteReport = async (player: Player): Promise<FullPlayerReport | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `Analyze this baseball athlete's data and generate a comprehensive 4-part report mimicking the attached screenshots:
    Name: ${player.name}
    Position: ${player.position}
    Level: ${player.level}
    Clutch Factor: ${player.clutchFactor}
    Scoring Range: ${player.scoringRange}

    Sections to generate:
    1. NSights: Summary (high pressure behavior), Practice Suggestion (simulated scenarios), Approach (coaching conversation), Coaching Suggestion (long term drills).
    2. Exercises: 2 specific training drills with titles and descriptions.
    3. NTerpret: A deep psychological profile including Coaching Considerations (bullets), Mental Toughness assessment, Communication Style, Learning Style, and Motivational Anchor.

    Be specific to their position (${player.position}) and Clutch Factor (${player.clutchFactor}).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            practiceSuggestion: { type: Type.STRING },
            approach: { type: Type.STRING },
            coachingSuggestion: { type: Type.STRING },
            exercises: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ["title", "description"]
              }
            },
            nterpret: {
              type: Type.OBJECT,
              properties: {
                summary: { type: Type.STRING },
                coachingConsiderations: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                mentalToughness: { type: Type.STRING },
                communicationStyle: {
                  type: Type.OBJECT,
                  properties: {
                    style: { type: Type.STRING },
                    detail: { type: Type.STRING }
                  }
                },
                learningStyle: {
                  type: Type.OBJECT,
                  properties: {
                    style: { type: Type.STRING },
                    detail: { type: Type.STRING }
                  }
                },
                motivationalAnchor: {
                  type: Type.OBJECT,
                  properties: {
                    anchor: { type: Type.STRING },
                    detail: { type: Type.STRING }
                  }
                }
              }
            }
          },
          required: ["summary", "practiceSuggestion", "approach", "coachingSuggestion", "exercises", "nterpret"]
        }
      }
    });
    
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as FullPlayerReport;
  } catch (error) {
    console.error("Gemini Full Report Error:", error);
    return null;
  }
};
