// Create this file at: src/app/api/submit-to-sheets/route.js

import { NextResponse } from 'next/server';

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw8Kp30qVGl894KGyXKrHZB_2rE9PY50MWnVr48e9j9WWvqx-H85LL5zuHE73mQQUu7/exec";
const GOOGLE_SCRIPT_URL2 = "https://script.google.com/macros/s/AKfycbztdeOYQMZwraZ6XHXlTUCQe0iV5mZEe7t05naH7v31N4MYbXoSni68rsVvB_R-LxZk/exec";

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

        const response2 = await fetch(GOOGLE_SCRIPT_URL2, {
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