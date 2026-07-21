"use client";

import Link from "next/link";
import { FolderMinus, MoreHorizontalIcon, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { convertToDate } from "@/lib/date";
import SaleDetailsDialog from "./SaleDetailsDialog";
import { useState } from "react";
import { RefundSaleModal } from "./RefundSaleModal";
import { SelectableProduct } from "./NewSaleForm";

// Use the canonical types everywhere — do NOT redeclare ISale/ISaleItem locally.
// A local, structurally-different copy is how the modal ends up receiving data
// shaped differently than what it (and the API) actually expect.
import { ISale } from "@/types/sales.type";

/* -------------------------------------------------------------------------- */
/*  Interfaces                                                                */
/* -------------------------------------------------------------------------- */

interface SalesTableProps {
  sales: ISale[];
  page: number;
  limit: number;
  products?: SelectableProduct[];
}

/* -------------------------------------------------------------------------- */
/*  Status badge styling — must cover every value in ISale["status"]         */
/* -------------------------------------------------------------------------- */

function StatusBadge({ status }: { status: ISale["status"] }) {
  const styles: Record<ISale["status"], string> = {
    completed:
      "border-green-500/20 bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400",
    partially_refunded:
      "border-yellow-500/20 bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400",
    refunded:
      "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
    void: "border-red-500/20 bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400",
  };

  const label =
    status === "partially_refunded" ? "Partially Refunded" : status;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${styles[status]}`}
    >
      {label}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function SalesTable({
  sales,
  page,
  limit,
  products = [],
}: SalesTableProps) {
  const router = useRouter();

  const [selectedSale, setSelectedSale] = useState<ISale | null>(null);
  const [open, setOpen] = useState(false);

  const [refundSale, setRefundSale] = useState<ISale | null>(null);
  const [refundOpen, setRefundOpen] = useState(false);

  if (!sales || sales.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-12 text-center text-muted-foreground">
        <FolderMinus className="mb-3 h-10 w-10 stroke-[1.5]" />
        <h3 className="text-lg font-semibold text-foreground">
          No sales records found
        </h3>
        <p className="mt-1 max-w-xs text-sm">
          Record your first checkout transaction to see sales logs here.
        </p>
      </div>
    );
  }

  return (
    <>
      <Table className="rounded-md border bg-card">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-16">No</TableHead>
            <TableHead className="w-36">Sale ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="w-24 text-center">Items</TableHead>
            <TableHead className="w-32">Total Amount</TableHead>
            <TableHead className="w-28">Payment</TableHead>
            <TableHead className="w-24">Status</TableHead>
            <TableHead className="w-32">Date</TableHead>
            <TableHead className="w-16 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sales.map((sale, i) => (
            <TableRow
              key={sale._id}
              className="transition-colors hover:bg-muted/50"
            >
              <TableCell>{(page - 1) * limit + (i + 1)}</TableCell>

              <TableCell className="font-mono text-xs font-semibold text-muted-foreground">
                {sale.saleID}
              </TableCell>

              <TableCell>
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-foreground">
                    {sale.customer?.name || "Walk-in Customer"}
                  </span>
                  {sale.customer?.phone && (
                    <span className="text-xs text-muted-foreground font-mono">
                      {sale.customer.phone}
                    </span>
                  )}
                </div>
              </TableCell>

              <TableCell className="text-center font-medium">
                {sale.totalItems}
              </TableCell>

              <TableCell>
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">
                    ৳{Number(sale.totalAmount).toLocaleString()}
                  </span>
                  {sale.discountAmount > 0 && (
                    <span className="text-xs text-green-600">
                      Saved ৳{Number(sale.discountAmount).toLocaleString()}
                    </span>
                  )}
                </div>
              </TableCell>

              <TableCell>
                <span className="capitalize text-sm text-foreground">
                  {sale.paymentMethod.replace("_", " ")}
                </span>
              </TableCell>

              <TableCell>
                <StatusBadge status={sale.status} />
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                {sale.createdAt ? (
                  convertToDate(sale.createdAt)
                ) : (
                  <span className="text-muted-foreground/40">—</span>
                )}
              </TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontalIcon className="h-4 w-4" />
                      </Button>
                    }
                  />

                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedSale(sale);
                        setOpen(true);
                      }}
                    >
                      View Details
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      render={
                        <Link href={`/dashboard/sales/${sale._id}/edit`}>
                          Edit Details
                        </Link>
                      }
                    />

                    {/* A sale can still be refunded further while "partially_refunded" —
                        only fully "refunded" or "void" sales should hide this option. */}
                    {sale.status !== "refunded" &&
                      sale.status !== "void" && (
                        <DropdownMenuItem
                          onClick={() => {
                            setRefundSale(sale);
                            setRefundOpen(true);
                          }}
                        >
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Process Refund
                        </DropdownMenuItem>
                      )}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      variant="destructive"
                      className="cursor-pointer"
                    >
                      Void Transaction
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Details Modal */}
      <SaleDetailsDialog
        sale={selectedSale}
        open={open}
        onOpenChange={setOpen}
      />

      <RefundSaleModal
        isOpen={refundOpen}
        products={products}
        saleData={refundSale}
        onClose={() => {
          setRefundOpen(false);
          setRefundSale(null);
        }}
        onSuccess={() => {
          setRefundOpen(false);
          setRefundSale(null);
          // Refresh server-fetched sales data so the row reflects the new
          // status / refundedQuantity immediately, without a manual reload.
          router.refresh();
        }}
      />
    </>
  );
}