module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
const globalForPrisma = /*TURBOPACK member replacement*/ __turbopack_context__.g;
const prisma = globalForPrisma.prisma || new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
    log: [
        "query"
    ]
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/src/lib/ai-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateCareerPredictionPrompt",
    ()=>generateCareerPredictionPrompt,
    "generateQuizPrompt",
    ()=>generateQuizPrompt,
    "generateRoadmapPrompt",
    ()=>generateRoadmapPrompt,
    "processAIRequest",
    ()=>processAIRequest
]);
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL_NAME = process.env.AI_MODEL_NAME || "google/gemini-2.0-flash-001";
const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
function generateQuizPrompt(subject, language, count = 10, difficulty = "Medium") {
    const langPrompt = language === "ar" ? "Arabic" : "English";
    return `
    Act as an expert educator specializing in the ${subject} core high school curriculum.
    Generate a diagnostic quiz for a student in ${langPrompt}.
    
    CRITICAL LANGUAGE INSTRUCTION:
    The user language is ${langPrompt.toUpperCase()}. 
    Please generate ALL content, including questions, options, and hints, strictly in ${langPrompt.toUpperCase()}.

    Requirements:
    - Number of questions: ${count}
    - Difficulty level: ${difficulty}
    - Subject: ${subject}
    
    The response MUST be a valid JSON array of objects, each containing:
    - "question": The question text in ${langPrompt}.
    - "options": An array of 4 possible answers in ${langPrompt}.
    - "correctAnswerIndex": The 0-based index of the correct option.
    - "hint": A brief, helpful hint in ${langPrompt} to guide the student if they struggle.

    Ensure questions are isolated to the ${subject} curriculum and follow scientific accuracy.
    Return ONLY the JSON array.
  `;
}
function generateRoadmapPrompt(results, language) {
    const langPrompt = language === "ar" ? "Arabic" : "English";
    const performanceSummary = results.map((r)=>`${r.subject}: ${r.score}% (Weaknesses: ${r.answers.filter((a)=>!a.isCorrect).map((a)=>a.topic).join(", ")})`).join("\n");
    return `
    As an expert academic advisor, generate a personalized learning roadmap in ${langPrompt} based on these diagnostic results:
    
    ${performanceSummary}

    CRITICAL LANGUAGE INSTRUCTION:
    The user language is ${langPrompt.toUpperCase()}.
    Please generate ALL content, including topic names, descriptions, resource titles, and suggestions, strictly in ${langPrompt.toUpperCase()}.

    CRITICAL CATEGORIZATION:
    - If a subject score is < 70%, categorize related topics as "WEAKNESS" (Focus on basic explanations).
    - If a subject score is >= 70%, categorize related topics as "STRENGTH" (Focus on advanced exercises).

    Format the response as a valid JSON object with:
    1. "roadmap": An array of objects with { id, topic, subject, type, description, status: "AVAILABLE" }.
    2. "resources": A list of objects with { title, url, type } where:
       - "type" is one of "YouTube", "Course", or "Book".
       - All titles and descriptions must be in ${langPrompt}.
       - Provide direct YouTube search links or specific educational platform names.
       - Provide specific, high-quality book titles for the subject.
    3. "majorSuggestions": 3 University Majors (not careers) suited for this performance profile in ${langPrompt}.
    
    Return ONLY the JSON.
  `;
}
function generateCareerPredictionPrompt(results, language) {
    const langPrompt = language === "ar" ? "Arabic" : "English";
    const performanceSummary = results.map((r)=>`${r.subject}: ${r.score}%`).join(", ");
    return `
    As an elite career coach and academic strategist, analyze this student's performance: ${performanceSummary}.
    
    Predict the Top 5 University Majors for this student strictly in ${langPrompt.toUpperCase()}.
    
    CRITICAL LANGUAGE INSTRUCTION:
    The user language is ${langPrompt.toUpperCase()}.
    Please generate ALL content, including major names, explanations, and career paths, strictly in ${langPrompt.toUpperCase()}.

    For each major, provide:
    1. "name": The common name of the major in ${langPrompt}.
    2. "explanation": Why it perfectly matches their specific performance profile in ${langPrompt} (be detailed).
    3. "careers": 3 potential career paths after graduation in ${langPrompt}.
    4. "matchScore": A percentage (0-100) indicating the logic-based fit.

    Return a JSON object with a "predictions" array.
    Return ONLY the JSON.
  `;
}
async function withRetry(fn, retries = 3, delay = 1000) {
    try {
        return await fn();
    } catch (error) {
        if (retries <= 0) throw error;
        console.warn(`AI request failed, retrying in ${delay}ms... (${retries} attempts left)`);
        await new Promise((resolve)=>setTimeout(resolve, delay));
        return withRetry(fn, retries - 1, delay * 2);
    }
}
async function processAIRequest(prompt, locale = "en") {
    if (!OPENROUTER_API_KEY) {
        throw new Error("OPENROUTER_API_KEY is not defined in environment variables.");
    }
    const langName = locale === "ar" ? "Arabic" : "English";
    return withRetry(async ()=>{
        const response = await fetch(ENDPOINT, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "HTTP-Referer": "https://smartpathai.edu",
                "X-Title": "SmartPath AI",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: MODEL_NAME,
                messages: [
                    {
                        role: "system",
                        content: `You are an expert educational AI and career strategist. 
                        CRITICAL: The user interface is currently in ${langName.toUpperCase()}. 
                        You MUST generate all output (text, descriptions, names, titles) strictly in ${langName.toUpperCase()}. 
                        Do not mix languages. Always return valid JSON only. No extra conversational text.`
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                response_format: {
                    type: "json_object"
                }
            })
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
            throw new Error(`AI API Error (${response.status}): ${JSON.stringify(errorData)}`);
        }
        const data = await response.json();
        const content = data.choices[0]?.message?.content;
        if (!content) {
            throw new Error("AI returned an empty response.");
        }
        try {
            return JSON.parse(content);
        } catch (e) {
            console.error("Failed to parse AI response as JSON:", content);
            throw new Error("AI response was not valid JSON.");
        }
    });
}
}),
"[project]/src/app/api/learning-path/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/ai-service.ts [app-route] (ecmascript)");
;
;
;
async function GET() {
    try {
        // In a real app, get userId from session
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
            where: {
                email: "student@example.com"
            },
            include: {
                learningPath: true,
                assessments: {
                    orderBy: {
                        createdAt: "desc"
                    },
                    take: 1
                }
            }
        });
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "User not found"
            }, {
                status: 404
            });
        }
        // If roadmap exists, return it
        if (user.learningPath) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                roadmap: user.learningPath.roadmap,
                resources: user.learningPath.resources,
                majorSuggestions: user.learningPath.majorSuggestions
            });
        }
        // If no roadmap but assessment exists, generate one
        if (user.assessments.length > 0) {
            const lastAssessment = user.assessments[0];
            // Get all subject scores for this user
            const subjects = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].subject.findMany({
                where: {
                    userId: user.id
                }
            });
            const prompt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateRoadmapPrompt"])(subjects.map((s)=>({
                    subject: s.name,
                    score: s.performance,
                    answers: []
                })));
            const aiResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["processAIRequest"])(prompt);
            // Store in database
            const newPath = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].learningPath.create({
                data: {
                    userId: user.id,
                    roadmap: aiResponse.roadmap,
                    resources: aiResponse.resources,
                    majorSuggestions: aiResponse.majorSuggestions
                }
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(aiResponse);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "No diagnostic assessment found. Please take the test first."
        }, {
            status: 400
        });
    } catch (error) {
        console.error("Learning Path Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Internal Server Error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__131da730._.js.map