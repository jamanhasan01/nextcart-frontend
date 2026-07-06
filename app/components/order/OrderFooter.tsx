import { Truck, XCircle } from "lucide-react";

interface OrderFooterProps {
  orderId: string;
  status: string;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    phone: string;
  };
  statusText: string;
  onCancel?: (orderId: string) => void;
}

export function OrderFooter({ orderId, status, shippingAddress, statusText, onCancel }: OrderFooterProps) {
  // Define which statuses are allowed to be cancelled
  const canCancel = ["pending", "processing"].includes(status.toLowerCase());

  return (
    <div className="flex flex-col justify-between gap-6 border-t bg-slate-50 px-6 py-4 md:flex-row md:items-center">
      {/* Shipping details */}
      <div className="text-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
          Shipping Address
        </p>
        <p className="font-medium text-slate-800">{shippingAddress.name}</p>
        <p className="text-slate-600 mt-0.5">
          {shippingAddress.address}, {shippingAddress.city}
        </p>
        <p className="text-slate-500 text-xs mt-0.5">{shippingAddress.phone}</p>
      </div>

      {/* Actions / Status Indicators */}
      <div className="flex flex-wrap items-center gap-3 md:self-center self-start">
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
          <Truck className="h-4 w-4 text-blue-600" />
          <span className="font-medium">{statusText}</span>
        </div>

        {canCancel && onCancel && (
          <button
            onClick={() => onCancel(orderId)}
            className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 shadow-sm transition hover:bg-rose-100 active:bg-rose-200"
          >
            <XCircle className="h-4 w-4" />
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );
}