const Groq = require("groq-sdk");

// Initialize Groq with API key - required
if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'placeholder_get_your_key_from_console_groq_com') {
  throw new Error("GROQ_API_KEY is required. Get your FREE API key at: https://console.groq.com");
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

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
  "weaknesses": ["<SPECIFIC weakness with context: What's missing, why it matters for this role, and how it impacts hiring chances>", "<weakness2 with impact>", "<weakness3 with impact>"],
  "rejectionReason": "<A realistic, specific rejection reason a recruiter would give. If the candidate would pass, write 'N/A — candidate meets threshold for screening round.'>",
  "roleAlignmentFeedback": "<2-3 sentences on how well the resume aligns with the specific role>",
  "projectDepthFeedback": "<2-3 sentences evaluating the depth, impact, and relevance of projects listed>",
  "improvementSuggestion": "<Detailed roadmap: Specific actions to take to reach 90+ scores. Include what to add, what to improve, and concrete examples. Be actionable and specific to THIS candidate's gaps.>",
  "overallVerdict": "<One of: 'Shortlisted', 'On the Fence', 'Rejected'>"
}

SCORING GUIDELINES for a ${companyType} company:
- Startup: Value versatility, ownership, shipping speed, side projects, startup-relevant tech stacks
- MNC: Value structured experience, certifications, process knowledge, scalability experience, team collaboration
- Product-based: Value DSA skills, system design, clean code, open source contributions, depth over breadth

WEAKNESS GUIDELINES:
- Each weakness must explain WHY it's a problem for this specific role
- Describe the impact on candidate competitiveness
- Be detailed (2-3 sentences per weakness)

IMPROVEMENT SUGGESTION GUIDELINES:
- Provide a clear roadmap to 90+ scores across all categories
- List 3-5 specific, concrete actions the candidate should take
- Prioritize highest-impact improvements first
- Include examples where relevant (e.g., "Add a project demonstrating distributed systems", "Complete AWS certifications")
- Make it actionable within 1-3 months

Be specific. Reference actual content from the resume. No filler.`;
}

/**
 * Analyze resume using Groq AI (Llama 3)
 */
async function analyzeResume(resumeText, role, companyType) {
  const prompt = buildPrompt(resumeText, role, companyType);

  // Use Llama 3.3 70B model - fast and powerful
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a professional ATS and recruiter simulation engine. Always respond with valid JSON only. No markdown formatting, no code fences."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
    max_tokens: 2048,
  });

  const content = chatCompletion.choices[0].message.content.trim();

  // Parse JSON response
  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch {
    // Handle markdown wrapping
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      parsed = JSON.parse(jsonMatch[0]);
    } else {
      throw new Error("Failed to parse AI response as JSON");
    }
  }

  console.log("✅ Groq AI analysis successful");
  return parsed;
}

module.exports = { analyzeResume };
