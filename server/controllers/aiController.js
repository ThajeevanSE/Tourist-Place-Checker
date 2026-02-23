import { GoogleGenerativeAI } from '@google/generative-ai';

export const generateTrip = async (req, res) => {
  try {
    const { destination, days, vibe } = req.body;

    if (!destination || !days) {
      return res.status(400).json({ message: "Destination and days are required." });
    }

    // 1. Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 2. The "Magic" Prompt (Prompt Engineering)
    const prompt = `
      You are an expert travel agent. Create a ${days}-day itinerary for ${destination}. 
      The vibe of the trip is: ${vibe || 'general sightseeing'}.
      
      You MUST respond ONLY with a valid JSON array of objects. Do not include markdown formatting like \`\`\`json.
      Each object should represent a place to visit and match this exact structure:
      [
        {
          "name": "Name of the place",
          "address": "City, Country",
          "summary": "1 sentence describing why to visit"
        }
      ]
      Generate about ${days * 2} places (2 per day).
    `;

    // 3. Call Gemini
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // 4. Clean and Parse the JSON
    // Sometimes Gemini adds markdown even when told not to, this cleans it up
    const cleanJsonString = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const itinerary = JSON.parse(cleanJsonString);

    res.status(200).json({ 
      title: `${days} Days in ${destination}`,
      places: itinerary 
    });

  } catch (error) {
    console.error("AI Generation Error:", error);
    res.status(500).json({ message: "Failed to generate AI trip." });
  }
};