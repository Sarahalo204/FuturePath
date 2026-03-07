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
    You MUST generate 100% of the JSON response, including questions, options, and hints, strictly in ${langPrompt.toUpperCase()}.
    DO NOT mix languages or use ${langPrompt === "Arabic" ? "English" : "Arabic"} technical terms.

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
    You MUST generate 100% of the JSON response, including topic names, descriptions, resource titles, and suggestions, strictly in ${langPrompt.toUpperCase()}.
    DO NOT mix languages or use ${langPrompt === "Arabic" ? "English" : "Arabic"} terms.

    CRITICAL CATEGORIZATION:
    - If a subject score is < 70%, categorize related topics as "WEAKNESS" (Focus on basic explanations).
    - If a subject score is >= 70%, categorize related topics as "STRENGTH" (Focus on advanced exercises).

    Format the response as a valid JSON object with:
    1. "roadmap": An array of objects with { id, topic, subject, type, description, status: "AVAILABLE", resourceLink }. 
       - "resourceLink": A direct educational link (YouTube or Khan Academy) specific to this topic.
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
    You MUST generate 100% of the JSON response, including major names, explanations, and career paths, strictly in ${langPrompt.toUpperCase()}.
    DO NOT mix languages or use ${langPrompt === "Arabic" ? "English" : "Arabic"} terms.

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
                "HTTP-Referer": "https://futurepath.edu",
                "X-Title": "FuturePath AI",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: MODEL_NAME,
                messages: [
                    {
                        role: "system",
                        content: `You are an expert educational AI and career strategist. 
                        CRITICAL LANGUAGE RULE: The user interface is strictly in ${langName.toUpperCase()}. 
                        You MUST generate 100% of your response in ${langName.toUpperCase()}. 
                        This includes all questions, options, hints, roadmap topics, descriptions, resource titles, and major names.
                        DO NOT use any ${langName === "Arabic" ? "English" : "Arabic"} words even for technical terms unless they are universal proper nouns.
                        Format: Always return valid JSON only. No extra conversational text.`
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
"[project]/src/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
const prismaClientSingleton = ()=>{
    return new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
        log: ("TURBOPACK compile-time truthy", 1) ? [
            "error",
            "warn"
        ] : "TURBOPACK unreachable",
        datasourceUrl: process.env.DATABASE_URL
    });
};
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
;
if ("TURBOPACK compile-time truthy", 1) globalThis.prismaGlobal = prisma;
}),
"[project]/src/app/api/ai/generate-quiz/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/ai-service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
;
;
;
async function POST(req) {
    try {
        const { subject, language, count, difficulty } = await req.json();
        if (!subject || !language) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Subject and language are required."
            }, {
                status: 400
            });
        }
        // 1. Ensure subject exists in DB (normalized names)
        const normalizedKey = subject.toLowerCase();
        const displayEng = normalizedKey.charAt(0).toUpperCase() + normalizedKey.slice(1);
        let subjectRecord;
        try {
            subjectRecord = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].subject.upsert({
                where: {
                    nameEn: displayEng
                },
                update: {},
                create: {
                    nameEn: displayEng,
                    nameAr: normalizedKey === "math" ? "الرياضيات" : normalizedKey === "physics" ? "الفيزياء" : normalizedKey === "biology" ? "الأحياء" : normalizedKey === "chemistry" ? "الكيمياء" : normalizedKey === "english" ? "اللغة الإنجليزية" : displayEng,
                    isEnabled: true
                }
            });
        } catch (dbError) {
            console.error("Prisma Connection Error (Quiz Gen):", dbError);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Database connection failed. Please check if your database server is running."
            }, {
                status: 503
            });
        }
        // 2. Generate questions via AI
        const prompt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateQuizPrompt"])(subjectRecord.nameEn, language, count, difficulty);
        const questions = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["processAIRequest"])(prompt, language);
        // 3. Save the specific Quiz instance
        const quiz = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].quiz.create({
            data: {
                subjectId: subjectRecord.id,
                questions: questions
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            quizId: quiz.id,
            subjectId: subjectRecord.id,
            questions
        });
    } catch (error) {
        console.error("Quiz Generation Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message || "Failed to generate quiz."
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__861a1184._.js.map