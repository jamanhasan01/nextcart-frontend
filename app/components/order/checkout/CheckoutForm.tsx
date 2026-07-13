"use client";

import { Save } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { checkoutSchema, CheckoutFormValues } from "@/schemas/checkout.schema";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useOrderCreate from "@/hooks/order/useOrderCreate";

// Define explicit types for your props
interface CheckoutFormProps {
  items: any[];
  isBuyNow: boolean;
}

const CheckoutForm = ({ items, isBuyNow }: CheckoutFormProps) => {
  const { mutateAsync: createOrder, isPending } = useOrderCreate();
  const router = useRouter();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shippingAddress: {
        name: "",
        phone: "",
        address: "",
        city: "",
      },
    },
  });

  const onSubmit = async (values: CheckoutFormValues) => {
    try {
      // 1. Guard check if there are no items to buy
      if (items.length === 0) {
        toast.error("Your checkout has no items.");
        return;
      }

      // 2. Build the payload cleanly using the passed items array
      const payload = {
        items: items.map((item: any) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        shippingAddress: values.shippingAddress,
        isBuyNow, // Pass this flag to the backend in case it needs to handle cart clearance differently
      };

      await createOrder(payload);

      toast.success("Order placed successfully!");
      form.reset();
      router.push("/orders");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 rounded-xl border bg-card p-6 shadow-sm"
    >
      <div>
        <h2 className="text-xl font-semibold">Shipping Address</h2>
        <p className="text-sm text-muted-foreground">
          Enter your delivery information.
        </p>
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label>Name</Label>
        <Input
          placeholder="John Doe"
          {...form.register("shippingAddress.name")}
        />
        {form.formState.errors.shippingAddress?.name?.message && (
          <p className="text-sm text-red-500">
            {form.formState.errors.shippingAddress.name.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label>Phone</Label>
        <Input
          placeholder="+8801XXXXXXXXX"
          {...form.register("shippingAddress.phone")}
        />
        {form.formState.errors.shippingAddress?.phone?.message && (
          <p className="text-sm text-red-500">
            {form.formState.errors.shippingAddress.phone.message}
          </p>
        )}
      </div>

      {/* City */}
      <div className="space-y-2">
        <Label>City</Label>
        <Input placeholder="Dhaka" {...form.register("shippingAddress.city")} />
        {form.formState.errors.shippingAddress?.city?.message && (
          <p className="text-sm text-red-500">
            {form.formState.errors.shippingAddress.city.message}
          </p>
        )}
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label>Address</Label>
        <Input
          placeholder="House, Road, Area"
          {...form.register("shippingAddress.address")}
        />
        {form.formState.errors.shippingAddress?.address?.message && (
          <p className="text-sm text-red-500">
            {form.formState.errors.shippingAddress.address.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Spinner className="mr-2 h-4 w-4" />
            Placing Order...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Place Order
          </>
        )}
      </Button>
    </form>
  );
};

export default CheckoutForm;