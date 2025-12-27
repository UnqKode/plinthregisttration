// src/app/api/submit-to-sheets/route.js

import { NextResponse } from "next/server";
import { rateLimit } from "../../../lib/rate-limit";
import { headers } from "next/headers";

const GOOGLE_SCRIPT_URL =process.env.CODEURI

let cache = {
  data: null,
  timestamp: 0,
};

export async function GET(request) {
  // Rate Limiting
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") || "127.0.0.1";
  const { success } = await rateLimit(ip);
  
  if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const now = Date.now();
  const isExpired = now - cache.timestamp > 1000 * 60 * 5; 

  if (!isExpired && cache.data) {
    return Response.json(cache.data);
  }

  try {
    console.log("📤 Fetching referral codes from Google Sheets...");

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "GET",
    });

    const responseText = await response.text();

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
