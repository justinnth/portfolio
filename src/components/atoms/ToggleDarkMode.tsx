"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const ToggleDarkMode = () => {
  const { theme, setTheme } = useTheme();

  const onClick = () =>
    theme == "dark" ? setTheme("light") : setTheme("dark");

  return (
    <button onClick={onClick}>{theme === "dark" ? <Sun /> : <Moon />}</button>
  );
};
