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
      <header className="py-4 md:py-6">
        <div className="container mx-auto px-4">
          <nav
            className="relative flex items-center justify-between h-20"
            aria-label="Main navigation"
          >
            {/* Logo/Brand */}
            <div className="flex-1">
              <LinkButton href="/" variant="ghost" className="font-semibold text-lg">
                Alt Text Generator
              </LinkButton>
            </div>

            {/* Centered Theme Toggle Button */}
            {mounted && (
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex items-center gap-2 peer"
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
                  <div
                    className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-1 px-2 py-1 bg-popover text-popover-foreground text-sm rounded shadow-lg invisible opacity-0 peer-hover:visible peer-hover:opacity-100 peer-focus:visible peer-focus:opacity-100 transition-all duration-200 whitespace-nowrap min-w-max text-center w-max z-50"
                    role="tooltip"
                    style={{ maxWidth: "calc(100vw - 2rem)" }}
                  >
                    Switch to {theme === "dark" ? "light" : "dark"} theme
                  </div>
                </div>
              </div>
            )}

            {/* Desktop Navigation */}
            <div className="hidden md:flex flex-1 items-center gap-4 justify-end">
              <LinkButton href="/" variant="ghost" className="flex items-center gap-2">
                <Home className="h-4 w-4" aria-hidden="true" />
                <span>Home</span>
              </LinkButton>
              <LinkButton href="/about" variant="ghost" className="flex items-center gap-2">
                <Info className="h-4 w-4" aria-hidden="true" />
                <span>About</span>
              </LinkButton>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex-1 flex justify-end md:hidden">
              <Button
                variant="ghost"
                className="flex items-center gap-2"
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
            </div>
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
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
