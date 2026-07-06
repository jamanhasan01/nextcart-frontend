import { Clock, Loader2, Truck, CheckCircle2, XCircle } from "lucide-react";

export const STATUS_CONFIG: Record<string, { label: string; className: string; icon: any }> = {
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border border-amber-200",
    icon: Clock,
  },
  processing: {
    label: "Processing",
    className: "bg-blue-50 text-blue-700 border border-blue-200",
    icon: Loader2,
  },
  shipped: {
    label: "Shipped",
    className: "bg-indigo-50 text-indigo-700 border border-indigo-200",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    className: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-rose-50 text-rose-700 border border-rose-200",
    icon: XCircle,
  },
};