"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import FormField from "./FormField";
import FormButton from "./FormButton";
import { passwordRecovery, tokenStorage } from "@/api/auth";

const recoverySchema = z.object({
  phone: z.string().regex(/^09\d{9}$/, "شماره تماس باید به فرمت 09xxxxxxxxx باشد"),
});

const FIELDS = [
  { name: "phone", label: "شماره تماس", type: "tel", placeholder: "مثلا ۰۹۱۳۱۲۳۴۵۶۷", dir: "ltr", required: true },
];

export default function PasswordRecoveryView({ onSuccess }) {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(recoverySchema),
    defaultValues: { phone: "" },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await passwordRecovery({
        phoneNumber: data.phone,
      });

      if (response.success) {
        // ذخیره شماره تلفن در localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("registerPhone", data.phone);
          // ذخیره زمان انقضای OTP
          if (response.data?.expiresInSeconds) {
            const expiresAt = Date.now() + response.data.expiresInSeconds * 1000;
            localStorage.setItem("otpExpiresAt", expiresAt.toString());
          }
        }
        toast.success("کد تایید با موفقیت ارسال شد");
        onSuccess?.(data.phone);
      }
    } catch (error) {
      console.error("Password recovery error:", error);
      toast.error(error?.message || error?.data?.message || "خطا در بازیابی رمز عبور. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {FIELDS.map((field) => (
          <FormField key={field.name} field={field} control={control} />
        ))}

        <FormButton loading={loading} loadingText="در حال ارسال...">
          ارسال کد بازنشانی
        </FormButton>
      </form>
    </div>
  );
}
