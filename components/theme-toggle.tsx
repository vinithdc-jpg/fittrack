"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";

const themeChangeEvent = "fittrack-theme-change";

function subscribeToTheme(onChange: () => void) {
  window.addEventListener(themeChangeEvent, onChange);
  return () => window.removeEventListener(themeChangeEvent, onChange);
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerThemeSnapshot() {
  return false;
}

export function ThemeToggle() {
  const darkMode = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("fittrack-theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initialDarkMode = savedTheme ? savedTheme === "dark" : prefersDark;

    document.documentElement.classList.toggle("dark", initialDarkMode);
    window.dispatchEvent(new Event(themeChangeEvent));
  }, []);

  const toggleTheme = () => {
    const nextDarkMode = !darkMode;

    document.documentElement.classList.toggle("dark", nextDarkMode);
    window.localStorage.setItem(
      "fittrack-theme",
      nextDarkMode ? "dark" : "light",
    );
    window.dispatchEvent(new Event(themeChangeEvent));
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={darkMode}
    >
      {darkMode ? (
        <SunMedium className="h-4 w-4" />
      ) : (
        <MoonStar className="h-4 w-4" />
      )}
    </Button>
  );
}
