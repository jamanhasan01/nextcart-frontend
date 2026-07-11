import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IOrder } from "@/types/order.type";
import { format } from "date-fns";
import { formatBDT } from "@/lib/formatBDT";
import Image from "next/image";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: IOrder | null;
}

export default function OrderDetailsModal({
  open,
  onOpenChange,
  order,
}: Props) {
  if (!order) return null;
  const totalAmount = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const statusClasses: Record<string, string> = {
    pending: "bg-yellow-800 text-yellow-100",

    processing: "bg-blue-800 text-blue-100",

    delivered: "bg-green-800 text-green-100",

    cancelled: "bg-red-800 text-red-100",
  };

  const paymentVariant = () => {
    switch (order.paymentStatus) {
      case "paid":
        return "default";
      case "unpaid":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[60vw] !max-w-7xl h-[90vh] overflow-hidden p-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>Order #{order.orderId}</span>

                <div className="flex gap-2">
                  <Badge
                    variant="outline"
                    className={`capitalize ${statusClasses[order.status]}`}
                  >
                    {order.status}
                  </Badge>

                  <Badge variant={paymentVariant()}>
                    {order.paymentStatus}
                  </Badge>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2  gap-4 mt-6">
              <Card>
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-semibold text-base">
                    Customer Information
                  </h3>

                  <Separator />

                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p>{order.shippingAddress.name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p>{order.shippingAddress.phone}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">City</p>
                    <p>{order.shippingAddress.city}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p>{order.shippingAddress.address}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-semibold text-base">Order Information</h3>

                  <Separator />

                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p>{order.orderId}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p>
                      {format(
                        new Date(order.createdAt),
                        "dd MMM yyyy, hh:mm a",
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Updated</p>
                    <p>
                      {format(
                        new Date(order.updatedAt),
                        "dd MMM yyyy, hh:mm a",
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Ordered Items</h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left py-2">Image</th>
                        <th className="text-left py-2">Product Id</th>
                        <th className="text-center py-2">Price</th>
                        <th className="text-center py-2">Qty</th>
                        <th className="text-right py-2">Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      {order.items.map((item) => (
                        <tr
                          key={item.productId}
                          className="border-b last:border-0"
                        >
                          <td className="py-3">
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
                          </td>
                          <td className="py-3">{item.productId}</td>

                          <td className="text-center">৳{item.price}</td>

                          <td className="text-center">{item.quantity}</td>

                          <td className="text-right font-medium">
                            ৳{item.price * item.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Grand Total</p>

                  <p className="text-2xl font-bold">{formatBDT(totalAmount)}</p>
                </div>

                <div className="text-right space-y-1">
                  <p className="text-sm text-muted-foreground">Total Items</p>

                  <p className="font-semibold">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
