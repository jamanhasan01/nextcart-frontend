"use client";

import {
  Banknote,
  CalendarDays,
  PackageCheck,
  ReceiptText,
  ShoppingCart,
} from "lucide-react";

import { useSalesStats } from "@/hooks/sales/useSales";

const SalesStats = () => {
  const { stats, isLoading } = useSalesStats();
console.log(stats);

  const statCards = [
    {
      title: "Total Revenue",
      value: `৳${stats?.totalRevenue?.toLocaleString() ?? 0}`,
      description: "Revenue from all completed sales",
      icon: Banknote,
    },
    {
      title: "Total Transactions",
      value: stats?.totalTransactions ?? 0,
      description: "Total number of sales",
      icon: ReceiptText,
    },
    {
      title: "Items Sold",
      value: stats?.totalItemsSold ?? 0,
      description: "Total product units sold",
      icon: PackageCheck,
    },
    {
      title: "Today's Revenue",
      value: `৳${stats?.todayRevenue?.toLocaleString() ?? 0}`,
      description: `${stats?.todayTransactions ?? 0} transactions today`,
      icon: CalendarDays,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-xl border bg-muted/50"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
      {statCards.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>

                <h3 className="text-2xl font-bold tracking-tight">
                  {stat.value}
                </h3>
              </div>

              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              {stat.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default SalesStats;
