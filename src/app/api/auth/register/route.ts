import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { email, password, name, role } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
        }

        let existingUser;
        try {
            existingUser = await prisma.user.findUnique({
                where: { email },
            });
        } catch (dbError) {
            console.error("Prisma Connection Error:", dbError);
            return NextResponse.json({ error: "Database connection failed. Please try again later." }, { status: 503 });
        }

        if (existingUser) {
            return NextResponse.json({ error: "An account with this email already exists." }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: role || "STUDENT",
            },
        });

        return NextResponse.json({ success: true, userId: user.id });
    } catch (error: any) {
        console.error("Registration Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
