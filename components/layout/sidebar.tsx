"use client";

import * as React from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  Boxes,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppStore } from "@/store/use-app-store";
import { useDirection } from "@/hooks/use-direction";

const navigationItems = [
  {
    key: "overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    key: "showcase",
    href: "/components-showcase",
    icon: Boxes,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
  const { sidebarCollapsed, toggleSidebar } = useAppStore();
  const { isRtl } = useDirection();

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col border-e bg-card transition-all duration-300 ease-in-out shrink-0 select-none",
        sidebarCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2.5 font-semibold transition-opacity overflow-hidden",
            sidebarCollapsed && "justify-center w-full"
          )}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold shadow-sm">
            <ShieldCheck className="h-5 w-5" />
          </div>
          {!sidebarCollapsed && (
            <span className="truncate text-base font-bold tracking-tight">
              {tCommon("appName")}
            </span>
          )}
        </Link>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          const label = tNav(item.key as "overview" | "showcase");

          if (sidebarCollapsed) {
            return (
              <Tooltip key={item.key}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-md transition-colors mx-auto",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side={isRtl ? "left" : "right"}>
                  {label}
                </TooltipContent>
              </Tooltip>
            );
          }

          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="truncate">{label}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer / Collapse Toggle */}
      <div className="border-t p-3 flex items-center justify-between">
        {!sidebarCollapsed && (
          <div className="text-xs text-muted-foreground px-2">
            v1.0.0
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn("h-8 w-8 text-muted-foreground", sidebarCollapsed && "mx-auto")}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? (
            isRtl ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )
          ) : isRtl ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </aside>
  );
}
