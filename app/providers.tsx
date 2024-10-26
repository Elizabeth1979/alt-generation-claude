"use client";

import React, { useEffect } from "react";

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Add immediate logging to verify the code runs
    console.log("🔍 AccessibilityProvider mounted");

    if (process.env.NODE_ENV !== "production") {
      console.log("🔧 Development mode detected - initializing axe");

      const initAxe = async () => {
        try {
          console.log("📦 Loading axe-core...");
          const axe = await import("@axe-core/react");
          const ReactDOM = await import("react-dom");

          console.log("⚡ Configuring axe...");
          await axe.default(React, ReactDOM, 1000, {
            rules: [{ id: "*", enabled: true }],
          });

          console.log("✅ Accessibility checker successfully initialized!");
        } catch (error) {
          console.error("❌ Error initializing accessibility checker:", error);
          console.error("Detailed error:", error);
        }
      };

      initAxe();
    } else {
      console.log("⚠️ Production mode - axe checks disabled");
    }
  }, []);

  return <>{children}</>;
}
