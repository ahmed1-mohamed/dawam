import { z } from "zod";

/**
 * Client-side validation. Messages are translation keys under
 * `landing.demo.fields.<field>.error`; the form translates them.
 */
export const demoRequestSchema = z.object({
  name: z.string().trim().min(2),
  companyName: z.string().trim().min(2),
  phone: z.string().refine((v) => v.replace(/\D/g, "").length >= 8),
  email: z.string().trim().email(),
  companySize: z.enum(["1-20", "21-50", "51-200", "200+"]),
});

export type DemoRequestFormValues = z.infer<typeof demoRequestSchema>;
