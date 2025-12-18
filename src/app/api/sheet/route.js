import { NextResponse } from 'next/server';
import { rateLimit } from '../../../lib/rate-limit';
import { RegistrationSchema } from '../../../lib/validations'; // Keep Zod for validation
import { headers } from 'next/headers';
import dbConnect from '../../../lib/dbconnect';
import Registration from '../../../models/Registration';

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

        // Validate with Zod first
        const validation = RegistrationSchema.safeParse(data);
        if (!validation.success) {
            console.error("❌ Validation Error:", validation.error);
            return NextResponse.json(
                { status: 'error', message: 'Invalid data format', errors: validation.error.flatten() },
                { status: 400 }
            );
        }

        // 3. Connect to MongoDB
        await dbConnect();

        // 4. Save to Database
        console.log("💾 Saving to MongoDB...", data);
        const newRegistration = await Registration.create(data);

        console.log("✅ Saved to MongoDB:", newRegistration._id);

        return NextResponse.json({
            status: 'success',
            message: 'Registration saved successfully!',
            data: { id: newRegistration._id }
        });

    } catch (error) {
        console.error("❌ Error saving to MongoDB:", error);
        return NextResponse.json(
            {
                status: 'error',
                message: error.message || 'Failed to submit data'
            },
            { status: 500 }
        );
    }
}