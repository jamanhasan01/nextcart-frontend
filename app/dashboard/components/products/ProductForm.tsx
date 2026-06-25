"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, Save, Upload, X, Plus, Tag } from "lucide-react";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import DashboardHeader from "../../components/ui/DashboardHeader";

import { useCategories } from "@/hooks/categories/useCategories";
import { IProduct } from "@/types/products.type";
import useProductCreate from "@/hooks/products/useProductCreate";
import useProductUpdate from "@/hooks/products/useProductUpdate";
const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),

  category: z.string().min(1, "Category is required"),

  brand: z.string().optional(),

  price: z
    .number({
      message: "Price is required",
    })
    .min(0, "Price cannot be negative"),

  discount: z
    .number({
      message: "Discount is required",
    })
    .min(0, "Discount cannot be less than 0")
    .max(100, "Discount cannot exceed 100%"),

  description: z.string().min(10, "Description must be at least 10 characters"),

  stock: z
    .number({
      message: "Stock is required",
    })
    .min(0, "Stock cannot be negative"),

  size: z
    .array(
      z.enum(["m", "l", "xl"], {
        message: "Please select a valid size",
      }),
    )
    .optional(),
  isTrending: z.boolean(),

  isFlashDeal: z.boolean(),

  isCombo: z.boolean(),

  tags: z.array(z.string()),

  status: z.enum(["active", "inactive", "draft", "archived"], {
    message: "Please select a valid status",
  }),

  images: z.array(z.instanceof(File)).default([]),
});

type ProductFormData = z.input<typeof productSchema>;

interface ProductFormProps {
  product?: IProduct;
}

