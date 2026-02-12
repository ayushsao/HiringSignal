require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        console.log("Testing Gemini API key and listing available models...\n");

        // Try different model names
        const modelsToTry = [
            "gemini-pro",
            "gemini-1.0-pro",
            "gemini-1.5-pro",
            "gemini-1.5-flash",
            "models/gemini-pro",
            "models/gemini-1.0-pro"
        ];

        for (const modelName of modelsToTry) {
            try {
                console.log(`Trying model: ${modelName}...`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello");
                const response = await result.response;
                console.log(`✅ SUCCESS! Model "${modelName}" works!`);
                console.log(`Response: ${response.text().substring(0, 50)}...\n`);
                break; // Stop after first success
            } catch (error) {
                console.log(`❌ Failed: ${error.message}\n`);
            }
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

listModels();
