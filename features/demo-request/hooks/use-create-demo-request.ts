"use client";

import * as React from "react";
import type { DemoRequestFormValues } from "../schemas";
import { SUBMIT_DELAY_MS } from "../constants";

/**
 * Static demo-request submission: no network request is made. It mimics the
 * design (short loading state, then success). To send real requests later,
 * replace the timeout in `submit` with an API call.
 */
export function useCreateDemoRequest() {
  const [status, setStatus] = React.useState<"idle" | "pending" | "success">("idle");
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const submit = React.useCallback((values: DemoRequestFormValues) => {
    void values;
    setStatus("pending");
    timer.current = setTimeout(() => setStatus("success"), SUBMIT_DELAY_MS);
  }, []);

  return { submit, isPending: status === "pending", isSuccess: status === "success" };
}
