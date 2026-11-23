"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMounted } from "@/hooks/use-mounted";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const t = useTranslations("common");

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 text-muted-foreground"
        aria-label={t("theme")}
      >
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggle}
          className="relative h-9 w-9 text-muted-foreground hover:text-foreground transition-transform active:scale-95"
          aria-label={isDark ? t("light") : t("dark")}
        >
          {/* Sun icon for light mode */}
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-amber-500" />
          {/* Moon icon for dark mode */}
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-blue-400" />
          <span className="sr-only">
            {isDark ? "Switch to Light mode" : "Switch to Dark mode"}
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{isDark ? t("light") : t("dark")}</p>
      </TooltipContent>
    </Tooltip>
  );
}
