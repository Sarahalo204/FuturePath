import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { generateCareerPredictionPrompt, processAIRequest } from "@/lib/ai-service";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;
        const { searchParams } = new URL(req.url);
        const language = searchParams.get("locale") || "en";

        // 1. Fetch all student submissions
        const submissions = await prisma.submission.findMany({
            where: { userId },
            include: { subject: true },
        });

        // 2. Count unique subjects
        const uniqueSubjectIds = new Set(submissions.map((s: any) => s.subjectId));

        if (uniqueSubjectIds.size < 3) {
            return NextResponse.json({
                error: `Career prediction requires data from at least 3 different subjects. You have completed ${uniqueSubjectIds.size} subjects.`,
                subjectsCount: uniqueSubjectIds.size
            }, { status: 400 });
        }

        // 3. Aggregate results (taking the latest score per subject)
        const latestScores: Record<string, { name: string, score: number }> = {};
        submissions.forEach((s: any) => {
            if (!latestScores[s.subjectId] || new Date(s.createdAt) > new Date((latestScores[s.subjectId] as any).createdAt)) {
                latestScores[s.subjectId] = {
                    name: s.subject.nameEn,
                    score: s.score,
                    // @ts-ignore
                    createdAt: s.createdAt
                };
            }
        });

        const aggregatedResults = Object.values(latestScores).map(ls => ({
            subject: ls.name,
            score: ls.score
        }));

        // 3. Prompt AI for Career Prediction
        const prompt = generateCareerPredictionPrompt(aggregatedResults, language);

        let prediction;
        try {
            prediction = await processAIRequest<{ predictions: any[] }>(prompt, language);
        } catch (aiError) {
            console.error("AI Career Prediction Error:", aiError);
            return NextResponse.json({
                error: "The AI Prediction engine is momentarily busy. Please try again in 30 seconds."
            }, { status: 503 });
        }

        return NextResponse.json(prediction);
    } catch (error: any) {
        console.error("Career Prediction API Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
