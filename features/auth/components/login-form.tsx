"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginInput } from "@/features/auth/schemas";
import { LoginError, useLoginMutation } from "@/features/auth/hooks/use-login";

/** Only allow same-origin relative redirects. */
function safeCallbackUrl(value: string | null, fallback: string) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return fallback;
  return value;
}

export function LoginForm() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: LoginInput) => {
    login.mutate(values, {
      onSuccess: () => {
        toast.success(t("loginSuccess"));
        router.replace(safeCallbackUrl(searchParams.get("callbackUrl"), `/${locale}/dashboard`));
        router.refresh();
      },
    });
  };

  const errorMessage = login.error
    ? login.error instanceof LoginError && login.error.code === "invalid_credentials"
      ? t("invalidCredentials")
      : t("genericError")
    : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {errorMessage && (
        <div
          role="alert"
          className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {errorMessage}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          dir="ltr"
          placeholder={t("emailPlaceholder")}
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && <p className="text-xs text-destructive">{t("validation.email")}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">{t("password")}</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder={t("passwordPlaceholder")}
          aria-invalid={!!errors.password}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xs text-destructive">{t("validation.password")}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={login.isPending}>
        {login.isPending && <Loader2 className="me-2 h-4 w-4 animate-spin" />}
        {login.isPending ? t("signingIn") : t("signIn")}
      </Button>
    </form>
  );
}
