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
  location: z.object({
    venue: requiredString("Venue", 1, 100),
    // since the autocomplete will populate it from the place selection
    city: z.string().optional(),
    latitude: z
      .number()
      .refine((val) => val !== 0, { error: "Please select a valid location" })
      .refine((val) => val >= -90 && val <= 90, {
        error: "Latitude must be between -90 and 90",
      })
      .optional(),
    longitude: z
      .number()
      .refine((val) => val !== 0, { error: "Please select a valid location" })
      .refine((val) => val >= -180 && val <= 180, {
        error: "Longitude must be between -180 and 180",
      })
      .optional(),
  }),
});

export type ActivitySchema = z.infer<typeof activitySchema>;

export const activityDefaultValues: Partial<ActivitySchema> = {
  title: "",
  description: "",
  category: "",
  location: {
    venue: "",
  },
};
