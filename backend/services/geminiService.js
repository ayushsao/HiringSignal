const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Build the structured prompt for resume analysis
 */
function buildPrompt(resumeText, role, companyType) {
  return `You are an experienced technical recruiter and ATS (Applicant Tracking System) engine. You have 15+ years of hiring experience across startups, MNCs, and product-based companies.

Analyze the following resume for the role of **${role}** at a **${companyType}** company.

RESUME:
---
${resumeText}
---

Provide a thorough, brutally honest, and realistic evaluation. Do NOT give generic feedback — be specific to THIS resume and THIS role.

Return your response as a valid JSON object with EXACTLY this structure (no markdown, no code fences, just raw JSON):

{
  "atsScore": <number 0-100>,
  "skillRelevanceScore": <number 0-100>,
  "projectDepthScore": <number 0-100>,
  "roleAlignmentScore": <number 0-100>,
  "strengths": ["<strength1>", "<strength2>", "<strength3>"],
  "weaknesses": ["<weakness1>", "<weakness2>", "<weakness3>"],
  "rejectionReason": "<A realistic, specific rejection reason a recruiter would give. If the candidate would pass, write 'N/A — candidate meets threshold for screening round.'>",
  "roleAlignmentFeedback": "<2-3 sentences on how well the resume aligns with the specific role>",
  "projectDepthFeedback": "<2-3 sentences evaluating the depth, impact, and relevance of projects listed>",
  "improvementSuggestion": "<One single, high-impact, actionable improvement that would most increase this candidate's chances>",
  "overallVerdict": "<One of: 'Shortlisted', 'On the Fence', 'Rejected'>"
}

SCORING GUIDELINES for a ${companyType} company:
- Startup: Value versatility, ownership, shipping speed, side projects, startup-relevant tech stacks
- MNC: Value structured experience, certifications, process knowledge, scalability experience, team collaboration
- Product-based: Value DSA skills, system design, clean code, open source contributions, depth over breadth

Be specific. Reference actual content from the resume. No filler.`;
}

/**
 * Analyze resume using Google Gemini
 */
async function analyzeResume(resumeText, role, companyType) {
  const prompt = buildPrompt(resumeText, role, companyType);

  // Use Gemini 1.5 Flash for fast, free analysis
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const content = response.text().trim();

  // Try to parse JSON, handle potential markdown wrapping
  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch {
    // Sometimes the model wraps in ```json ... ```
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      parsed = JSON.parse(jsonMatch[0]);
    } else {
      throw new Error("Failed to parse AI response as JSON");
    }
  }

  return parsed;
}

module.exports = { analyzeResume };
