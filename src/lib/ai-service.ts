export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswerIndex: number;
    hint: string;
}

export interface DiagnosticResult {
    subject: string;
    score: number;
    answers: {
        questionId: string;
        isCorrect: boolean;
        topic: string;
    }[];
}

export interface RoadmapItem {
    id: string;
    topic: string;
    subject: string;
    type: "WEAKNESS" | "STRENGTH";
    description: string;
    status: "LOCKED" | "AVAILABLE" | "COMPLETED";
}

export interface RoadmapResponse {
    roadmap: RoadmapItem[];
    resources: { title: string; url: string; type: string }[];
    majorSuggestions: string[];
}

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL_NAME = process.env.AI_MODEL_NAME || "google/gemini-2.0-flash-001";
const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

export function generateQuizPrompt(subject: string, language: string, count: number = 10, difficulty: string = "Medium") {
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

export function generateRoadmapPrompt(results: DiagnosticResult[], language: string) {
    const langPrompt = language === "ar" ? "Arabic" : "English";
    const performanceSummary = results
        .map((r) => `${r.subject}: ${r.score}% (Weaknesses: ${r.answers.filter(a => !a.isCorrect).map(a => a.topic).join(", ")})`)
        .join("\n");

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

export function generateCareerPredictionPrompt(results: { subject: string; score: number }[], language: string) {
    const langPrompt = language === "ar" ? "Arabic" : "English";
    const performanceSummary = results
        .map((r) => `${r.subject}: ${r.score}%`)
        .join(", ");

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

async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
    try {
        return await fn();
    } catch (error) {
        if (retries <= 0) throw error;
        console.warn(`AI request failed, retrying in ${delay}ms... (${retries} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return withRetry(fn, retries - 1, delay * 2);
    }
}

export async function processAIRequest<T>(prompt: string, locale: string = "en"): Promise<T> {
    if (!OPENROUTER_API_KEY) {
        throw new Error("OPENROUTER_API_KEY is not defined in environment variables.");
    }

    const langName = locale === "ar" ? "Arabic" : "English";

    return withRetry(async () => {
        const response = await fetch(ENDPOINT, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "HTTP-Referer": "https://futurepath.edu",
                "X-Title": "FuturePath AI",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: MODEL_NAME,
                messages: [
                    {
                        role: "system",
                        content: `You are an expert educational AI and career strategist. 
                        CRITICAL: The user interface is currently in ${langName.toUpperCase()}. 
                        You MUST generate all output (text, descriptions, names, titles, suggestions) strictly in ${langName.toUpperCase()}. 
                        Do not mix ${langName} with any other language. 
                        For resources, provide valid URLs (YouTube search links like https://www.youtube.com/results?search_query=...) or high-quality educational domains. 
                        Always return valid JSON only. No extra conversational text.`
                    },
                    { role: "user", content: prompt }
                ],
                response_format: { type: "json_object" }
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`AI API Error (${response.status}): ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        const content = data.choices[0]?.message?.content;

        if (!content) {
            throw new Error("AI returned an empty response.");
        }

        try {
            return JSON.parse(content) as T;
        } catch (e) {
            console.error("Failed to parse AI response as JSON:", content);
            throw new Error("AI response was not valid JSON.");
        }
    });
}
