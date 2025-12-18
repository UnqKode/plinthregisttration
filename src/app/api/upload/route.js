import { v2 as cloudinary } from "cloudinary";
import { rateLimit } from "../../../lib/rate-limit";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUD,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

if (!process.env.CLOUD || !process.env.API_KEY || !process.env.API_SECRET) {
  console.error("❌ Cloudinary config missing:", {
    CLOUD: !!process.env.CLOUD,
    API_KEY: !!process.env.API_KEY,
    API_SECRET: !!process.env.API_SECRET,
  });
}

export async function POST(req) {
  try {
    // 1. Rate Limiting
    const headerList = await headers();
    const ip = headerList.get("x-forwarded-for") || headerList.get("x-real-ip") || "127.0.0.1";
    const { success } = await rateLimit(ip);

    if (!success) {
      return NextResponse.json(
        { error: "Too many uploads. Please wait." },
        { status: 429 }
      );
    }

    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // 2. Strict File Validation
    const MAX_SIZE = 2 * 1024 * 1024; // 2MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Max limit is 2MB." },
        { status: 400 }
      );
    }

    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPG, PNG, and WebP are allowed." },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary with additional options
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "payment_folder",
            resource_type: "image",
            allowed_formats: ["jpg", "png", "webp"],
            max_file_size: MAX_SIZE
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    return NextResponse.json({
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id
    });

  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}