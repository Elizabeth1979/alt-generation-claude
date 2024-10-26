import type { Metadata } from "next";
import { Wix_Madefor_Display as WixMadefor } from "next/font/google";
import { ThemeProvider } from "./components/theme-provider";
import { Navigation } from "./components/ui/navigation";
import { AccessibilityProvider } from "./providers"; // Make sure this path is correct
import "./globals.css";

const wixMadefor = WixMadefor({
  subsets: ["latin"],
  variable: "--font-wix-madefor",
});

export const metadata: Metadata = {
  title: "Alt Text Generator - Create Accessible Image Descriptions",
  description: "Generate accessible, context-aware alt text for your images using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${wixMadefor.variable} font-sans antialiased min-h-screen bg-background`}>
        <ThemeProvider defaultTheme="system" storageKey="alt-text-theme">
          <AccessibilityProvider>
            {/* Add a test element to trigger some axe checks */}
            <div>
              <div className="relative min-h-screen flex flex-col">
                <Navigation />
                {children}
              </div>
            </div>
          </AccessibilityProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
