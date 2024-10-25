import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

// Valid MIME types for Claude Vision
const VALID_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"] as const;

type ValidImageType = (typeof VALID_IMAGE_TYPES)[number];

// Type guard for valid image types
function isValidImageType(type: string): type is ValidImageType {
  return VALID_IMAGE_TYPES.includes(type as ValidImageType);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const context = formData.get("context") as string;

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Validate image type
    if (!isValidImageType(image.type)) {
      return NextResponse.json(
        { error: "Invalid image type. Supported formats: JPEG, PNG, GIF, WebP" },
        { status: 400 }
      );
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");

    // Get raw description from Claude
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

    // Get the description text from the response
    const rawDescription = descriptionResponse.content[0].text;

    // Generate alt text using description and context
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
                  5. Max length 125 characters`,
            },
          ],
        },
      ],
    });

    // Get the alt text from the response
    const altText = altTextResponse.content[0].text;

    return NextResponse.json({
      rawDescription,
      altText,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 });
  }
}
