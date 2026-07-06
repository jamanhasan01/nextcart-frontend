"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, Save, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Spinner } from "@/components/ui/spinner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import DashboardHeader from "../../components/ui/DashboardHeader";

import { useCategories } from "@/hooks/categories/useCategories";
import useCategoryCreate from "@/hooks/categories/useCategoryCreate";
import useCategoryUpdate from "@/hooks/categories/useCategoryUpdate";

import { ICategory } from "@/types/categories.type";
import { categorySchema } from "@/schemas/category.schema";

type CategoryFormData = z.infer<typeof categorySchema>;

export const createCategorySchema = categorySchema.extend({
  image: z.instanceof(File, {
    message: "Category image is required",
  }),
});

export const updateCategorySchema = categorySchema.extend({
  image: z.instanceof(File).optional(),
});
interface CategoryFormProps {
  category?: ICategory;
}

const CategoryForm = ({ category }: CategoryFormProps) => {
  const isEditMode = !!category;
  const schema = isEditMode ? updateCategorySchema : createCategorySchema;

  const { categories, isLoading } = useCategories();

  const { mutateAsync: createCategory, isPending: createPending } =
    useCategoryCreate();

  const { mutateAsync: updateCategory, isPending: updatePending } =
    useCategoryUpdate();

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      slug: "",
      parent: null,
      status: "active",
    },
  });

  useEffect(() => {
    if (!category) return;

    form.reset({
      name: category.name || "",
      slug: category.slug || "",
      parent:
        typeof category.parent === "string"
          ? category.parent
          : category.parent || null,
      status: category.status || "active",
    });

    setImagePreview(category?.image?.url || null);
  }, [category, form]);

  const onSubmit = async (values: CategoryFormData) => {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("slug", values.slug);
      formData.append("status", values.status);

      formData.append("parent", values.parent ?? "");

      if (values.image instanceof File) {
        formData.append("image", values.image);
      }

      let res;

      console.log(formData);

      if (isEditMode && category?._id) {
        res = await updateCategory({
          id: category._id,
          data: formData,
        });

        toast.success(res?.message || "Category updated successfully");
      } else {
        res = await createCategory(formData);

        toast.success(res?.message || "Category created successfully");

        form.reset({
          name: "",
          slug: "",
          parent: null,
          status: "active",
        });

        setImagePreview(null);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  const selectedParentId = form.watch("parent");

  const selectedCategory = categories?.find(
    (cat: ICategory) => cat._id === selectedParentId,
  );

  const loading = createPending || updatePending || isLoading;

  return (
    <div className="space-y-6 text-foreground">
      <DashboardHeader
        title={isEditMode ? "Update Category" : "Create Category"}
        subtitle={
          isEditMode
            ? "Update category information"
            : "Add a new classification tier or sub-category"
        }
        buttonText="Back to Categories"
        buttonLink="/dashboard/categories"
        buttonIcon={<ChevronLeft className="h-4 w-4" />}
      />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-6 rounded-xl border bg-card p-6 shadow-sm md:grid-cols-3"
      >
        <div className="space-y-5 md:col-span-2">
          <div className="space-y-2">
            <Label>Category Name</Label>

            <Input
              value={form.watch("name")}
              onChange={(e) => {
                const value = e.target.value;

                form.setValue("name", value, {
                  shouldValidate: true,
                });

                const slug = value
                  .toLowerCase()
                  .trim()
                  .replace(/[^\w\s-]/g, "")
                  .replace(/[\s_-]+/g, "-")
                  .replace(/^-+|-+$/g, "");

                form.setValue("slug", slug);
              }}
              placeholder="Smart Home Gadgets"
            />

            <p className="text-sm text-red-500">
              {form.formState.errors.name?.message}
            </p>
          </div>

          <div className="space-y-2">
            <Label>Slug</Label>

            <Input
              placeholder="Slug start..."
              readOnly
              value={form.watch("slug")}
            />

            <p className="text-sm text-red-500">
              {form.formState.errors.slug?.message}
            </p>
          </div>

          <div className="space-y-2">
            <Label>Parent Category</Label>

            <Select
              value={selectedParentId ?? "none"}
              onValueChange={(value) =>
                form.setValue("parent", value === "none" ? null : value)
              }
            >
              <SelectTrigger>
                <SelectValue>
                  {selectedParentId
                    ? selectedCategory?.name
                    : "Select Parent Category"}
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="none">None (Top-Level)</SelectItem>

                {categories?.map((cat: ICategory) => (
                  <SelectItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
          <div className="space-y-2">
            <Label>Category Image</Label>

            {imagePreview ? (
              <div className="relative aspect-video overflow-hidden rounded-lg border">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    form.setValue("image", undefined as any);
                  }}
                  className="absolute top-2 right-2 rounded-full bg-destructive p-1"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>
            ) : (
              <label className="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed">
                <Upload className="mb-2 h-5 w-5" />
                <span>Upload Image</span>

                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (!file) return;

                    form.setValue("image", file, {
                      shouldValidate: true,
                    });

                    setImagePreview(URL.createObjectURL(file));
                  }}
                />
              </label>
            )}

            <p className="text-sm text-red-500">
              {form.formState.errors.image?.message}
            </p>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label>Active Status</Label>

              <p className="text-xs text-muted-foreground">
                {form.watch("status") === "active"
                  ? "Visible on storefront"
                  : "Saved as draft"}
              </p>
            </div>

            <Switch
              checked={form.watch("status") === "active"}
              onCheckedChange={(checked) =>
                form.setValue("status", checked ? "active" : "draft")
              }
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t pt-4 md:col-span-3">
          <Button type="button" variant="outline">
            Cancel
          </Button>

          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
                {isEditMode ? "Updating..." : "Saving..."}
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {isEditMode ? "Update Category" : "Save Category"}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
