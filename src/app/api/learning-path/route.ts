import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id as string;
        const { searchParams } = new URL(req.url);
        const subjectId = searchParams.get("subjectId");

        // Fetch learning path (plural naming convention as per schema)
        const learningPaths = await prisma.learningPath.findFirst({
            where: {
                userId,
                ...(subjectId ? { subjectId } : {})
            },
            include: { subject: true },
            orderBy: { updatedAt: "desc" }
        });

        if (learningPaths) {
            return NextResponse.json({
                success: true,
                roadmap: learningPaths.roadmap,
                resources: learningPaths.resources,
                subject: learningPaths.subject
            });
        }

        // If no path, check if they have any submissions to generate one
        const latestSubmission = await prisma.submission.findFirst({
            where: {
                userId,
                ...(subjectId ? { subjectId } : {})
            },
            include: { subject: true },
            orderBy: { createdAt: "desc" }
        });

        if (!latestSubmission) {
            return NextResponse.json({
                error: "No diagnostic assessment found for this subject."
            }, { status: 404 });
        }

        // Return a message that a path exists but wasn't found (fallback)
        return NextResponse.json({
            error: "Learning path not yet generated. Please wait for processing."
        }, { status: 404 });

    } catch (error) {
        console.error("Learning Path Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
