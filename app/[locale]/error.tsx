"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("errorPage");

  useEffect(() => {
    // Log the error to monitoring service
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-6">
        <AlertCircle className="h-8 w-8" />
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {t("title")}
      </h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {t("description")}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button onClick={reset} variant="default" className="gap-2">
          <RotateCcw className="h-4 w-4 rtl:rotate-180" />
          <span>{t("tryAgain")}</span>
        </Button>
        <Button asChild variant="outline">
          <Link href="/" className="gap-2">
            <Home className="h-4 w-4" />
            <span>{t("backHome")}</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
