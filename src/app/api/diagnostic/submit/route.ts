// 
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { generateRoadmapPrompt, processAIRequest, RoadmapResponse } from "@/lib/ai-service";

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { answers, locale = "en" } = await req.json();
        const userId = session.user.id as string;

        // 1. تجميع الإجابات حسب المادة (ضمان التعامل مع مادة واحدة أو أكثر)
        const submissionsBySubject: Record<string, any> = {};

        for (const ans of answers) {
            // توحيد المعرف ليكون حرف صغير دائماً لمنع أخطاء قاعدة البيانات
            const subjectKey = String(ans.subjectId).toLowerCase();
            if (!submissionsBySubject[subjectKey]) {
                submissionsBySubject[subjectKey] = {
                    quizId: ans.quizId,
                    answers: [],
                    correctCount: 0,
                };
            }
            submissionsBySubject[subjectKey].answers.push(ans);
            if (ans.isCorrect) submissionsBySubject[subjectKey].correctCount++;
        }

        const resultsSummary = [];

        // 2. معالجة كل مادة بشكل مستقل
        for (const [subjectKey, data] of Object.entries(submissionsBySubject)) {
            const displayEng = subjectKey.charAt(0).toUpperCase() + subjectKey.slice(1);

            // التأكد من وجود المادة أو إنشائها (حل مشكلة P2003)
            const subject = await prisma.subject.upsert({
                where: { nameEn: displayEng },
                update: {},
                create: {
                    nameEn: displayEng,
                    nameAr: subjectKey === "math" ? "الرياضيات" :
                        subjectKey === "physics" ? "الفيزياء" :
                            subjectKey === "biology" ? "الأحياء" :
                                subjectKey === "chemistry" ? "الكيمياء" :
                                    subjectKey === "english" ? "اللغة الإنجليزية" : displayEng,
                    isEnabled: true
                }
            });

            const score = (data.correctCount / data.answers.length) * 100;

            // المرحلة 2: طلب التحليل والمسار من الذكاء الاصطناعي باللغة المختارة
            const prompt = generateRoadmapPrompt([{
                subject: locale === 'ar' ? (subject.nameAr || subject.nameEn) : subject.nameEn,
                score,
                answers: data.answers.map((a: any) => ({
                    question: a.question,
                    isCorrect: a.isCorrect,
                    topic: a.topic
                }))
            }], locale);

            let aiAnalysis: RoadmapResponse;
            try {
                aiAnalysis = await processAIRequest<RoadmapResponse>(prompt, locale);
            } catch (aiError) {
                console.error("AI Error:", aiError);
                aiAnalysis = { roadmap: [], resources: [], majorSuggestions: [] };
            }

            // إنشاء السجل (Submission)
            const submission = await prisma.submission.create({
                data: {
                    userId,
                    subjectId: subject.id,
                    quizId: data.quizId,
                    score,
                    answers: data.answers as any,
                    analysis: aiAnalysis as any,
                }
            });

            // تحديث المسار التعليمي (استخدام المسمى الصحيح من الـ Schema)
            // ملاحظة: تأكدي لو كان اسم الجدول في الـ schema هو learningPaths بالجمع غيري السطر بالأسفل
            await prisma.learningPath.upsert({
                where: { userId_subjectId: { userId, subjectId: subject.id } },
                update: {
                    roadmap: aiAnalysis.roadmap as any,
                    resources: aiAnalysis.resources as any,
                },
                create: {
                    userId,
                    subjectId: subject.id,
                    roadmap: aiAnalysis.roadmap as any,
                    resources: aiAnalysis.resources as any,
                }
            });

            resultsSummary.push({
                submissionId: submission.id,
                subjectId: subject.id,
                subjectName: locale === 'ar' ? subject.nameAr : subject.nameEn,
                score: `${data.correctCount}/${data.answers.length}`,
                percentage: score
            });
        }

        return NextResponse.json({
            success: true,
            results: resultsSummary,
        });
    } catch (error: any) {
        console.error("Submission API Error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}