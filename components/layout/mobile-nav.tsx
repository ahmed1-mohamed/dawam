"use client";

import * as React from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  Menu,
  ShieldCheck,
  LayoutDashboard,
  Boxes,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");

  const items = [
    { key: "home", href: "/", label: tCommon("home"), icon: Home },
    { key: "overview", href: "/dashboard", label: tNav("overview"), icon: LayoutDashboard },
    { key: "showcase", href: "/components-showcase", label: tNav("showcase"), icon: Boxes },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-9 w-9 text-muted-foreground"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xs p-4">
        <DialogHeader className="border-b pb-3 text-start">
          <DialogTitle className="flex items-center gap-2 text-base font-bold">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span>{tCommon("appName")}</span>
          </DialogTitle>
        </DialogHeader>
        <nav className="flex flex-col space-y-1.5 py-4">
          {items.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </DialogContent>
    </Dialog>
  );
}
