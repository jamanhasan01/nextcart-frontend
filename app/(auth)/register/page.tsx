"use client";

import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { useRegistration } from "@/hooks/auth/useAuth";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type RegisterPayload = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { mutateAsync, isPending } = useRegistration();

  const form = useForm<RegisterPayload>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterPayload) => {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("password", values.password);

      const res = await mutateAsync(formData);

      if (res.success) {
        toast.success(res.message || "Account created successfully");
        form.reset();
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold text-slate-900">
            Create Account
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Configure your portal credentials in seconds
          </p>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Name */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              Full Name
            </label>

            <Input
              type="text"
              placeholder="John Doe"
              {...form.register("name")}
            />

            {form.formState.errors.name && (
              <p className="mt-1 text-xs text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              Email Address
            </label>

            <Input
              type="email"
              placeholder="john@example.com"
              {...form.register("email")}
            />

            {form.formState.errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              Phone Number
            </label>

            <Input
              type="tel"
              placeholder="+8801XXXXXXXXX"
              {...form.register("phone")}
            />

            {form.formState.errors.phone && (
              <p className="mt-1 text-xs text-red-500">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              Password
            </label>

            <Input
              type="password"
              placeholder="••••••••"
              {...form.register("password")}
            />

            {form.formState.errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-md bg-slate-900 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-600">
          Already registered?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}