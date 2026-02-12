require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testAllModels() {
    console.log("Testing Gemini API with different model names...\n");
    console.log("API Key:", process.env.GEMINI_API_KEY?.substring(0, 20) + "...\n");

    const modelsToTry = [
        "gemini-pro",
        "gemini-1.0-pro",
        "gemini-1.5-pro",
        "gemini-1.5-flash",
        "models/gemini-pro",
        "models/gemini-1.0-pro",
    ];

    for (const modelName of modelsToTry) {
        try {
            console.log(`Testing: ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Say hi");
            const response = await result.response;
            const text = response.text();

            console.log(`✅ SUCCESS with "${modelName}"!`);
            console.log(`Response: ${text}\n`);
            console.log(`\n🎉 YOUR GEMINI API IS WORKING!`);
            console.log(`Use model name: "${modelName}"\n`);
            return;

        } catch (error) {
            console.log(`❌ Failed: ${error.message.substring(0, 100)}...\n`);
        }
    }

    console.log("\n❌ ALL MODELS FAILED");
    console.log("\nThe API is not enabled. Please:");
    console.log("1. Visit: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com");
    console.log("2. Click ENABLE");
    console.log("3. Wait 1 minute and try again\n");
}

testAllModels();
