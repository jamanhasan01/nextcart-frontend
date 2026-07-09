"use client";

import { Save } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { checkoutSchema, CheckoutFormValues } from "@/schemas/checkout.schema";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useOrderCreate from "@/hooks/order/useOrderCreate";
import { useCart } from "@/hooks/cart/userCart";
import { ICartItem } from "@/types/cart";
import { useRouter } from "next/navigation";


const CheckoutForm = () => {
  const { mutateAsync: createOrder, isPending } = useOrderCreate();
  const router=useRouter()
  const { data } = useCart();
  const items = data?.items || [];
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
      const payload = {
        items: items.map((item: ICartItem) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        shippingAddress: values.shippingAddress,
      };

      await createOrder(payload);

      toast.success("Order placed successfully!");
      form.reset()
      router.push('/orders')
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

        <p className="text-sm text-red-500">
          {form.formState.errors.shippingAddress?.name?.message}
        </p>
      </div>

      {/* Phone */}

      <div className="space-y-2">
        <Label>Phone</Label>

        <Input
          placeholder="+8801XXXXXXXXX"
          {...form.register("shippingAddress.phone")}
        />

        <p className="text-sm text-red-500">
          {form.formState.errors.shippingAddress?.phone?.message}
        </p>
      </div>

      {/* City */}

      <div className="space-y-2">
        <Label>City</Label>

        <Input placeholder="Dhaka" {...form.register("shippingAddress.city")} />

        <p className="text-sm text-red-500">
          {form.formState.errors.shippingAddress?.city?.message}
        </p>
      </div>

      {/* Address */}

      <div className="space-y-2">
        <Label>Address</Label>

        <Input
          placeholder="House, Road, Area"
          {...form.register("shippingAddress.address")}
        />

        <p className="text-sm text-red-500">
          {form.formState.errors.shippingAddress?.address?.message}
        </p>
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
