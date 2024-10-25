import React from "react";
import AltTextGenerator from "./components/alt-text-generator";
import { Info } from "lucide-react";
import { LinkButton } from "./components/ui/link-button";

export default function Home() {
  return (
    <main className="flex-1 container mx-auto p-4 pt-8">
      <div className="space-y-12 max-w-3xl mx-auto">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold mb-4">AI-Powered Alt Text Generator</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create accessible, contextual alt text for your images using advanced AI. Make your
            content accessible to everyone, effortlessly.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <LinkButton href="/about" size="lg" className="inline-flex items-center">
              <Info className="mr-2 h-5 w-5" />
              Learn More
            </LinkButton>
          </div>
        </div>

        {/* Key Features */}
        <section className="grid md:grid-cols-3 gap-6 py-8">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Context-Aware</h3>
            <p className="text-muted-foreground">
              Generates alt text that considers both image content and surrounding context
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">WCAG Compliant</h3>
            <p className="text-muted-foreground">
              Follows accessibility guidelines to ensure proper image descriptions
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">AI-Powered</h3>
            <p className="text-muted-foreground">
              Uses advanced AI to analyze images and generate accurate descriptions
            </p>
          </div>
        </section>

        {/* Generator Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">Try It Now</h2>
          <AltTextGenerator />
        </section>
      </div>
    </main>
  );
}
