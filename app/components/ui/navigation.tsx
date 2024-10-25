"use client";

import React from "react";
import { Button } from "./button";
import { Home, Info, Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "../theme-provider";
import { LinkButton } from "./link-button";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="sticky top-0 w-full z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <header>
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16" aria-label="Main navigation">
            {/* Logo/Brand */}
            <Button
              variant="ghost"
              className="font-semibold text-lg"
              onClick={() => {
                /* Add navigation logic */
              }}
            >
              Alt Text Generator
            </Button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <LinkButton href="/" variant="ghost" className="flex items-center gap-2">
                <Home className="h-4 w-4" aria-hidden="true" />
                <span>Home</span>
              </LinkButton>
              <LinkButton href="/about" variant="ghost" className="flex items-center gap-2">
                <Info className="h-4 w-4" aria-hidden="true" />
                <span>About</span>
              </LinkButton>

              {/* Theme Toggle Button */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex items-center gap-2"
                  onClick={toggleTheme}
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only">Switch to light theme</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only">Switch to dark theme</span>
                    </>
                  )}
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="md:hidden flex items-center gap-2"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <>
                  <X className="h-6 w-6" aria-hidden="true" />
                  <span>Close</span>
                </>
              ) : (
                <>
                  <Menu className="h-6 w-6" aria-hidden="true" />
                  <span>Menu</span>
                </>
              )}
            </Button>
          </nav>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div
              id="mobile-menu"
              className="absolute inset-x-0 top-full h-auto bg-background border-b md:hidden py-4 space-y-2"
              role="region"
              aria-label="Mobile navigation"
            >
              <div className="container mx-auto px-4 space-y-2">
                <Link href="/" legacyBehavior passHref>
                  <Button
                    variant="ghost"
                    className="w-full flex items-center gap-2 justify-start"
                    asChild
                  >
                    <span>
                      <Home className="h-4 w-4" aria-hidden="true" />
                      <span>Home</span>
                    </span>
                  </Button>
                </Link>
                <Link href="/about" legacyBehavior passHref>
                  <Button
                    variant="ghost"
                    className="w-full flex items-center gap-2 justify-start"
                    asChild
                  >
                    <span>
                      <Info className="h-4 w-4" aria-hidden="true" />
                      <span>About</span>
                    </span>
                  </Button>
                </Link>

                {/* Mobile Theme Toggle */}
                {mounted && (
                  <Button
                    variant="ghost"
                    className="w-full flex items-center gap-2 justify-start"
                    onClick={toggleTheme}
                  >
                    {theme === "dark" ? (
                      <>
                        <Sun className="h-4 w-4" aria-hidden="true" />
                        <span>Switch to Light Theme</span>
                      </>
                    ) : (
                      <>
                        <Moon className="h-4 w-4" aria-hidden="true" />
                        <span>Switch to Dark Theme</span>
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
