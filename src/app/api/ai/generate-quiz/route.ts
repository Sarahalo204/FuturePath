import { NextRequest, NextResponse } from "next/server";
import { generateQuizPrompt, processAIRequest, QuizQuestion } from "@/lib/ai-service";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const { subject, language, count, difficulty } = await req.json();

        if (!subject || !language) {
            return NextResponse.json(
                { error: "Subject and language are required." },
                { status: 400 }
            );
        }

        // 1. Ensure subject exists in DB (normalized names)
        const normalizedKey = subject.toLowerCase();
        const displayEng = normalizedKey.charAt(0).toUpperCase() + normalizedKey.slice(1);

        let subjectRecord;
        try {
            subjectRecord = await prisma.subject.upsert({
                where: { nameEn: displayEng },
                update: {},
                create: {
                    nameEn: displayEng,
                    nameAr: normalizedKey === "math" ? "الرياضيات" :
                        normalizedKey === "physics" ? "الفيزياء" :
                            normalizedKey === "biology" ? "الأحياء" :
                                normalizedKey === "chemistry" ? "الكيمياء" :
                                    normalizedKey === "english" ? "اللغة الإنجليزية" : displayEng,
                    isEnabled: true
                },
            });
        } catch (dbError) {
            console.error("Prisma Connection Error (Quiz Gen):", dbError);
            return NextResponse.json(
                { error: "Database connection failed. Please check if your database server is running." },
                { status: 503 }
            );
        }

        // 2. Generate questions via AI
        const prompt = generateQuizPrompt(subjectRecord.nameEn, language, count, difficulty);
        const questions = await processAIRequest<QuizQuestion[]>(prompt, language);

        // 3. Save the specific Quiz instance
        const quiz = await prisma.quiz.create({
            data: {
                subjectId: subjectRecord.id,
                questions: questions as any,
            }
        });

        return NextResponse.json({
            success: true,
            quizId: quiz.id,
            subjectId: subjectRecord.id,
            questions,
        });
    } catch (error: any) {
        console.error("Quiz Generation Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to generate quiz." },
            { status: 500 }
        );
    }
}