const ProductForm = ({ product }: ProductFormProps) => {
  const isEditMode = !!product;
  const [tagInput, setTagInput] = useState("");
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const { categories, isLoading: categoriesLoading } = useCategories();
  const { mutateAsync: createProduct, isPending: createPending } =
    useProductCreate();
  const { mutateAsync: updateProduct, isPending: updatePending } =
    useProductUpdate();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      category: product?.category.name || "",
      brand: product?.brand || "",
      price: product?.price || 0,
      discount: product?.discount || 0,
      description: product?.description || "",
      stock: product?.stock || 0,
      size: product?.sizes || undefined,
      isTrending: product?.isTrending || false,
      isFlashDeal: product?.isFlashDeal || false,
      isCombo: product?.isCombo || false,
      tags: product?.tags || [],
      status: product?.status || "draft",
      images: [] as File[],
    },
  });

  useEffect(() => {
    if (!product) return;

    setImagePreviews(product.images?.map((img) => img.url) || []);
  }, [product, form]);

  const watchPrice = form.watch("price") || 0;
  const watchDiscount = form.watch("discount") || 0;
  const finalPrice = watchPrice - (watchPrice * watchDiscount) / 100;

  const onSubmit: SubmitHandler<ProductFormData> = async (
    values: ProductFormData,
  ) => {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("category", values.category);
      formData.append("description", values.description);
      formData.append("price", values.price.toString());
      formData.append("discount", values.discount.toString());
      formData.append("stock", values.stock.toString());
      formData.append("status", values.status);

      if (values.brand) formData.append("brand", values.brand);
      if (values.size?.length) {
        values.size.forEach((size) => {
          formData.append("size[]", size);
        });
      }
      if (values.isTrending) formData.append("isTrending", "true");
      if (values.isFlashDeal) formData.append("isFlashDeal", "true");
      if (values.isCombo) formData.append("isCombo", "true");

      values.tags.forEach((tag) => formData.append("tags[]", tag));

      if (!isEditMode && (!values.images || values.images.length === 0)) {
        form.setError("images", {
          type: "manual",
          message: "At least one product image is required",
        });
        return;
      }

      values.images?.forEach((img) => {
        formData.append("images", img);
      });

      let res;

      if (isEditMode && product?._id) {
        res = await updateProduct({
          id: product._id,
          data: formData,
        });
        toast.success(res?.message || "Product updated successfully");
      } else {
        res = await createProduct(formData);
        toast.success(res?.message || "Product created successfully");

        form.reset({
          name: "",
          category: "",
          brand: "",
          price: 0,
          discount: 0,
          description: "",
          stock: 0,
          size: [],
          isTrending: false,
          isFlashDeal: false,
          isCombo: false,
          tags: [],
          status: "draft",
          images: [],
        });

        setImagePreviews([]);

        setTagInput("");
        if (imageInputRef.current) {
          imageInputRef.current.value = "";
        }
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !form.watch("tags").includes(trimmed)) {
      form.setValue("tags", [...form.watch("tags"), trimmed]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    console.log({ tag });

    form.setValue(
      "tags",
      form.watch("tags").filter((t) => t !== tag),
    );
  };

  const loading = createPending || updatePending || categoriesLoading;

  return (
    <div className="space-y-6 text-foreground">
      <DashboardHeader
        title={isEditMode ? "Update Product" : "Create Product"}
        subtitle={
          isEditMode
            ? "Update product information"
            : "Add a new product to your inventory"
        }
        buttonText="Back to Products"
        buttonLink="/dashboard/products"
        buttonIcon={<ChevronLeft className="h-4 w-4" />}
      />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-6 rounded-xl border bg-card p-6 shadow-sm lg:grid-cols-3"
      >
        {/* Main Content */}
        <div className="space-y-5 lg:col-span-2">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Basic Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Product Name</Label>
                <Input
                  {...form.register("name")}
                  placeholder="Enter product name"
                  className={form.formState.errors.name ? "border-red-500" : ""}
                />
                <p className="text-sm text-red-500">
                  {form.formState.errors.name?.message}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={form.watch("category") || "none"}
                  onValueChange={(value) =>
                    form.setValue("category", value === null ? "" : value)
                  }
                >
                  <SelectTrigger
                    className={
                      form.formState.errors.category
                        ? "border-red-500 w-full"
                        : "w-full"
                    }
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Select Category</SelectItem>
                    {categories?.map((cat: any) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-red-500">
                  {form.formState.errors.category?.message}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Brand</Label>
                <Input
                  {...form.register("brand")}
                  placeholder="Enter brand name"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="space-y-4">
            <h3 className="font-semibold">Pricing & Inventory</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Price (৳)</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...form.register("price", { valueAsNumber: true })}
                  className={
                    form.formState.errors.price ? "border-red-500" : ""
                  }
                />
                <p className="text-sm text-red-500">
                  {form.formState.errors.price?.message}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Discount (%)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  {...form.register("discount", { valueAsNumber: true })}
                  className={
                    form.formState.errors.discount ? "border-red-500" : ""
                  }
                />
                <p className="text-sm text-red-500">
                  {form.formState.errors.discount?.message}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Stock</Label>
                <Input
                  type="number"
                  placeholder="0"
                  {...form.register("stock", { valueAsNumber: true })}
                  className={
                    form.formState.errors.stock ? "border-red-500" : ""
                  }
                />
                <p className="text-sm text-red-500">
                  {form.formState.errors.stock?.message}
                </p>
              </div>
            </div>

            {watchPrice > 0 && (
              <div className="mt-2 p-3 bg-primary/5 rounded-lg flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Final Price
                </span>
                <span className="text-lg font-bold text-primary">
                  (৳) {finalPrice.toFixed(2)}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              {...form.register("description")}
              placeholder="Enter product description"
              className={`min-h-30 ${form.formState.errors.description ? "border-red-500" : ""}`}
            />
            <p className="text-sm text-red-500">
              {form.formState.errors.description?.message}
            </p>
          </div>
        </div>
        {/* Sidebar */}
        <div className="space-y-5 border-t pt-5 lg:border-t-0 lg:pl-6 lg:pt-0">
          {/* Images */}
          <div className="space-y-2">
            <Label>Product Images</Label>
            <div className="grid grid-cols-2 gap-2">
              {imagePreviews.map((preview, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-lg border"
                >
                  <img
                    src={preview}
                    alt={`Product ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreviews(
                        imagePreviews.filter((_, i) => i !== index),
                      );
                      const currentImages = form.watch("images") || [];
                      form.setValue(
                        "images",
                        currentImages.filter((_, i) => i !== index),
                      );
                    }}
                    className="absolute top-1 right-1 rounded-full bg-destructive p-1"
                  >
                    <X className="h-3 w-3 text-white" />
                  </button>
                </div>
              ))}
              <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed">
                <Upload className="mb-1 h-4 w-4" />
                <span className="text-xs">Add Image</span>
                <input
                  ref={imageInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);

                    if (!files.length) return;

                    const existingImages = form.getValues("images") || [];

                    form.setValue("images", [...existingImages, ...files], {
                      shouldValidate: true,
                    });

                    const newPreviews = files.map((file) =>
                      URL.createObjectURL(file),
                    );

                    setImagePreviews((prev) => [...prev, ...newPreviews]);

                    e.target.value = "";
                  }}
                />
              </label>
            </div>
            <p className="text-sm text-red-500">
              {form.formState.errors.images?.message}
            </p>
          </div>

          {/* Size */}
          <div className="space-y-2">
            <Label>Sizes</Label>

            <div className="flex gap-2 flex-wrap">
              {["m", "l", "xl"].map((size) => {
                const selectedSizes = form.watch("size") || [];

                const checked = selectedSizes.includes(
                  size as "m" | "l" | "xl",
                );

                return (
                  <Button
                    key={size}
                    type="button"
                    variant={checked ? "default" : "outline"}
                    onClick={() => {
                      if (checked) {
                        form.setValue(
                          "size",
                          selectedSizes.filter((s) => s !== size),
                        );
                      } else {
                        form.setValue("size", [
                          ...selectedSizes,
                          size as "m" | "l" | "xl",
                        ]);
                      }
                    }}
                  >
                    {size.toUpperCase()}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
              />
              <Button
                type="button"
                onClick={addTag}
                size="sm"
                variant="outline"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {form.watch("tags").map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1"
                  >
                    <X className="h-3 w-3 cursor-pointer hover:text-destructive" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-semibold">Features</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <Label>Trending</Label>
                  <p className="text-xs text-muted-foreground">
                    Featured product
                  </p>
                </div>
                <Switch
                  checked={form.watch("isTrending")}
                  onCheckedChange={(checked) =>
                    form.setValue("isTrending", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <Label>Flash Deal</Label>
                  <p className="text-xs text-muted-foreground">
                    Limited time offer
                  </p>
                </div>
                <Switch
                  checked={form.watch("isFlashDeal")}
                  onCheckedChange={(checked) =>
                    form.setValue("isFlashDeal", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <Label>Combo</Label>
                  <p className="text-xs text-muted-foreground">
                    Bundle with others
                  </p>
                </div>
                <Switch
                  checked={form.watch("isCombo")}
                  onCheckedChange={(checked) =>
                    form.setValue("isCombo", checked)
                  }
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label>Status</Label>
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

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t pt-4 lg:col-span-3">
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
                {isEditMode ? "Update Product" : "Save Product"}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
