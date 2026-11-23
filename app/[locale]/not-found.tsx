import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FileQuestion, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted text-muted-foreground mb-6">
        <FileQuestion className="h-10 w-10" />
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {t("description")}
      </p>

      <div className="mt-8">
        <Button asChild size="lg" className="gap-2">
          <Link href="/">
            <Home className="h-4 w-4" />
            <span>{t("backHome")}</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
