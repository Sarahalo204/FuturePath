import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        if (!session || session.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const subjects = await prisma.subject.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                _count: { select: { quizzes: true, submissions: true } }
            }
        });

        return NextResponse.json(subjects);
    } catch (error) {
        console.error("Admin Subjects GET Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session || session.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { id, nameEn, nameAr, descriptionEn, descriptionAr, isEnabled } = body;

        const subject = await prisma.subject.create({
            data: {
                id, // Custom ID if provided (e.g. 'math')
                nameEn,
                nameAr,
                descriptionEn,
                descriptionAr,
                isEnabled: isEnabled ?? true
            }
        });

        return NextResponse.json(subject);
    } catch (error) {
        console.error("Admin Subjects POST Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
