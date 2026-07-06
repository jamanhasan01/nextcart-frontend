import { z } from "zod";

export const checkoutSchema = z.object({
  shippingAddress: z.object({
    name: z.string().min(2, "Name is required"),

    phone: z
      .string()
      .trim()
      .regex(
        /^(?:\+8801|8801|01)[3-9]\d{8}$/,
        "Please enter a valid Bangladeshi phone number",
      ),

    address: z.string().min(5, "Address is required"),

    city: z.string().min(2, "City is required"),
  }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
