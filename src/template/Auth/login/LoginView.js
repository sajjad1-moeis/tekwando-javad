"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import FormField from "../common/FormField";
import FormButton from "../common/FormButton";
import FormLink from "../common/FormLink";
import { login as loginApi, tokenStorage } from "@/api/auth";

const loginSchema = z.object({
  phone: z.string().regex(/^09\d{9}$/, "شماره تماس باید به فرمت 09xxxxxxxxx باشد"),
  password: z.string().min(1, "رمز عبور را وارد کنید"),
});

const FIELDS = [
  { name: "phone", label: "شماره تماس", type: "tel", placeholder: "مثلا ۰۹۱۳۱۲۳۴۵۶۷", required: true },
  {
    name: "password",
    label: "رمز عبور",
    type: "password",
    placeholder: "رمز عبور خود را وارد کنید....",
    required: true,
    mt: true,
  },
];

export default function LoginView({ onGoSignup, onGoReset, onSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { phone: "", password: "" },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await loginApi({
        phoneNumber: data.phone,
        password: data.password,
      });

      if (response.success && response.data) {
        // ذخیره توکن‌ها
        tokenStorage.setTokens(response.data.accessToken, response.data.refreshToken);
        toast.success("ورود با موفقیت انجام شد");
        onSuccess?.();
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error?.message || error?.data?.message || "خطا در ورود. لطفاً دوباره تلاش کنید.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {FIELDS.map((field) => (
          <FormField
            key={field.name}
            field={field}
            control={control}
            showPassword={field.type === "password" ? showPassword : undefined}
            onTogglePassword={field.type === "password" ? () => setShowPassword(!showPassword) : undefined}
          />
        ))}

        <div className="text-right mt-3 text-sm">
          <span className="text-gray-400 me-2">رمز عبور خود را فراموش کرده اید؟</span>
          <button type="button" onClick={onGoReset} className="text-green-500 hover:text-green-400 transition-colors">
            بازیابی رمز عبور
          </button>
        </div>

        <FormButton loading={loading} loadingText="در حال ورود...">
          ورود به حساب کاربری
        </FormButton>
      </form>

      <FormLink text="حساب کاربری ندارید؟" linkText="ثبت نام" onClick={onGoSignup} />
    </div>
  );
}
