"use client";

import { useState } from "react";
import {
  FolderMinus,
  MoreHorizontalIcon,
  Eye,
  XCircle,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
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
import { IOrder } from "@/types/order.type";
import Image from "next/image";
import { useUpdateOrderStatus } from "@/hooks/order/useOrderUpdateStatus";
import { ConfirmDialog } from "@/app/components/common/ConfirmDialog";

interface OrderTableProps {
  orders: IOrder[];
  page: number;
  limit: number;
  onView: (order: IOrder) => void;
}

const statusClasses: Record<string, string> = {
  pending: "bg-yellow-800 text-yellow-100",
  processing: "bg-blue-800 text-blue-100",
  delivered: "bg-green-800 text-green-100",
  cancelled: "bg-red-800 text-red-100",
};

const paymentStatusStyles: Record<string, string> = {
  paid: "bg-green-800 text-green-200 border-green-700 hover:bg-green-800",
  unpaid: "bg-red-800 text-red-200 border-red-700 hover:bg-red-800",
};

export function OrderTable({ orders, page, limit, onView }: OrderTableProps) {
  const { mutate: updateStatus, isPending } = useUpdateOrderStatus();

  // Local state to manage the confirmation dialog
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState<{
    id: string;
    status: string;
  } | null>(null);

  const handleStatusClick = (id: string, status: string) => {
    setPendingUpdate({ id, status });
    setConfirmOpen(true);
  };

  const handleConfirmUpdate = () => {
    if (pendingUpdate) {
      updateStatus(
        { id: pendingUpdate.id, status: pendingUpdate.status },
        {
          onSettled: () => {
            setConfirmOpen(false);
            setPendingUpdate(null);
          },
        },
      );
    }
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-12 text-center text-muted-foreground">
        <FolderMinus className="mb-3 h-10 w-10 stroke-[1.5]" />
        <h3 className="text-lg font-semibold text-foreground">
          No orders found
        </h3>
        <p className="mt-1 max-w-xs text-sm text-muted-foreground">
          Once your customers buy items, orders will show up here.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border bg-card overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[60px] text-center">No</TableHead>
              <TableHead className="w-[140px]">Order ID</TableHead>
              <TableHead className="min-w-[180px]">Customer</TableHead>
              <TableHead className="min-w-[220px]">Items</TableHead>
              <TableHead className="w-[120px]">Total Amount</TableHead>
              <TableHead className="w-[120px]">Payment</TableHead>
              <TableHead className="w-[120px]">Order Status</TableHead>
              <TableHead className="w-[160px]">Order Date</TableHead>
              <TableHead className="w-[80px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order, i) => {
              const totalAmount = order.items.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0,
              );

              return (
                <TableRow
                  key={order._id}
                  className="transition-colors hover:bg-muted/40 cursor-pointer group"
                  onClick={() => onView(order)}
                >
                  {/* Index Number */}
                  <TableCell className="text-center font-medium text-muted-foreground text-xs">
                    {(page - 1) * limit + (i + 1)}
                  </TableCell>

                  {/* Order ID */}
                  <TableCell className="font-mono text-xs font-semibold text-foreground tracking-tight">
                    {order.orderId}
                  </TableCell>

                  {/* Customer Details */}
                  <TableCell>
                    <div className="flex flex-col gap-0.5 max-w-[200px]">
                      <span className="font-medium text-foreground text-sm truncate">
                        {order.shippingAddress?.name || "Guest Customer"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {order.shippingAddress?.phone}
                      </span>
                      <span className="text-xs text-muted-foreground/80 truncate">
                        {order.shippingAddress?.city},{" "}
                        {order.shippingAddress?.address}
                      </span>
                    </div>
                  </TableCell>

                  {/* Purchased Items */}
                  <TableCell>
                    <div className="flex flex-col gap-2 max-w-[240px]">
                      {order.items?.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 group/item"
                        >
                          {item?.image ? (
                            <Image
                              width={300}
                              height={300}
                              src={item?.image}
                              alt={item.name}
                              className="h-8 w-8 rounded border object-cover bg-muted flex-shrink-0 shadow-sm"
                            />
                          ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded border bg-muted text-[10px] text-muted-foreground flex-shrink-0">
                              —
                            </div>
                          )}
                          <div className="flex flex-col min-w-0 leading-tight">
                            <span className="text-xs font-medium text-foreground truncate group-hover/item:text-primary transition-colors">
                              {item.name}
                            </span>
                            <span className="text-[11px] text-muted-foreground">
                              {item.quantity}x •{" "}
                              <span className="font-mono">৳{item.price}</span>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TableCell>

                  {/* Total Cost */}
                  <TableCell className="font-semibold text-foreground whitespace-nowrap">
                    ৳{totalAmount.toLocaleString()}
                  </TableCell>

                  {/* Payment Status Badge */}
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`capitalize font-medium text-xs rounded-md shadow-none px-2.5 py-0.5 border-0 ${
                        paymentStatusStyles[order.paymentStatus] ?? ""
                      }`}
                    >
                      {order.paymentStatus}
                    </Badge>
                  </TableCell>

                  {/* Order Status Badge */}
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`capitalize ${statusClasses[order.status]}`}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>

                  {/* Created Date */}
                  <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                    {order.createdAt ? (
                      convertToDate(order.createdAt)
                    ) : (
                      <span className="text-muted-foreground/40">—</span>
                    )}
                  </TableCell>

                  {/* Actions Dropdown */}
                  <TableCell
                    className="text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-60 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontalIcon className="h-4 w-4" />
                            <span className="sr-only">Open Menu</span>
                          </Button>
                        }
                      ></DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-52">
                        <DropdownMenuItem
                          onClick={() => onView(order)}
                          className="gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Change Status
                          </DropdownMenuSubTrigger>

                          <DropdownMenuSubContent>
                            <DropdownMenuItem
                              disabled={order.status === "pending" || isPending}
                              onClick={() =>
                                handleStatusClick(order._id, "pending")
                              }
                            >
                              Pending
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              disabled={
                                order.status === "processing" || isPending
                              }
                              onClick={() =>
                                handleStatusClick(order._id, "processing")
                              }
                            >
                              Processing
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              disabled={
                                order.status === "delivered" || isPending
                              }
                              onClick={() =>
                                handleStatusClick(order._id, "delivered")
                              }
                            >
                              Delivered
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          disabled={order.status === "cancelled" || isPending}
                          onClick={() =>
                            handleStatusClick(order._id, "cancelled")
                          }
                          className="text-destructive gap-2"
                        >
                          <XCircle className="h-4 w-4" />
                          Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Confirmation Dialog Component */}
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Update Order Status?"
        description={`Are you sure you want to change this order status to "${pendingUpdate?.status}"? This action might trigger automated notifications to the customer.`}
        confirmText="Update Status"
        loading={isPending}
        onConfirm={handleConfirmUpdate}
      />
    </>
  );
}
