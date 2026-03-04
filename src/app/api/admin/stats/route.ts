import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth();
        if (!session || session.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 1. Total Students
        const totalStudents = await prisma.user.count({
            where: { role: "STUDENT" }
        });

        // 2. Total Quizzes Taken (Submissions)
        const totalQuizzes = await prisma.submission.count();

        // 3. Average Score per Subject
        const subjects = await prisma.subject.findMany({
            include: {
                submissions: {
                    select: { score: true }
                }
            }
        });

        const subjectStats = subjects.map((s: any) => {
            const avg = s.submissions.length > 0
                ? s.submissions.reduce((acc: number, curr: any) => acc + curr.score, 0) / s.submissions.length
                : 0;
            return {
                id: s.id,
                nameEn: s.nameEn,
                nameAr: s.nameAr,
                avg: Math.round(avg * 10) / 10
            };
        });

        // 4. Most Challenging Subject (lowest avg score with at least one submission)
        const challenging = [...subjectStats]
            .filter(s => s.avg > 0)
            .sort((a, b) => a.avg - b.avg)[0] || null;

        return NextResponse.json({
            totalStudents,
            totalQuizzes,
            subjectStats,
            challenging: challenging ? challenging.nameEn : "N/A"
        });
    } catch (error) {
        console.error("Admin Stats API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
