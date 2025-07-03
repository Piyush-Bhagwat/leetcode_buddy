import { GoogleGenAI } from "@google/genai";

let gemini = null;
const key = process.env.PLASMO_PUBLIC_GEMINI_API_KEY;
console.log("key: ", key);

try {
    gemini = new GoogleGenAI({ apiKey: key });
} catch (e) {
    console.log("Error gemini: ", e);

}

async function getHint(title: string, description: string): Promise<string[]> {
    if (!title || !description) return [];

    const prompt = `You are a helpful DSA tutor. A student is trying to solve the following problem:
Title: ${title}
Description: ${description} /*end of description */
Your task is to provide **exactly 3 hints**, each 1–2 lines long. The hints should gradually reveal
more detail (each one slightly more helpful than the last). DO NOT give the full solution, DO NOT
provide any code, and AVOID generic advice like "break the problem down."
Output format: JSON array only.
Example: ["hint 1", "hint 2", "hint 3"]`

    try {
        const response = await gemini.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        });
        console.log("response", response.text);
        const cleaned = response.text.replace(/```json|```/g, "").trim()
        return JSON.parse(cleaned);

    } catch (e) {
        console.log("gemini error", e);
        return [];
    }
}

export { getHint } 