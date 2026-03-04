import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session || session.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        const submission = await prisma.submission.findUnique({
            where: { id },
            include: {
                user: { select: { name: true, email: true } },
                subject: { select: { nameEn: true, nameAr: true } },
                quiz: true,
            },
        });

        if (!submission) {
            return NextResponse.json({ error: "Submission not found" }, { status: 404 });
        }

        return NextResponse.json(submission);
    } catch (error) {
        console.error("Admin Analytics ID GET Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
