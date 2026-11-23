"use client";

import * as React from "react";
import { useSession, signOut } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { LogIn, LogOut, Settings, User as UserIcon } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function initials(name?: string | null) {
  if (!name) return "?";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function UserMenu() {
  const { data: session, status } = useSession();
  const t = useTranslations("common");
  const tAuth = useTranslations("auth");
  const locale = useLocale();
  const queryClient = useQueryClient();

  if (status === "loading") {
    return <Skeleton className="ms-1 h-9 w-9 rounded-full" />;
  }

  if (!session?.user) {
    return (
      <Button asChild size="sm" className="ms-1 h-9 gap-1.5">
        <Link href="/login">
          <LogIn className="h-4 w-4 rtl:rotate-180" />
          <span>{tAuth("login")}</span>
        </Link>
      </Button>
    );
  }

  const { name, email, image } = session.user;

  const handleSignOut = async () => {
    queryClient.clear();
    await signOut({ callbackUrl: `/${locale}/login` });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative ms-1 h-9 w-9 rounded-full ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label={t("profile")}
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={image ?? ""} alt={name ?? ""} />
            <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
              {initials(name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">{email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <UserIcon className="me-2 h-4 w-4" />
          <span>{t("profile")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="me-2 h-4 w-4" />
          <span>{t("settings")}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-destructive focus:text-destructive"
          onSelect={handleSignOut}
        >
          <LogOut className="me-2 h-4 w-4" />
          <span>{tAuth("signOut")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
