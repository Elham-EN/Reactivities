import { z } from "zod";

function requiredString(
  fieldName: string,
  min: number,
  max: number,
): z.ZodString {
  return z
    .string()
    .trim()
    .min(min, { error: `Please enter a ${fieldName}` })
    .max(max, {
      error: `${fieldName} cannot exceed ${max} characters`,
    });
}

export const activitySchema = z.object({
  title: requiredString("Title", 1, 100),
  description: requiredString("Description", 1, 1000),
  category: requiredString("Category", 1, 50),
  date: z
    .date({ error: "Date is required" })
    .refine((date) => date > new Date(), {
      error: "Date must be in the future",
    }),
  city: requiredString("City", 1, 50),
  venue: requiredString("Venue", 1, 100),
});

export type ActivitySchema = z.infer<typeof activitySchema>;
