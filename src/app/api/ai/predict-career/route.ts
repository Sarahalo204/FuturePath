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
        const refresh = searchParams.get("refresh") === "true";

        // 1. Check for existing prediction unless refreshing
        if (!refresh) {
            // Use the model name as defined in the synced schema
            const existing = await prisma.careerPrediction.findFirst({
                where: { userId, locale: language },
                orderBy: { createdAt: "desc" }
            });

            if (existing) {
                return NextResponse.json({
                    predictions: existing.prediction,
                    lastUpdated: existing.createdAt,
                    isStale: false
                });
            }
        }

        // 2. Fetch all student submissions to generate a new prediction
        const submissions = await prisma.submission.findMany({
            where: { userId },
            include: { subject: true },
        });

        // 3. Count unique subjects (Requirement: at least 3)
        const uniqueSubjectIds = new Set(submissions.map((s: any) => s.subjectId));

        if (uniqueSubjectIds.size < 3) {
            return NextResponse.json({
                error: `Career prediction requires assessment results from at least 3 different subjects. You have completed ${uniqueSubjectIds.size} so far.`,
                subjectsCount: uniqueSubjectIds.size
            }, { status: 400 });
        }

        // 4. Aggregate latest results per subject
        const latestScores: Record<string, { name: string, score: number, createdAt: Date }> = {};
        submissions.forEach((s: any) => {
            if (!latestScores[s.subjectId] || new Date(s.createdAt) > new Date(latestScores[s.subjectId].createdAt)) {
                latestScores[s.subjectId] = {
                    name: s.subject.nameEn,
                    score: s.score,
                    createdAt: s.createdAt
                };
            }
        });

        const aggregatedResults = Object.values(latestScores).map(ls => ({
            subject: ls.name,
            score: ls.score
        }));

        // 5. Trigger AI Generation
        const prompt = generateCareerPredictionPrompt(aggregatedResults, language);

        let aiResponse;
        try {
            aiResponse = await processAIRequest<{ predictions: any[] }>(prompt, language);
        } catch (aiError) {
            console.error("AI Service Error:", aiError);
            return NextResponse.json({
                error: "The AI analysis engine is currently busy. Please wait a moment and try again."
            }, { status: 503 });
        }

        // 6. Persist to database (Overwrite existing for this user/locale)
        await prisma.careerPrediction.deleteMany({
            where: { userId, locale: language }
        });

        const savedPrediction = await prisma.careerPrediction.create({
            data: {
                userId,
                prediction: aiResponse.predictions,
                locale: language
            }
        });

        return NextResponse.json({
            predictions: aiResponse.predictions,
            lastUpdated: savedPrediction.createdAt
        });
    } catch (error: any) {
        console.error("Career Prediction API Error:", error);
        return NextResponse.json({
            error: "An unexpected error occurred while generating your career path. Please try again later."
        }, { status: 500 });
    }
}
