"use client";

import { useMutation } from "@tanstack/react-query";
import type { DemoRequestFormValues } from "../schemas";
import { SUBMIT_DELAY_MS } from "../constants";

/**
 * Static demo-request submission: no network request is made. It mimics the
 * design (short loading state, then success) and keeps the mutation shape, so
 * a real endpoint can be plugged into `mutationFn` later.
 */
export function useCreateDemoRequest() {
  return useMutation<DemoRequestFormValues, Error, DemoRequestFormValues>({
    mutationKey: ["demo-requests", "create"],
    mutationFn: (values) => new Promise((resolve) => setTimeout(() => resolve(values), SUBMIT_DELAY_MS)),
  });
}
