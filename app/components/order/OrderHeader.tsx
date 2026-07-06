import { Clock } from "lucide-react";

interface OrderHeaderProps {
  orderId: string;
  createdAt: string;
  paymentStatus: string;
  total: number;
  status: string;
  statusConfig: any;
}

export function OrderHeader({
  orderId,
  createdAt,
  paymentStatus,
  total,
  status,
  statusConfig,
}: OrderHeaderProps) {
  const StatusIcon = statusConfig?.icon ?? Clock;

  return (
    <div className="flex flex-col gap-4 border-b bg-slate-50 px-6 py-4 md:flex-row md:items-center md:justify-between">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:flex md:gap-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Date Placed
          </p>
          <p className="mt-1 text-sm font-medium text-slate-700">
            {new Date(createdAt).toLocaleDateString("en-BD", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Order ID
          </p>
          <p className="mt-1 font-mono text-sm font-medium text-slate-800">
            {orderId}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Payment
          </p>
          <p
            className={`mt-1 text-sm font-semibold capitalize ${paymentStatus === "paid" ? "text-emerald-600" : "text-rose-500"}`}
          >
            {paymentStatus}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total
          </p>
          <p className="mt-1 text-sm font-bold text-slate-900">
            ৳{total.toLocaleString()}
          </p>
        </div>
      </div>

      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium capitalize shadow-sm ${statusConfig?.className || "bg-slate-100 text-slate-700"}`}
      >
        <StatusIcon
          className={`h-3.5 w-3.5 ${status === "processing" ? "animate-spin" : ""}`}
        />
        {statusConfig?.label || status}
      </span>
    </div>
  );
}
