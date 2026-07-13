import React from "react";
import {
  DollarSign,
  ShoppingBag,
  Calendar,
  Clock,
  CheckCircle,
  RefreshCw,
  Truck,
  PackageCheck,
  XCircle,
} from "lucide-react";
import { formatBDT } from "@/lib/formatBDT";

// Define the shape of your API response data
interface OrderStats {
  pending: number;
  confirmed: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  totalRevenue: number;
  totalItemsSold: number;
  todaySales: number;
  monthlySales: number;
}

interface OrderStatsProps {
  stats: OrderStats;
}

export const OrderStatsDashboard: React.FC<OrderStatsProps> = ({ stats }) => {
  return (
    <div className="space-y-8 mb-8  text-gray-900 dark:text-gray-100">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Business Overview
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Real-time performance metrics
        </p>
      </div>

      {/* Financial & Sales Core Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Total Revenue
            </p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-1">
              {formatBDT(stats?.totalRevenue)}
            </h3>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-950/40 rounded-lg text-green-600 dark:text-green-400">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Today's Sales
            </p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-1">
              {formatBDT(stats?.todaySales)}
            </h3>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg text-blue-600 dark:text-blue-400">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Monthly Sales
            </p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-1">
              {formatBDT(stats?.monthlySales)}
            </h3>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-lg text-purple-600 dark:text-purple-400">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Items Sold
            </p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-1">
              {stats?.totalItemsSold}
            </h3>
          </div>
          <div className="p-3 bg-orange-50 dark:bg-orange-950/40 rounded-lg text-orange-600 dark:text-orange-400">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Order Status Tracking Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Order Status Pipeline
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pending */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center justify-center">
            <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-full text-amber-600 dark:text-amber-400 mb-2">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase">
              Pending
            </span>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-1">
              {stats?.pending}
            </span>
          </div>

          {/* Processing */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center justify-center">
            <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded-full text-blue-500 dark:text-blue-400 mb-2 animate-pulse">
              <RefreshCw className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase">
              Processing
            </span>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-1">
              {stats?.processing}
            </span>
          </div>

          {/* Delivered */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center justify-center">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-full text-emerald-600 dark:text-emerald-400 mb-2">
              <PackageCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase">
              Delivered
            </span>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-1">
              {stats?.delivered}
            </span>
          </div>

          {/* Cancelled */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center justify-center">
            <div className="p-2 bg-rose-50 dark:bg-rose-950/40 rounded-full text-rose-600 dark:text-rose-400 mb-2">
              <XCircle className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase">
              Cancelled
            </span>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-1">
              {stats?.cancelled}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
