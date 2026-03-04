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
    
    Requirements:
    - Number of questions: ${count}
    - Difficulty level: ${difficulty}
    - Subject: ${subject}
    
    The response MUST be a valid JSON array of objects, each containing:
    - "question": The question text in ${langPrompt}.
    - "options": An array of 4 possible answers.
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

    CRITICAL CATEGORIZATION:
    - If a subject score is < 70%, categorize related topics as "WEAKNESS" (Focus on basic explanations).
    - If a subject score is >= 70%, categorize related topics as "STRENGTH" (Focus on advanced exercises).

    Format the response as a valid JSON object with:
    1. "roadmap": An array of objects with { id, topic, subject, type, description, status: "AVAILABLE" }.
    2. "resources": A list of recommended YouTube video types/topics for the identified knowledge gaps.
    3. "majorSuggestions": 3 University Majors (not careers) suited for this performance profile.
    
    Return ONLY the JSON.
  `;
}
function generateCareerPredictionPrompt(results, language) {
    const langPrompt = language === "ar" ? "Arabic" : "English";
    const performanceSummary = results.map((r)=>`${r.subject}: ${r.score}%`).join(", ");
    return `
    As an elite career coach and academic strategist, analyze this student's performance: ${performanceSummary}.
    
    Predict the Top 5 University Majors for this student in ${langPrompt}.
    
    For each major, provide:
    1. "name": The common name of the major.
    2. "explanation": Why it perfectly matches their specific performance profile (be detailed).
    3. "careers": 3 potential career paths after graduation.
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
async function processAIRequest(prompt) {
    if (!OPENROUTER_API_KEY) {
        throw new Error("OPENROUTER_API_KEY is not defined in environment variables.");
    }
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
                        content: "You are an expert educational AI. Always return valid JSON only. No extra text."
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
"[project]/src/app/api/diagnostic/submit/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/ai-service.ts [app-route] (ecmascript)");
;
;
;
async function POST(req) {
    try {
        const { answers } = await req.json(); // Array of { subjectId, quizId, question, isCorrect, topic }
        // 1. Get or create dummy user (ensure password exists for schema compliance)
        const dummyUser = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.upsert({
            where: {
                email: "student@example.com"
            },
            update: {},
            create: {
                email: "student@example.com",
                name: "Student One",
                password: "hashed_password_placeholder",
                role: "STUDENT"
            }
        });
        const userId = dummyUser.id;
        // 2. Group answers by subject and quiz
        const submissionsBySubject = {};
        for (const ans of answers){
            if (!submissionsBySubject[ans.subjectId]) {
                submissionsBySubject[ans.subjectId] = {
                    quizId: ans.quizId,
                    answers: [],
                    correctCount: 0
                };
            }
            submissionsBySubject[ans.subjectId].answers.push(ans);
            if (ans.isCorrect) submissionsBySubject[ans.subjectId].correctCount++;
        }
        const resultsSummary = [];
        // 3. Process each subject
        for (const [subjectId, data] of Object.entries(submissionsBySubject)){
            const score = data.correctCount / data.answers.length * 100;
            // Generate AI Analysis & Roadmap for this subject
            const prompt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateRoadmapPrompt"])([
                {
                    subject: subjectId,
                    score,
                    answers: data.answers.map((a)=>({
                            questionId: a.question,
                            isCorrect: a.isCorrect,
                            topic: a.topic
                        }))
                }
            ], "en"); // Default to English for analysis for now or fetch from user pref
            let aiAnalysis;
            try {
                aiAnalysis = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["processAIRequest"])(prompt);
            } catch (aiError) {
                console.error("AI Roadmap Generation Error:", aiError);
                aiAnalysis = {
                    roadmap: [],
                    resources: [],
                    analysis: "AI analysis currently unavailable. Please review your results manually."
                };
            }
            // Create Submission
            let submission;
            try {
                submission = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].submission.create({
                    data: {
                        userId,
                        subjectId,
                        quizId: data.quizId,
                        score,
                        answers: data.answers,
                        analysis: aiAnalysis
                    }
                });
            } catch (dbError) {
                console.error("Prisma Submission Create Error:", dbError);
                throw new Error("Failed to save your results to the database.");
            }
            // Create or Update Learning Path
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].learningPath.upsert({
                where: {
                    userId_subjectId: {
                        userId,
                        subjectId
                    }
                },
                update: {
                    roadmap: aiAnalysis.roadmap,
                    resources: aiAnalysis.resources
                },
                create: {
                    userId,
                    subjectId,
                    roadmap: aiAnalysis.roadmap,
                    resources: aiAnalysis.resources
                }
            });
            resultsSummary.push({
                subjectId,
                score
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Diagnostic analysis complete.",
            summary: resultsSummary
        });
    } catch (error) {
        console.error("Submission API Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error.message || "Internal Server Error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__db675132._.js.map