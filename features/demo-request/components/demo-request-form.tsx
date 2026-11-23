"use client";

import * as React from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { applyServerFieldErrors, isNetworkError } from "@/lib/api/errors";
import { demoRequestSchema, type DemoRequestFormValues } from "../schemas";
import { useCreateDemoRequest } from "../hooks/use-create-demo-request";
import {
  COMPANY_SIZES,
  COMPANY_SIZE_LABELS,
  DEMO_ANCHOR_ID,
  DEMO_REQUEST_SERVER_FIELDS,
} from "../constants";

type TextField = "name" | "companyName" | "phone" | "email";

const TEXT_FIELDS: Array<{
  name: TextField;
  autoComplete: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  type?: string;
  ltr?: boolean;
}> = [
  { name: "name", autoComplete: "name" },
  { name: "companyName", autoComplete: "organization" },
  { name: "phone", autoComplete: "tel", inputMode: "tel", type: "tel", ltr: true },
  { name: "email", autoComplete: "email", inputMode: "email", type: "email", ltr: true },
];

export function DemoRequestForm() {
  const t = useTranslations("landing.demo");
  const scope = React.useRef<HTMLDivElement>(null);
  const createDemoRequest = useCreateDemoRequest();
  const [formError, setFormError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm<DemoRequestFormValues>({
    resolver: zodResolver(demoRequestSchema),
    defaultValues: { name: "", companyName: "", phone: "", email: "", companySize: "1-20" },
  });

  const companySize = watch("companySize");
  const isDone = createDemoRequest.isSuccess;

  const { contextSafe } = useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.to(".submit .shine", { x: "-120%", duration: 1.4, ease: "power2.inOut", repeat: -1, repeatDelay: 2.4 });
    },
    { scope }
  );

  const shake = contextSafe((fields: string[]) => {
    const targets = fields
      .map((f) => scope.current?.querySelector(`[data-field="${f}"]`))
      .filter(Boolean);
    if (targets.length) gsap.fromTo(targets, { x: -8 }, { x: 0, duration: 0.5, ease: "elastic.out(1,.3)" });
  });

  // Success state entrance
  useGSAP(
    () => {
      if (!isDone || prefersReducedMotion()) return;
      gsap.from(".done > *", { y: 16, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" });
      gsap.from(".done .ok", { scale: 0.3, duration: 0.7, ease: "back.out(2.4)" });
    },
    { scope, dependencies: [isDone] }
  );

  const onValid = (values: DemoRequestFormValues) => {
    setFormError(null);
    createDemoRequest.mutate(values, {
      onError: (error) => {
        if (isNetworkError(error)) {
          setFormError(t("errors.network"));
          return;
        }
        const applied = applyServerFieldErrors(error, setError, DEMO_REQUEST_SERVER_FIELDS);
        if (applied) {
          shake(Object.keys(error.errors ?? {}).map((k) => DEMO_REQUEST_SERVER_FIELDS[k]).filter(Boolean));
        }
        // Backend message is already localized through Accept-Language
        const message = error.message || t("errors.generic");
        if (!applied) setFormError(message);
        toast.error(message);
      },
    });
  };

  const onInvalid = (fieldErrors: FieldErrors<DemoRequestFormValues>) => shake(Object.keys(fieldErrors));

  const errorFor = (field: TextField) => {
    const error = errors[field];
    if (!error) return null;
    return error.type === "server" && error.message ? error.message : t(`fields.${field}.error`);
  };

  return (
    <div className="form-wrap" id={DEMO_ANCHOR_ID} ref={scope}>
      <div className="browser" data-hero-browser="">
        <div className="b-bar">
          <div className="b-dots">
            <i />
            <i />
            <i />
          </div>
          <div className="b-sp" />
        </div>

        <form className="form" onSubmit={handleSubmit(onValid, onInvalid)} noValidate>
          {isDone ? (
            <div className="done" role="status">
              <div className="ok">
                <Check strokeWidth={2.4} />
              </div>
              <h3>{t("success.title")}</h3>
              <p>{t("success.body")}</p>
            </div>
          ) : (
            <div>
              <h2>{t("title")}</h2>
              <p className="sub">{t("subtitle")}</p>

              <div className="fields">
                {TEXT_FIELDS.map((field) => {
                  const error = errorFor(field.name);
                  const id = `demo-${field.name}`;
                  return (
                    <div key={field.name} className={`f${error ? " err" : ""}`} data-field={field.name}>
                      <label htmlFor={id}>{t(`fields.${field.name}.label`)}</label>
                      <input
                        id={id}
                        className={`in${field.ltr ? " ltr" : ""}`}
                        type={field.type ?? "text"}
                        inputMode={field.inputMode}
                        autoComplete={field.autoComplete}
                        placeholder={t(`fields.${field.name}.placeholder`)}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${id}-error` : undefined}
                        dir={field.ltr ? "ltr" : undefined}
                        {...register(field.name)}
                      />
                      {error && <small id={`${id}-error`}>{error}</small>}
                    </div>
                  );
                })}

                <div className="f full" data-field="companySize">
                  <span className="lbl" id="demo-size-label">
                    {t("fields.companySize.label")}
                  </span>
                  <div className="seg" role="group" aria-labelledby="demo-size-label">
                    {COMPANY_SIZES.map((size) => (
                      <button
                        key={size}
                        type="button"
                        aria-pressed={companySize === size}
                        onClick={(e) => {
                          setValue("companySize", size, { shouldValidate: true });
                          if (!prefersReducedMotion())
                            gsap.fromTo(e.currentTarget, { scale: 0.94 }, { scale: 1, duration: 0.4, ease: "back.out(3)" });
                        }}
                      >
                        {COMPANY_SIZE_LABELS[size]}
                      </button>
                    ))}
                  </div>
                  {errors.companySize && <small>{errors.companySize.message ?? t("errors.generic")}</small>}
                </div>

                {formError && (
                  <div className="form-alert" role="alert">
                    {formError}
                  </div>
                )}

                <button type="submit" className="submit" disabled={createDemoRequest.isPending}>
                  <span className="shine" />
                  {createDemoRequest.isPending && <span className="spin" aria-hidden="true" />}
                  <span>{createDemoRequest.isPending ? t("submitting") : t("submit")}</span>
                </button>
                <p className="fine">{t("fine")}</p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
