import { NextResponse } from 'next/server';
import { rateLimit } from '../../../lib/rate-limit';
import { headers } from 'next/headers';
import dbConnect from '../../../lib/dbconnect';
import Ambassador from '../../../models/Ambassador';
import { z } from "zod";

const AmbassadorValidation = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    contact: z.string().min(10, "Invalid phone number"),
    college: z.string().min(2, "College name is required"),
});

export async function POST(request) {
    try {
        // 1. Rate Limiting
        const headerList = await headers();
        const ip = headerList.get("x-forwarded-for") || "127.0.0.1";
        const { success } = await rateLimit(ip);

        if (!success) {
            return NextResponse.json(
                { status: 'error', message: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        // 2. Input Validation
        const data = await request.json();
        const validation = AmbassadorValidation.safeParse(data);

        if (!validation.success) {
            return NextResponse.json(
                { status: 'error', message: 'Invalid data format', errors: validation.error.flatten() },
                { status: 400 }
            );
        }

        // 3. Connect to MongoDB
        await dbConnect();

        // 4. Save to Database
        console.log("💾 Saving Ambassador...", data);
        const newAmbassador = await Ambassador.create(data);

        return NextResponse.json({
            status: 'success',
            message: 'Registration successful!',
            data: { id: newAmbassador._id }
        });

    } catch (error) {
        console.error("❌ Ambassador Error:", error);

        // Handle duplicate email error
        if (error.code === 11000) {
            return NextResponse.json(
                { status: 'error', message: 'This email is already registered.' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { status: 'error', message: 'Failed to submit data' },
            { status: 500 }
        );
    }
}
