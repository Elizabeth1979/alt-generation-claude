import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

// Initialize Anthropic client with explicit API key validation
const getAnthropicClient = () => {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey || typeof apiKey !== "string" || apiKey.trim() === "") {
    throw new Error("Invalid or missing ANTHROPIC_API_KEY");
  }

  return new Anthropic({
    apiKey: apiKey.trim(),
  });
};

export async function POST(request: Request) {
  try {
    // Validate API key and create client first
    const anthropic = getAnthropicClient();

    // Log API key presence (don't log the actual key!)
    console.log("API Key status:", {
      exists: !!process.env.ANTHROPIC_API_KEY,
      length: process.env.ANTHROPIC_API_KEY?.length || 0,
    });

    const formData = await request.formData();
    const image = formData.get("image") as File;
    const context = formData.get("context") as string;

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");

    // Test API connection with a simple request first
    try {
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
                  media_type: image.type,
                  data: base64Image,
                },
              },
            ],
          },
        ],
      });

      const rawDescription =
        descriptionResponse.content[0].type === "text" ? descriptionResponse.content[0].text : "";

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
    } catch (apiError) {
      console.error("API Error:", apiError);
      throw new Error(
        `API request failed: ${apiError instanceof Error ? apiError.message : "Unknown API error"}`
      );
    }
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
