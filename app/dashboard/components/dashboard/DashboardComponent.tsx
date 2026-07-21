"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Store,
  Globe,
  CreditCard,
  AlertTriangle,
  Package,
  Boxes,
  Truck,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
} from "lucide-react";
import { formatBDT } from "@/lib/formatBDT";

// Interface Definitions
interface PaymentMethodStat {
  _id: string;
  revenue: number;
  count: number;
}

interface TopProduct {
  _id: string;
  name: string;
  quantitySold: number;
  revenue: number;
}

interface StoreSales {
  totalRevenue: number;
  totalTransactions: number;
  totalItemsSold: number;
  todayRevenue: number;
  todayTransactions: number;
  byPaymentMethod: PaymentMethodStat[];
  topProducts: TopProduct[];
}

interface OnlineSales {
  pending?: number;
  confirmed?: number;
  processing?: number;
  shipped?: number;
  delivered?: number;
  cancelled?: number;
  totalRevenue?: number;
  totalItemsSold?: number;
  todaySales?: number;
  monthlySales?: number;
}

interface ProductStats {
  activeProducts: number;
  lowStock: number;
  totalInventoryValue: number;
  totalProducts: number;
  totalStock: number;
}

interface DashboardComponentProps {
  storeSales?: StoreSales;
  onlineSales?: OnlineSales;
  productStats?: ProductStats;
}

// Defaults
const defaultStoreSales: StoreSales = {
  totalRevenue: 0,
  totalTransactions: 0,
  totalItemsSold: 0,
  todayRevenue: 0,
  todayTransactions: 0,
  byPaymentMethod: [],
  topProducts: [],
};

const defaultOnlineSales: OnlineSales = {
  pending: 0,
  confirmed: 0,
  processing: 0,
  shipped: 0,
  delivered: 0,
  cancelled: 0,
  totalRevenue: 0,
  totalItemsSold: 0,
  todaySales: 0,
  monthlySales: 0,
};

const defaultProductStats: ProductStats = {
  activeProducts: 0,
  lowStock: 0,
  totalInventoryValue: 0,
  totalProducts: 0,
  totalStock: 0,
};

