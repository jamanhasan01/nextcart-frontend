"use client";

import { useMemo } from "react";
import { useFieldArray, useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, Loader2, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreateSaleFormInput,
  CreateSaleFormValues,
  createSaleSchema,
} from "@/schemas/sales.schema";
import { ICreateSalesInput } from "@/types/sales.type";
import { useCreateSale } from "@/hooks/sales/useCreateSale";

export interface SelectableProduct {
  _id: string;
  productID: string;
  name: string;
  finalPrice: number;
  stock?: number;
}

interface NewSaleFormProps {
  products: SelectableProduct[];
  onCreated?: (sale: unknown) => void;
}

export function NewSaleForm({ products, onCreated }: NewSaleFormProps) {
  const { createSale, isCreating } = useCreateSale();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateSaleFormInput, unknown, CreateSaleFormValues>({
    resolver: zodResolver(createSaleSchema),
    defaultValues: {
      items: [{ productId: "", quantity: 1 }],
      paymentMethod: "cash",
      customer: { name: "", phone: "" },
      discountAmount: 0,
      tax: 0,
      notes: "",
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  const productMap = useMemo(
    () => new Map(products?.map((p) => [p._id, p])),
    [products],
  );

  // Watch the whole items array so quantity AND product changes both trigger recalculation
  const watchedItems = useWatch({ control, name: "items" });
  const discountAmount =
    Number(useWatch({ control, name: "discountAmount" })) || 0;
  const tax = Number(useWatch({ control, name: "tax" })) || 0;

  const subtotal = useMemo(() => {
    return (watchedItems ?? []).reduce((sum, item) => {
      const product = productMap.get(item?.productId);
      const quantity = Number(item?.quantity) || 0;
      if (!product) return sum;
      return sum + product.finalPrice * quantity;
    }, 0);
  }, [watchedItems, productMap]);

  const totalAmount = Math.max(0, subtotal - discountAmount + tax);

  const onSubmit = async (values: CreateSaleFormValues) => {
    const payload: ICreateSalesInput = {
      items: values.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      paymentMethod: values.paymentMethod,
      customer:
        values.customer?.name || values.customer?.phone
          ? {
              name: values.customer.name || undefined,
              phone: values.customer.phone || undefined,
            }
          : undefined,
      discountAmount: values.discountAmount ?? 0,
      tax: values.tax ?? 0,
      notes: values.notes || undefined,
    };

    const sale = await createSale(payload);
    onCreated?.(sale);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShoppingCart className="h-5 w-5" />
              New Sale
            </CardTitle>
            <CardDescription>
              Add items, confirm payment, and record the checkout.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* ---------------- Line items ---------------- */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium leading-none">Items</label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ productId: "", quantity: 1 })}
              >
                <Plus className="mr-1 h-4 w-4" />
                Add item
              </Button>
            </div>

            {fields.map((field, index) => {
              const selectedProduct = productMap.get(
                watchedItems?.[index]?.productId ?? "",
              );
              const lineTotal =
                (selectedProduct?.finalPrice ?? 0) *
                (Number(watchedItems?.[index]?.quantity) || 0);

              return (
                <div
                  key={field.id}
                  className="flex items-start gap-2 rounded-lg border p-3"
                >
                  {/* Product Select */}
                  <div className="flex-1 space-y-1">
                    <Controller
                      control={control}
                      name={`items.${index}.productId`}
                      render={({ field: selectField }) => (
                        <Select
                          onValueChange={selectField.onChange}
                          value={selectField.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select product" />
                          </SelectTrigger>
                          <SelectContent>
                            {products?.map((p) => (
                              <SelectItem key={p._id} value={p._id}>
                                {p.name} — ৳{p.finalPrice.toFixed(2)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.items?.[index]?.productId && (
                      <p className="text-xs font-medium text-destructive">
                        {errors.items[index]?.productId?.message}
                      </p>
                    )}
                  </div>

                  {/* Quantity — now Controller-controlled so useWatch always re-renders on change */}
                  <div className="w-24 space-y-1">
                    <Controller
                      control={control}
                      name={`items.${index}.quantity`}
                      render={({ field: qtyField }) => (
                        <Input
                          type="number"
                          min={1}
                          value={
                            (qtyField.value as number | string | undefined) ?? 1
                          }
                          onChange={(e) => {
                            const val = e.target.value;
                            qtyField.onChange(val === "" ? "" : Number(val));
                          }}
                          onBlur={qtyField.onBlur}
                        />
                      )}
                    />
                    {errors.items?.[index]?.quantity && (
                      <p className="text-xs font-medium text-destructive">
                        {errors.items[index]?.quantity?.message}
                      </p>
                    )}
                  </div>

                  <div className="flex h-9 w-24 items-center justify-end text-sm text-muted-foreground">
                    ৳{lineTotal.toFixed(2)}
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={fields.length === 1}
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}

            {errors.items?.root?.message && (
              <p className="text-sm font-medium text-destructive">
                {errors.items.root.message}
              </p>
            )}
          </div>

          <Separator />

          {/* ---------------- Payment + customer ---------------- */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-medium">Payment method</label>
              <Controller
                control={control}
                name="paymentMethod"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="mobile_banking">
                        Mobile banking
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.paymentMethod && (
                <p className="text-xs font-medium text-destructive">
                  {errors.paymentMethod.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Discount</label>
                <Input
                  type="number"
                  min={0}
                  step="0.01"
                  {...register("discountAmount", { valueAsNumber: true })}
                />
                {errors.discountAmount && (
                  <p className="text-xs font-medium text-destructive">
                    {errors.discountAmount.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Tax</label>
                <Input
                  type="number"
                  min={0}
                  step="0.01"
                  {...register("tax", { valueAsNumber: true })}
                />
                {errors.tax && (
                  <p className="text-xs font-medium text-destructive">
                    {errors.tax.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">
                Customer name (optional)
              </label>
              <Input
                placeholder="Walk-in customer"
                {...register("customer.name")}
              />
              {errors.customer?.name && (
                <p className="text-xs font-medium text-destructive">
                  {errors.customer.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">
                Customer phone (optional)
              </label>
              <Input
                placeholder="01XXXXXXXXX"
                {...register("customer.phone")}
              />
              {errors.customer?.phone && (
                <p className="text-xs font-medium text-destructive">
                  {errors.customer.phone.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Notes (optional)</label>
            <Textarea
              placeholder="Anything worth noting about this sale"
              rows={3}
              {...register("notes")}
            />
            {errors.notes && (
              <p className="text-xs font-medium text-destructive">
                {errors.notes.message}
              </p>
            )}
          </div>

          <Separator />

          {/* ---------------- Totals ---------------- */}
          <div className="space-y-1 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>৳{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Discount</span>
              <span>-৳{discountAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax</span>
              <span>+৳{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2 text-base font-semibold">
              <span>Total</span>
              <span>৳{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
            disabled={isCreating}
          >
            Reset
          </Button>
          <Button type="submit" disabled={isCreating}>
            {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Record sale
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
