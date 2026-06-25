"use client";

import Link from "next/link";
import { FolderMinus, MoreHorizontalIcon } from "lucide-react";

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
import { IProduct } from "@/types/products.type";

interface ProductTableProps {
  products: IProduct[];
  page: number;
  limit: number;
}

export function ProductTable({ products, page, limit }: ProductTableProps) {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-12 text-center text-muted-foreground">
        <FolderMinus className="mb-3 h-10 w-10 stroke-[1.5]" />

        <h3 className="text-lg font-semibold text-foreground">
          No products found
        </h3>

        <p className="mt-1 max-w-xs text-sm">
          Create your first product to start managing inventory.
        </p>
      </div>
    );
  }

  return (
    <Table className="rounded-md border bg-card">
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-16">No</TableHead>
          <TableHead className="w-16">Image</TableHead>

          <TableHead>Product</TableHead>

          <TableHead className="w-36">Product ID</TableHead>

          <TableHead className="w-32">Price</TableHead>

          <TableHead className="w-24 text-center">Stock</TableHead>

          <TableHead className="w-24">Size</TableHead>

          <TableHead className="w-24">Status</TableHead>

          <TableHead className="w-32">Created At</TableHead>

          <TableHead className="w-16 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.map((product, i) => (
          <TableRow
            key={product._id}
            className="transition-colors hover:bg-muted/50"
          >
            <TableCell>{(page - 1) * limit + (i + 1)}</TableCell>
            {/* Product Image */}
            <TableCell>
              {product.thumbnail?.url ? (
                <img
                  src={product.thumbnail.url}
                  alt={product.name}
                  className="h-10 w-10 rounded-md border object-cover bg-muted"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-muted text-xs text-muted-foreground">
                  —
                </div>
              )}
            </TableCell>

            {/* Product Info */}
            <TableCell>
              <div className="flex flex-col gap-0.5">
                <span className="font-medium text-foreground">
                  {product.name}
                </span>

                {product.brand && (
                  <span className="text-xs text-muted-foreground">
                    {product.brand}
                  </span>
                )}

                {typeof product.category === "object" &&
                  product.category?.name && (
                    <span className="text-xs text-primary">
                      {product.category.name}
                    </span>
                  )}
              </div>
            </TableCell>

            {/* Product ID */}
            <TableCell className="font-mono text-xs text-muted-foreground">
              {product.productID}
            </TableCell>

            {/* Price */}
            <TableCell>
              <div className="flex flex-col">
                <span className="font-semibold text-foreground">
                  ৳{Number(product.finalPrice).toLocaleString()}
                </span>

                {product.discount > 0 && (
                  <span className="text-xs text-muted-foreground line-through">
                    ৳{Number(product.price).toLocaleString()}
                  </span>
                )}
              </div>
            </TableCell>

            {/* Stock */}
            <TableCell className="text-center">
              <span
                className={`font-medium ${
                  product.stock <= 5
                    ? "text-red-500"
                    : product.stock <= 20
                      ? "text-yellow-500"
                      : "text-green-600"
                }`}
              >
                {product.stock}
              </span>
            </TableCell>

            <TableCell>
              {product.sizes?.length ? (
                <div className="flex flex-wrap gap-1">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="inline-flex rounded-md border px-2 py-0.5 text-xs font-medium uppercase"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            {/* Status */}
            <TableCell>
              <span
                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${
                  product.status === "active"
                    ? "border-green-500/20 bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                    : product.status === "draft"
                      ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-600"
                      : "border-muted bg-muted text-muted-foreground"
                }`}
              >
                {product.status}
              </span>
            </TableCell>

            {/* Created Date */}
            <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
              {product.createdAt ? (
                convertToDate(product.createdAt)
              ) : (
                <span className="text-muted-foreground/40">—</span>
              )}
            </TableCell>

            {/* Actions */}
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontalIcon className="h-4 w-4" />
                    </Button>
                  }
                ></DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Link href={`/dashboard/products/${product._id}/edit`}>
                      Update Product
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    variant="destructive"
                    className="cursor-pointer"
                  >
                    Delete Product
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
