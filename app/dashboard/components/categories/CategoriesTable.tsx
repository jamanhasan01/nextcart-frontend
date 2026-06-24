import { MoreHorizontalIcon, FolderMinus } from "lucide-react";
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
import { ICategory } from "@/types/categories.type";
import { convertToDate } from "@/lib/date";
import Link from "next/link";

export function CategoriesTable({ categories }: { categories: ICategory[] }) {
  if (!categories || categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-card text-muted-foreground space-y-3">
        <FolderMinus className="h-10 w-10 stroke-[1.5]" />
        <div className="space-y-1">
          <h3 className="font-semibold text-foreground text-lg">
            No categories found
          </h3>
          <p className="text-sm max-w-xs">
            Create a new category to organize your inventory.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Table className="border rounded-md bg-card">
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-17.5">Image</TableHead>
          <TableHead>Category Name</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead className="text-center w-20">Order</TableHead>
          <TableHead className="w-25">Status</TableHead>
          <TableHead className="w-32.5">Created At</TableHead>
          <TableHead className="text-right w-15">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow
            key={category._id}
            className="transition-colors hover:bg-muted/50"
          >
            {/* Image Thumbnail */}
            <TableCell>
              {category.image?.url ? (
                <img
                  src={category.image.url}
                  alt={category.name}
                  className="w-9 h-9 object-cover rounded-md border bg-muted"
                />
              ) : (
                <div className="w-9 h-9 rounded-md border bg-muted/60 flex items-center justify-center text-[10px] text-muted-foreground font-medium select-none">
                  —
                </div>
              )}
            </TableCell>

            {/* Name & Sub-category Flag */}
            <TableCell className="font-medium text-foreground">
              <div className="flex flex-col gap-0.5">
                <span>{category.name}</span>
                {category.parent && (
                  <span className="text-xs text-muted-foreground font-normal">
                    Sub-category
                  </span>
                )}
              </div>
            </TableCell>

            {/* Mono-spaced Slug */}
            <TableCell className="text-muted-foreground font-mono text-xs tracking-tight">
              {category.slug}
            </TableCell>

            {/* Sort Order Display */}
            <TableCell className="text-center font-medium text-foreground/80">
              {category.order ?? 0}
            </TableCell>

            {/* Semantic Mode-Adaptive Badges */}
            <TableCell>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border transition-colors ${
                  category.status == "active"
                    ? "bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400 dark:bg-green-500/20"
                    : "bg-muted text-muted-foreground border-transparent"
                }`}
              >
                {category.status}
              </span>
            </TableCell>

            {/* Date String Formatting */}
            <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
              {category.createdAt ? (
                convertToDate(category.createdAt)
              ) : (
                <span className="text-muted-foreground/40">—</span>
              )}
            </TableCell>

            {/* Actions Trigger Dropdown Menu */}
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-muted"
                    />
                  }
                >
                  <MoreHorizontalIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">Open menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href={`/dashboard/categories/${category._id}/edit`}>
                      Update Category
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Manage Sub-categories
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    className="cursor-pointer"
                  >
                    Delete Category
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
