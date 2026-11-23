"use client";

import * as React from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { DEMO_REQUEST_RULES, type DemoRequestFormValues } from "../schemas";
import { useCreateDemoRequest } from "../hooks/use-create-demo-request";
import { COMPANY_SIZES, COMPANY_SIZE_LABELS, DEMO_ANCHOR_ID } from "../constants";

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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DemoRequestFormValues>({
    defaultValues: { name: "", companyName: "", phone: "", email: "", companySize: "1-20" },
  });

  const companySize = watch("companySize");
  const isDone = createDemoRequest.isSuccess;

  // All form effects are CSS (landing.css): button shine, success entrance, size "pop", and this shake.
  const shake = (fields: string[]) => {
    fields.forEach((f) => {
      const el = scope.current?.querySelector<HTMLElement>(`[data-field="${f}"]`);
      if (!el) return;
      el.classList.remove("shake");
      void el.offsetWidth; // restart the animation if it is already running
      el.classList.add("shake");
      el.addEventListener("animationend", () => el.classList.remove("shake"), { once: true });
    });
  };

  const onValid = (values: DemoRequestFormValues) => createDemoRequest.submit(values);

  const onInvalid = (fieldErrors: FieldErrors<DemoRequestFormValues>) => shake(Object.keys(fieldErrors));

  const errorFor = (field: TextField) => (errors[field] ? t(`fields.${field}.error`) : null);

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
                        {...register(field.name, DEMO_REQUEST_RULES[field.name])}
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
                        onClick={() => setValue("companySize", size, { shouldValidate: true })}
                      >
                        {COMPANY_SIZE_LABELS[size]}
                      </button>
                    ))}
                  </div>
                </div>

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
