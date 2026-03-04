import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        if (!session || session.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const studentName = searchParams.get("studentName");
        const subjectId = searchParams.get("subjectId");
        const minScore = searchParams.get("minScore");
        const maxScore = searchParams.get("maxScore");
        const startDate = searchParams.get("startDate");

        // Build filter object
        const where: any = {};

        if (studentName) {
            where.user = { name: { contains: studentName, mode: "insensitive" } };
        }

        if (subjectId && subjectId !== "all") {
            where.subjectId = subjectId;
        }

        if (minScore || maxScore) {
            where.score = {};
            if (minScore) where.score.gte = parseFloat(minScore);
            if (maxScore) where.score.lte = parseFloat(maxScore);
        }

        if (startDate) {
            where.createdAt = { gte: new Date(startDate) };
        }

        const submissions = await prisma.submission.findMany({
            where,
            include: {
                user: { select: { name: true, email: true } },
                subject: { select: { nameEn: true, nameAr: true } },
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(submissions);
    } catch (error) {
        console.error("Admin Analytics GET Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
