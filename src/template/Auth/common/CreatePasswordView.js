"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import FormField from "./FormField";
import FormButton from "./FormButton";
import { useRouter, useSearchParams } from "next/navigation";
import { completeRegistration, resetPassword, tokenStorage } from "@/api/auth";

const passwordSchema = z
  .object({
    password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
    confirmPassword: z.string().min(1, "تکرار رمز عبور را وارد کنید"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن یکسان نیستند",
    path: ["confirmPassword"],
  });

const FIELDS = [
  {
    name: "password",
    label: "رمز عبور جدید",
    type: "password",
    placeholder: "رمز عبور خود را وارد کنید",
    dir: "ltr",
    required: true,
  },
  {
    name: "confirmPassword",
    label: "تکرار رمز عبور جدید",
    type: "password",
    placeholder: "تکرار رمز عبور را وارد کنید",
    dir: "ltr",
    required: true,
    mt: true,
  },
];

export default function CreatePasswordView({ onSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const flow = searchParams.get("flow") || "register";

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const phone = localStorage.getItem("registerPhone") || "";

      if (!phone) {
        toast.error("خطا: شماره تلفن یافت نشد. لطفاً مجدداً ثبت‌نام کنید.");
        setTimeout(() => {
          router.push("/auth/register");
        }, 2000);
        return;
      }

      // استفاده از endpoint مناسب بر اساس flow
      const passwordFunction = flow === "recovery" ? resetPassword : completeRegistration;
      const response = await passwordFunction({
        phoneNumber: phone,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      if (response.success && response.data) {
        // ذخیره توکن‌ها
        tokenStorage.setTokens(response.data.accessToken, response.data.refreshToken);

        localStorage.removeItem("registerPhone");
        localStorage.removeItem("otpExpiresAt");
        localStorage.removeItem("otpVerified");

        const successMessage = flow === "recovery" 
          ? "رمز عبور با موفقیت تغییر یافت" 
          : "ثبت‌نام با موفقیت انجام شد";
        toast.success(successMessage);
        onSuccess?.();
      }
    } catch (error) {
      console.error("Create password error:", error);
      const errorMessage = error?.message || error?.data?.message || "خطا در ایجاد رمز عبور. لطفاً دوباره تلاش کنید.";

      // اگر OTP تایید نشده یا منقضی شده، به صفحه مناسب برگرد
      if (
        errorMessage.includes("تایید نشده") ||
        errorMessage.includes("منقضی شده") ||
        errorMessage.includes("یافت نشد")
      ) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("registerPhone");
          localStorage.removeItem("otpExpiresAt");
          localStorage.removeItem("otpVerified");
          const redirectUrl = flow === "recovery" ? "/auth/password-recovery" : "/auth/register";
          const errorMsg = flow === "recovery" ? "لطفاً مجدداً از مرحله اول بازیابی رمز عبور شروع کنید." : "لطفاً مجدداً از مرحله اول ثبت‌نام کنید.";
          toast.error(errorMsg);
          setTimeout(() => {
            window.location.href = redirectUrl;
          }, 2000);
          return;
        }
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {FIELDS.map((field) => {
          const isPassword = field.type === "password";
          const showPasswordState =
            field.name === "password" ? showPassword : field.name === "confirmPassword" ? showConfirmPassword : false;
          const togglePassword =
            field.name === "password"
              ? () => setShowPassword(!showPassword)
              : () => setShowConfirmPassword(!showConfirmPassword);

          return (
            <FormField
              key={field.name}
              field={field}
              control={control}
              showPassword={isPassword ? showPasswordState : undefined}
              onTogglePassword={isPassword ? togglePassword : undefined}
            />
          );
        })}

        <FormButton loading={loading} loadingText="در حال ثبت...">
          {flow === "register" ? "ثبت و تکمیل ثبت‌نام" : "ثبت و ورود به حساب"}
        </FormButton>
      </form>
    </div>
  );
}
