"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useLocaleToggle } from "@/hooks/use-locale-toggle";

/** Icon-only language switcher (en ⇄ ar). Direction switches with the locale. */
export function LanguageSwitcher() {
  const t = useTranslations("common");
  const { nextLocale, nextLabel, toggle, isPending } = useLocaleToggle();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          disabled={isPending}
          className="relative h-9 w-9 text-muted-foreground transition-transform hover:text-foreground active:scale-95"
          aria-label={`${t("language")}: ${nextLabel}`}
        >
          <Languages className="h-4 w-4" />
          {/* Badge drawn via ::after so it isn't part of the button's visible label */}
          <span
            aria-hidden="true"
            data-loc={nextLocale}
            className="absolute -bottom-0.5 -end-0.5 rounded bg-primary px-1 font-mono text-[9px] font-semibold uppercase leading-[14px] text-primary-foreground after:content-[attr(data-loc)]"
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p lang={nextLocale}>{nextLabel}</p>
      </TooltipContent>
    </Tooltip>
  );
}
