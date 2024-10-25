"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Camera, HelpCircle } from "lucide-react";

// Valid MIME types for Claude Vision
const VALID_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"] as const;

type ValidImageType = (typeof VALID_IMAGE_TYPES)[number];

// Type guard for valid image types
function isValidImageType(type: string): type is ValidImageType {
  return VALID_IMAGE_TYPES.includes(type as ValidImageType);
}

interface GenerateResponse {
  altText: string;
  rawDescription: string;
}

export default function AltTextGenerator() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [context, setContext] = useState("");
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (file: File) => {
    if (!isValidImageType(file.type)) {
      setError("Please select a valid image file (JPEG, PNG, GIF, or WebP)");
      return;
    }
    setError(null);
    setImage(file);
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageChange(file);
    }
  };

  const handleSubmit = async () => {
    if (!image) return;

    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("context", context);

      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to generate alt text");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Alt Text Generator</CardTitle>
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-sm text-gray-500">
          Upload an image and provide context to generate accessible alt text
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Error Alert */}
        {error && (
          <Alert>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            preview ? "" : "hover:border-primary/50"
          }`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {preview ? (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="" className="mx-auto h-64 object-contain rounded-lg" />
              <Button
                className="absolute top-2 right-2"
                variant="secondary"
                onClick={() => {
                  setImage(null);
                  setPreview(null);
                  setResult(null);
                }}
              >
                Change
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Camera className="mx-auto h-12 w-12 text-gray-400" />
              <div>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  className="hidden"
                  id="image-upload"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageChange(file);
                  }}
                />
                <Button
                  variant="secondary"
                  onClick={() => document.getElementById("image-upload")?.click()}
                >
                  Choose Image
                </Button>
                <p className="mt-2 text-sm text-gray-500">or drag and drop</p>
                <p className="mt-1 text-xs text-gray-400">Supports JPEG, PNG, GIF, and WebP</p>
              </div>
            </div>
          )}
        </div>

        {/* Context Input */}
        <div className="space-y-2">
          <label htmlFor="context" className="block text-sm font-medium">
            Context
            <span className="text-gray-500 ml-2 font-normal">(Where will this image appear?)</span>
          </label>
          <textarea
            id="context"
            className="w-full h-24 p-2 border rounded-md"
            placeholder="Enter surrounding content or context for the image..."
            value={context}
            onChange={(e) => setContext(e.target.value)}
          />
        </div>

        {/* Generate Button */}
        <Button onClick={handleSubmit} disabled={!image || loading} className="w-full">
          {loading ? "Analyzing..." : "Generate Alt Text"}
        </Button>

        {/* Results */}
        {result && (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Generated Alt Text:</h3>
              <Alert>
                <AlertDescription>{result.altText}</AlertDescription>
              </Alert>
            </div>

            <div>
              <h3 className="font-medium mb-2">Detailed Description:</h3>
              <Alert>
                <AlertDescription>{result.rawDescription}</AlertDescription>
              </Alert>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
