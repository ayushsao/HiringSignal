require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testModel() {
    try {
        // Try the simplest model name
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Say hello");
        const response = await result.response;
        console.log("SUCCESS! Response:", response.text());
    } catch (error) {
        console.log("Error details:", error.message);
        console.log("Status:", error.status);
        console.log("\nTrying alternative...");

        try {
            const model2 = genAI.getGenerativeModel({ model: "models/gemini-pro" });
            const result2 = await model2.generateContent("Say hello");
            const response2 = await result2.response;
            console.log("SUCCESS with models/gemini-pro! Response:", response2.text());
        } catch (error2) {
            console.log("Also failed:", error2.message);
        }
    }
}

testModel();
