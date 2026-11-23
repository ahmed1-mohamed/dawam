import * as React from "react";
import { useTranslations } from "next-intl";
import { ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";

export function Footer() {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");

  return (
    <footer className="border-t bg-card text-muted-foreground transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span className="font-semibold text-sm text-foreground">
              {tCommon("appName")}
            </span>
            <span className="text-xs text-muted-foreground">
              — {t("tagline")}
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <Link
              href="/"
              className="transition-colors hover:text-foreground"
            >
              {t("privacy")}
            </Link>
            <Link
              href="/"
              className="transition-colors hover:text-foreground"
            >
              {t("terms")}
            </Link>
            <span>
              &copy; {new Date().getFullYear()} {tCommon("appName")}. {t("rights")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
