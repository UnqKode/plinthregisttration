// Create this file at: src/app/api/submit-to-sheets/route.js

import { NextResponse } from 'next/server';

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyrWcxnDclJr1TUyMu2eJTSbItdabHMIuz9_17dTD_oF_YAdqoeJ7rp3NWhG-KLe3HS/exec";

export async function POST(request) {
    try {
        const data = await request.json();

        console.log("📤 Proxying request to Google Sheets...", data);

        // Forward the request to Google Apps Script
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });


        const responseText = await response.text();
        console.log("📥 Response from Google Sheets:", responseText);

        // Try to parse as JSON
        let result;
        try {
            result = JSON.parse(responseText);
        } catch {
            // If not JSON, return as text
            result = { status: 'success', message: responseText };
        }

        if (!response.ok) {
            throw new Error(result.message || 'Failed to submit to Google Sheets');
        }

        return NextResponse.json(result);

    } catch (error) {
        console.error("❌ Error submitting to Google Sheets:", error);
        return NextResponse.json(
            {
                status: 'error',
                message: error.message || 'Failed to submit data'
            },
            { status: 500 }
        );
    }
}