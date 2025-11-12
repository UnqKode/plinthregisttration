// src/app/api/submit-to-sheets/route.js

import { NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxVZ5nKqACxnLX_7J27wNMZmqkeuihXDWIagtaCisna3rPGvyap-YP96rn5p2WRjAs/exec";

let cache = {
  data: null,
  timestamp: 0,
};

export async function GET(request) {
  const now = Date.now();
  const isExpired = now - cache.timestamp > 1000 * 60 * 5; 

  if (!isExpired && cache.data) {
    console.log("⚡ Serving from cache", cache.data);
    return Response.json(cache.data);
  }

  try {
    console.log("📤 Fetching referral codes from Google Sheets...");

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "GET",
    });

    const responseText = await response.text();
    console.log("📥 Response from Google Sheets:", responseText);

    let result;
    try {
      result = JSON.parse(responseText);
    } catch {
      result = { status: "success", message: responseText };
    }

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch referral codes");
    }

    cache = {
      data: result,
      timestamp: now,
    };

    console.log("✅ Cache updated at:", new Date(now).toLocaleTimeString());

    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ Error fetching referral codes:", error);
    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Failed to fetch referral codes",
      },
      { status: 500 }
    );
  }
}
