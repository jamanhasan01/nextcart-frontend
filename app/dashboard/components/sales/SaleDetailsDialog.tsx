"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  CreditCard, 
  Hash, 
  FileText,
  UserCheck
} from "lucide-react";
import { ISale } from "./SalesTable";
import { convertToDate } from "@/lib/date";

interface Props {
  sale: ISale | null; // Swap 'any' with your updated ISale interface
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SaleDetailsDialog({ sale, open, onOpenChange }: Props) {
  if (!sale) return null;



  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl overflow-hidden p-0 sm:rounded-xl">
        {/* Header Block */}
        <div className="bg-muted/40 p-6 pb-4">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="space-y-1">
              <DialogTitle className="text-xl flex items-center gap-2 font-bold tracking-tight">
                <Hash className="h-4 w-4 text-muted-foreground" />
                {sale.saleID}
              </DialogTitle>
              <DialogDescription className="text-xs">
                Transaction recorded on {convertToDate(sale.createdAt)}
              </DialogDescription>
            </div>
            <Badge 
              variant={sale.status === "completed" ? "default" : "secondary"}
              className="capitalize px-2.5 py-0.5 font-medium tracking-wide"
            >
              {sale.status}
            </Badge>
          </DialogHeader>
        </div>

        <div className="p-6 pt-2 space-y-6">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted/20 p-4 rounded-xl border border-border/50 text-sm">
            {/* Customer Details */}
            <div className="flex items-start gap-3">
              <User className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Customer</p>
                <p className="font-medium text-foreground">{sale.customer?.name || "Walk-in Customer"}</p>
                {sale.customer?.phone && (
                  <p className="text-xs text-muted-foreground mt-0.5">{sale.customer.phone}</p>
                )}
              </div>
            </div>

            {/* Payment Details */}
            <div className="flex items-start gap-3">
              <CreditCard className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Payment details</p>
                <p className="font-medium capitalize text-foreground">{sale.paymentMethod}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{sale.totalItems} item{sale.totalItems !== 1 ? 's' : ''} total</p>
              </div>
            </div>

            {/* Cashier Assignment Info */}
            <div className="flex items-start gap-3 sm:col-span-2 pt-2 border-t border-border/40">
              <UserCheck className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Served By</p>
                <p className="text-xs text-foreground/80 font-medium">
                  {sale.cashier || "System / Self-Checkout"}
                </p>
              </div>
            </div>

            {/* Custom Notes */}
            {sale.notes && (
              <div className="flex items-start gap-3 sm:col-span-2 pt-2 border-t border-border/40">
                <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Notes</p>
                  <p className="text-xs italic text-foreground/70">"{sale.notes}"</p>
                </div>
              </div>
            )}
          </div>

          {/* Line Items Section */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Line Items ({sale.items?.length || 0})
            </h4>
            <div className="rounded-xl border border-border overflow-hidden divide-y divide-border">
              {sale.items?.map((item: any, index: number) => (
                <div
                  key={item.product || index}
                  className="flex items-center justify-between p-3.5 text-sm bg-card hover:bg-muted/10 transition-colors"
                >
                  <div className="space-y-0.5">
                    <p className="font-semibold text-foreground">
                      {item.name || "Unnamed Product"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      SKU: <span className="font-mono">{item.productID || "N/A"}</span>
                    </p>
                  </div>
                  <div className="text-right space-y-0.5">
                    <p className="font-medium text-foreground">
                      ৳{item.subtotal}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.quantity} × ৳{item.unitPrice}
                    </p>
                    {item.refundedQuantity > 0 && (
                      <p className="text-xs text-destructive font-medium">
                        Refunded: {item.refundedQuantity}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-2" />

          {/* Detailed Invoice-style Pricing Breakdown */}
          <div className="flex justify-end">
            <div className="w-full  space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>৳{sale.subtotal}</span>
              </div>
              
              {sale.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount</span>
                  <span>-৳{sale.discountAmount}</span>
                </div>
              )}
              
              {sale.tax > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax</span>
                  <span>+৳{sale.tax}</span>
                </div>
              )}
              
              <Separator className="my-1" />
              
              <div className="flex justify-between items-baseline pt-1">
                <span className="font-semibold text-base text-foreground">Total Paid</span>
                <span className="font-bold text-xl text-primary">৳{sale.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}