require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testGemini() {
    console.log("Testing Gemini API key...\n");
    console.log("API Key:", process.env.GEMINI_API_KEY ? "Found" : "Missing");

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Say hello in one word");
        const response = await result.response;
        const text = response.text();

        console.log("✅ SUCCESS! Gemini API is working!");
        console.log("Response:", text);
        console.log("\nYour Gemini API key is valid and ready to use!");

    } catch (error) {
        console.log("❌ FAILED!");
        console.log("Error:", error.message);
        console.log("\nThe API key is not working. Possible issues:");
        console.log("1. API not enabled - visit: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com");
        console.log("2. Invalid API key - get new one: https://aistudio.google.com/app/apikey");
    }
}

testGemini();
