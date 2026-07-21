// sales.schema.ts
import { z } from "zod";

export const createSaleSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().min(1, "Product is required"),
      quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
    }),
  ),

  paymentMethod: z.enum([
    "cash",
    "card",
    "mobile_banking",
    "other",
  ]),

  customer: z
    .object({
      name: z.string().optional(),
      phone: z.string().optional(),
    })
    .optional(),

discountAmount: z.number().min(0).optional(),
  tax: z.coerce.number().min(0).optional(),
  notes: z.string().optional(),
});

export type CreateSaleFormInput = z.input<typeof createSaleSchema>;
export type CreateSaleFormValues = z.output<typeof createSaleSchema>;