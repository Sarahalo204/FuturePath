import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session || session.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();
        const { nameEn, nameAr, descriptionEn, descriptionAr, isEnabled } = body;

        const subject = await prisma.subject.update({
            where: { id },
            data: { nameEn, nameAr, descriptionEn, descriptionAr, isEnabled }
        });

        return NextResponse.json(subject);
    } catch (error) {
        console.error("Admin Subject UPDATE Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session || session.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        await prisma.subject.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Admin Subject DELETE Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
