"use client";

import { useMemo, useEffect } from "react";
import { RefreshCw, Loader2 } from "lucide-react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import { IRefundSalesInput, ISale } from "@/types/sales.type";

import { SelectableProduct } from "./NewSaleForm";
import useRefundSale from "@/hooks/sales/useRefundSale";

interface RefundSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: SelectableProduct[];
  saleData: ISale | null;
  onSuccess?: (data: unknown) => void;
}

const refundFormSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().min(1, "Missing product reference"),
      quantity: z.coerce.number().min(0),
    }),
  ),
  notes: z.string().optional(),
});

type RefundFormInput = z.input<typeof refundFormSchema>;
type RefundFormValues = z.output<typeof refundFormSchema>;
export function RefundSaleModal({
  isOpen,
  onClose,
  products,
  saleData,
  onSuccess,
}: RefundSaleModalProps) {
  const { refundSale, isRefunding } = useRefundSale();

  const {
    control,
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<RefundFormInput, any, RefundFormValues>({
    resolver: zodResolver(refundFormSchema),
    defaultValues: { items: [], notes: "" },
  });

  const { fields } = useFieldArray<RefundFormInput>({ control, name: "items" });

  const productMap = useMemo(
    () => new Map(products?.map((p) => [p._id, p])),
    [products],
  );

  useEffect(() => {
    if (saleData && saleData.items) {
      reset({
        items: saleData.items.map((item) => ({
          productId: item.product,
          // Initialize quantity to 0 so clerks increment explicitly
          quantity: 0,
        })),
        notes: "",
      });
    }
  }, [saleData, reset]);

  const watchedItems = useWatch({ control, name: "items" });

  // Dynamic calculations with an active fallback to historical sale data prices
  const subtotal = useMemo(() => {
    return (watchedItems ?? []).reduce((sum, item, index) => {
      const product = productMap.get(item?.productId ?? "");
      const originalItem = saleData?.items[index];

      // Fallback architecture to recover original sale unit price if catalog sync slips
      const unitPrice = product?.finalPrice ?? originalItem?.unitPrice ?? 0;
      const quantity = Number(item?.quantity) || 0;

      return sum + unitPrice * quantity;
    }, 0);
  }, [watchedItems, productMap, saleData]);

  const onSubmit = async (values: RefundFormValues) => {
    if (!saleData?._id) return;

    const itemsToRefund = values.items.filter(
      (item) => (Number(item.quantity) || 0) > 0,
    );

    if (itemsToRefund.length === 0) {
      setError("items", {
        type: "manual",
        message: "Select at least one item quantity to refund",
      });
      return;
    }

    const refundPayload: IRefundSalesInput = {
      items: itemsToRefund.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      reason: values.notes || "Items returned by customer",
    };

    try {
      const result = await refundSale({
        id: saleData._id,
        data: refundPayload,
      });
      onSuccess?.(result);
      onClose();
    } catch (error) {
      console.error("Refund configuration error:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-destructive" />
            Process Return & Refund
          </DialogTitle>
          <DialogDescription>
            Specify item quantities to execute a partial or total transaction
            reversal.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          {/* --- Items Section --- */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Returned Items & Quantities
            </label>

            <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
              {fields.map((field, index) => {
                const originalItem = saleData?.items[index];
                const selectedProduct = productMap.get(
                  watchedItems?.[index]?.productId ?? "",
                );

                const maxRefundable = originalItem
                  ? Math.max(
                      0,
                      originalItem.quantity -
                        (originalItem.refundedQuantity ?? 0),
                    )
                  : 0;

                // Robust layout variable mapping
                const unitPrice =
                  selectedProduct?.finalPrice ?? originalItem?.unitPrice ?? 0;
                const lineTotal =
                  unitPrice * (Number(watchedItems?.[index]?.quantity) || 0);
                const isFullyRefunded = maxRefundable === 0;

                return (
                  <div
                    key={field.id}
                    className="flex items-center gap-3 rounded-md border p-2 bg-muted/30"
                  >
                    <div className="flex-1 text-sm font-medium">
                      {originalItem?.name || "Unknown Product"}
                      <div className="text-xs text-muted-foreground">
                        Max Returnable: {maxRefundable} | Unit Price: ৳
                        {unitPrice.toFixed(2)}
                      </div>
                      {isFullyRefunded && (
                        <div className="text-xs text-amber-600 font-normal">
                          Already fully refunded
                        </div>
                      )}
                    </div>

                    {/* Quantity Selector */}
                    <div className="w-28">
                      <Controller
                        control={control}
                        name={`items.${index}.quantity`}
                        render={({ field: qtyField }) => (
                          <Input
                            type="number"
                            min={0}
                            max={maxRefundable}
                            disabled={isFullyRefunded}
                            className="h-8 text-center"
                            value={Number(qtyField.value ?? 0)}
                            onChange={(e) => {
                              const val = Math.min(
                                maxRefundable,
                                Math.max(0, Number(e.target.value) || 0),
                              );
                              qtyField.onChange(val);
                            }}
                          />
                        )}
                      />
                    </div>

                    <div className="w-24 text-right text-sm font-semibold">
                      ৳{lineTotal.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>

            {errors.items?.message && (
              <p className="text-xs font-medium text-destructive mt-1">
                {errors.items.message}
              </p>
            )}
          </div>

          <Separator />

          {/* --- Meta Information --- */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="block text-xs text-muted-foreground">
                Original Customer
              </span>
              <p className="font-medium">
                {saleData?.customer?.name || "Walk-in Customer"}
              </p>
            </div>
            <div>
              <span className="block text-xs text-muted-foreground">
                Original Payment Method
              </span>
              <p className="font-medium capitalize">
                {saleData?.paymentMethod?.replace("_", " ") ?? "—"}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-destructive">
              Reason for Refund
            </label>
            <Textarea
              placeholder="Provide context for the return ledger..."
              rows={2}
              {...register("notes")}
            />
          </div>

          <Separator />

          {/* --- Estimates --- */}
          <div className="flex justify-between items-center bg-destructive/5 p-3 rounded-lg border border-destructive/10">
            <div>
              <span className="text-xs font-medium text-muted-foreground block">
                Items Return Subtotal
              </span>
              <span className="text-xs text-muted-foreground italic">
                (Excluding dynamic tax adjustments)
              </span>
            </div>
            <span className="text-lg font-bold text-destructive">
              ৳{subtotal.toFixed(2)}
            </span>
          </div>

          {/* --- Form Control Elements --- */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isRefunding}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="destructive"
              disabled={isRefunding || subtotal === 0}
            >
              {isRefunding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm Refund
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
