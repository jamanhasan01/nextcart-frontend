import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export const categorySchema = z.object({
  name: z.string().min(2, "Category name is required"),

  slug: z.string().min(1, "Slug is required"),

  parent: z.string().nullable().optional(),

  status: z.enum(["active", "draft"]),

  image: z
    .instanceof(File)
    .optional()
    .refine(
      (file) =>
        !file ||
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type
        ),
      {
        message: "Only JPG, PNG, and WEBP images are allowed",
      }
    )
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      {
        message: "Image must be smaller than 2MB",
      }
    ),
});