const DashboardComponent = ({
  storeSales = defaultStoreSales,
  onlineSales = defaultOnlineSales,
  productStats = defaultProductStats,
}: DashboardComponentProps) => {
  const safeStoreSales = { ...defaultStoreSales, ...storeSales };
  const safeOnlineSales = { ...defaultOnlineSales, ...onlineSales };
  const safeProductStats = { ...defaultProductStats, ...productStats };

  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Sales & Analytics
          </h2>
          <p className="text-muted-foreground">
            Overview of retail store performance, online orders, and combined inventory.
          </p>
        </div>
      </div>

      <Tabs defaultValue="store" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="store" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            Store Sales
          </TabsTrigger>
          <TabsTrigger value="online" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Online Orders
          </TabsTrigger>
        </TabsList>

        {/* ================= STORE SALES TAB ================= */}
        <TabsContent value="store" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatBDT(safeStoreSales.totalRevenue ?? 0)}
                </div>
                <p className="text-xs text-muted-foreground">Lifetime store earnings</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatBDT(safeStoreSales.todayRevenue ?? 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {(safeStoreSales.todayTransactions ?? 0).toLocaleString()} transactions today
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(safeStoreSales.totalTransactions ?? 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Completed checkouts</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Items Sold</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(safeStoreSales.totalItemsSold ?? 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Total units moved</p>
              </CardContent>
            </Card>
          </div>

          {/* Shared Product Inventory Metrics for Store */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
                <Boxes className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatBDT(safeProductStats.totalInventoryValue ?? 0)}
                </div>
                <p className="text-xs text-muted-foreground">Combined stock valuation</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(safeProductStats.activeProducts ?? 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Out of {(safeProductStats.totalProducts ?? 0).toLocaleString()} total items
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Stock Units</CardTitle>
                <Boxes className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(safeProductStats.totalStock ?? 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Available across catalog</p>
              </CardContent>
            </Card>
          </div>

          {/* Tables */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Top Products */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
                <CardDescription>Best performing items by units sold.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Qty Sold</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(safeStoreSales.topProducts || []).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground">
                          No product data available
                        </TableCell>
                      </TableRow>
                    ) : (
                      safeStoreSales.topProducts.map((product) => (
                        <TableRow key={product._id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell className="text-right">
                            {(product.quantitySold ?? 0).toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatBDT(product.revenue ?? 0)}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Payment Method Stats */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Revenue distribution across payment types.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Method</TableHead>
                      <TableHead className="text-right">Transactions</TableHead>
                      <TableHead className="text-right">Total Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(safeStoreSales.byPaymentMethod || []).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground">
                          No payment data available
                        </TableCell>
                      </TableRow>
                    ) : (
                      safeStoreSales.byPaymentMethod.map((method) => (
                        <TableRow key={method._id}>
                          <TableCell className="font-medium capitalize">
                            <Badge variant="outline">{method._id}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {(method.count ?? 0).toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatBDT(method.revenue ?? 0)}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ================= ONLINE ORDERS TAB ================= */}
        <TabsContent value="online" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatBDT(safeOnlineSales.todaySales ?? 0)}
                </div>
                <p className="text-xs text-muted-foreground">Online revenue today</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Sales</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatBDT(safeOnlineSales.monthlySales ?? 0)}
                </div>
                <p className="text-xs text-muted-foreground">Current calendar month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Online Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatBDT(safeOnlineSales.totalRevenue ?? 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {(safeOnlineSales.totalItemsSold ?? 0).toLocaleString()} items sold online
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Inventory Valuation</CardTitle>
                <Boxes className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatBDT(safeProductStats.totalInventoryValue ?? 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {(safeProductStats.totalStock ?? 0).toLocaleString()} items in stock
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Fulfillment Status */}
          <Card>
            <CardHeader>
              <CardTitle>Order Fulfillment Status</CardTitle>
              <CardDescription>
                Live snapshot of customer orders across processing stages.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="flex flex-col items-center justify-center p-4 rounded-lg border bg-amber-50/50 dark:bg-amber-950/10 border-amber-200">
                  <Clock className="h-5 w-5 text-amber-600 mb-1" />
                  <span className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                    {safeOnlineSales.pending ?? 0}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">Pending</span>
                </div>

                <div className="flex flex-col items-center justify-center p-4 rounded-lg border bg-blue-50/50 dark:bg-blue-950/10 border-blue-200">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mb-1" />
                  <span className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                    {safeOnlineSales.confirmed ?? 0}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">Confirmed</span>
                </div>

                <div className="flex flex-col items-center justify-center p-4 rounded-lg border bg-indigo-50/50 dark:bg-indigo-950/10 border-indigo-200">
                  <Package className="h-5 w-5 text-indigo-600 mb-1" />
                  <span className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
                    {safeOnlineSales.processing ?? 0}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">Processing</span>
                </div>

                <div className="flex flex-col items-center justify-center p-4 rounded-lg border bg-purple-50/50 dark:bg-purple-950/10 border-purple-200">
                  <Truck className="h-5 w-5 text-purple-600 mb-1" />
                  <span className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                    {safeOnlineSales.shipped ?? 0}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">Shipped</span>
                </div>

                <div className="flex flex-col items-center justify-center p-4 rounded-lg border bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-200">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 mb-1" />
                  <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                    {safeOnlineSales.delivered ?? 0}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">Delivered</span>
                </div>

                <div className="flex flex-col items-center justify-center p-4 rounded-lg border bg-rose-50/50 dark:bg-rose-950/10 border-rose-200">
                  <XCircle className="h-5 w-5 text-rose-600 mb-1" />
                  <span className="text-2xl font-bold text-rose-700 dark:text-rose-400">
                    {safeOnlineSales.cancelled ?? 0}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">Cancelled</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shared Product Inventory Overview */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Catalog Products
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(safeProductStats.activeProducts ?? 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Out of {(safeProductStats.totalProducts ?? 0).toLocaleString()} total catalog items
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Inventory Stock
                </CardTitle>
                <Boxes className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(safeProductStats.totalStock ?? 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Units available across catalog
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Shared Low Stock Alert */}
          {safeProductStats.lowStock > 0 && (
            <Card className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/20">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-500" />
                <div>
                  <CardTitle className="text-amber-800 dark:text-amber-400">
                    Low Stock Attention Needed
                  </CardTitle>
                  <CardDescription className="text-amber-700 dark:text-amber-500">
                    You have{" "}
                    <span className="font-bold">{safeProductStats.lowStock}</span>{" "}
                    products reaching critical inventory levels.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardComponent;