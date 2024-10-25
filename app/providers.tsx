import { useEffect } from "react";
import React from "react"; // Add this import

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const axe = require("@axe-core/react");
      const ReactDOM = require("react-dom");
      axe(React, ReactDOM, 1000, {
        rules: [{ id: "*", enabled: true }],
      }).catch((err: Error) => {
        console.error("Accessibility issues found:", err);
      });

      // Optional: Add more visible logging
      console.log("🔍 Axe accessibility checker is running...");
    }
  }, []);

  return <>{children}</>;
}
