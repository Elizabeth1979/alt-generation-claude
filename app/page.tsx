import React from "react";
import AltTextGenerator from "./components/alt-text-generator";
import AltTextHelper from "./components/alt-text-helper";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <div className="space-y-8">
        {/* Title Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Alt Text Tools</h1>
          <p className="text-gray-600">
            Generate and learn about accessible alt text for your images
          </p>
        </div>

        {/* Vertical Layout */}
        <div className="space-y-8 max-w-2xl mx-auto">
          {/* Generator Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Generate Alt Text</h2>
            <AltTextGenerator />
          </section>

          {/* Decision Helper Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Learn Alt Text Rules</h2>
            <AltTextHelper />
          </section>
        </div>
      </div>
    </main>
  );
}
