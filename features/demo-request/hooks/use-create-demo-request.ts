"use client";

import { useMutation } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import type { ApiError } from "@/types/api";
import { demoRequestService } from "../services/demo-request-service";
import type { DemoRequestFormValues } from "../schemas";
import type { DemoRequest } from "../types";

export function useCreateDemoRequest() {
  const locale = useLocale();

  return useMutation<DemoRequest, ApiError, DemoRequestFormValues>({
    mutationKey: ["demo-requests", "create"],
    mutationFn: (values) =>
      demoRequestService.create({
        ...values,
        name: values.name.trim(),
        companyName: values.companyName.trim(),
        email: values.email.trim(),
        phone: values.phone.replace(/[^\d+]/g, ""),
        locale,
      }),
  });
}
