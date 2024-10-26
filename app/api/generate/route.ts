import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

// Define valid MIME types
const VALID_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"] as const;
type ValidImageType = (typeof VALID_IMAGE_TYPES)[number];

// Type guard for image type validation
function isValidImageType(type: string): type is ValidImageType {
  return VALID_IMAGE_TYPES.includes(type as ValidImageType);
}

// Safely log API key info without exposing the key
const logApiKeyInfo = (apiKey: string | undefined) => {
  console.log("API Key diagnostics:", {
    isDefined: !!apiKey,
    length: apiKey?.length ?? 0,
    startsWithPrefix: apiKey?.startsWith("sk-") ?? false,
    prefix: apiKey?.slice(0, 2) ?? "none",
    suffix: apiKey?.slice(-2) ?? "none",
  });
};

export async function POST(request: Request) {
  console.log("Starting POST request handler");

  try {
    // Log environment information
    console.log("Environment:", {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV,
      IS_VERCEL: process.env.VERCEL === "1",
    });

    // Get and validate API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    logApiKeyInfo(apiKey);

    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY is not defined");
    }

    if (!apiKey.startsWith("sk-")) {
      throw new Error("ANTHROPIC_API_KEY appears to be malformed (should start with sk-)");
    }

    console.log("Creating Anthropic client");
    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    const formData = await request.formData();
    const image = formData.get("image") as File;
    const context = formData.get("context") as string;

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Validate image type
    if (!isValidImageType(image.type)) {
      return NextResponse.json(
        {
          error: `Invalid image type: ${image.type}. Supported formats: JPEG, PNG, GIF, WebP`,
        },
        { status: 400 }
      );
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");

    console.log("Making first API call to Claude");
    const descriptionResponse = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Describe this image in detail, focusing on its main elements and purpose.",
            },
            {
              type: "image",
              source: {
                type: "base64",
                media_type: image.type as ValidImageType,
                data: base64Image,
              },
            },
          ],
        },
      ],
    });

    const rawDescription =
      descriptionResponse.content[0].type === "text" ? descriptionResponse.content[0].text : "";

    console.log("Making second API call to Claude");
    const altTextResponse = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Given this image description: "${rawDescription}"
                  And this context: "${context}"
                  Generate a concise, meaningful alt text following these rules:
                  1. If the image is decorative, return 'alt=""'
                  2. If the image contains text, include that text
                  3. Keep it concise but descriptive
                  4. Focus on the meaning in context, not just visual description
                  5. Follow the alt decision tree best practices`,
            },
          ],
        },
      ],
    });

    const altText =
      altTextResponse.content[0].type === "text" ? altTextResponse.content[0].text : "";

    return NextResponse.json({
      rawDescription,
      altText,
    });
  } catch (error) {
    console.error("Detailed error:", {
      error:
        error instanceof Error
          ? {
              name: error.name,
              message: error.message,
              stack: error.stack,
            }
          : error,
      envVars: {
        nodeEnv: process.env.NODE_ENV,
        hasApiKey: !!process.env.ANTHROPIC_API_KEY,
      },
    });

    return NextResponse.json(
      {
        error: "Failed to process image",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}
