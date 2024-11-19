"use client";

import React, { useEffect } from "react";

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only run in browser and development environment
    if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
      const initAxe = async () => {
        try {
          const axe = await import("@axe-core/react");
          const ReactDOM = await import("react-dom");

          await axe.default(React, ReactDOM, 1000, {
            rules: [{ id: "*", enabled: true }],
          });
        } catch (error) {
          console.error("Error initializing accessibility checker:", error);
        }
      };

      initAxe();
    }
  }, []);

  return <>{children}</>;
}
