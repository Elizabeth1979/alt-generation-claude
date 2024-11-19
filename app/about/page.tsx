import React from "react";
import AltTextHelper from "../components/alt-text-helper";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto p-4 pt-8">
        <div className="space-y-8 max-w-3xl mx-auto">
          {/* Title Section */}
          <div>
            <h1 className="text-3xl font-bold mb-4">About Alt Text Generator</h1>
            <p className="text-muted-foreground text-lg mb-4">
              Understanding and implementing proper alt text is crucial for web accessibility. This
              guide helps you make informed decisions about alt text for your images.
            </p>
          </div>

          {/* Alt Text Decision Helper Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Alt Text Decision Tree</h2>
            <AltTextHelper />
          </section>

          {/* Additional Information */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">About Alt Text</h2>
            <div className="space-y-4">
              <p>
                Alt text (alternative text) describes the content and function of images on digital
                platforms. It serves several crucial purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Accessibility:</strong> Enables screen reader users to understand image
                  content
                </li>
                <li>
                  <strong>SEO:</strong> Helps search engines understand and index images properly
                </li>
                <li>
                  <strong>Context:</strong> Provides context when images fail to load
                </li>
                <li>
                  <strong>Compliance:</strong> Helps meet WCAG accessibility guidelines
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-medium">How This Tool Works</h3>
              <p>
                Our Alt Text Generator combines advanced image analysis with context-aware
                processing to create meaningful, accessible alt text. It follows WCAG guidelines and
                best practices to ensure your images are properly described for all users.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
