"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import FormField from "../common/FormField";
import FormButton from "../common/FormButton";
import FormLink from "../common/FormLink";
import { registerStep1, tokenStorage } from "@/api/auth";

const registerSchema = z.object({
  firstName: z.string().min(1, "نام را وارد کنید"),
  lastName: z.string().min(1, "نام خانوادگی را وارد کنید"),
  phone: z.string().regex(/^09\d{9}$/, "شماره همراه باید به فرمت 09xxxxxxxxx باشد"),
  nationalId: z.string().length(10, "کد ملی باید ۱۰ رقم باشد"),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "لطفاً با قوانین و حریم خصوصی موافقت کنید",
  }),
});

const FIELDS = [
  {
    name: "firstName",
    label: "نام",
    type: "text",
    placeholder: "نام خود را وارد کنید",
    required: true,
  },
  {
    name: "lastName",
    label: "نام خانوادگی",
    type: "text",
    placeholder: "نام خانوادگی خود را وارد کنید",
    required: true,
    mt: true,
  },
  {
    name: "phone",
    label: "شماره همراه",
    type: "tel",
    placeholder: "مثلا ۰۹۱۳۱۲۳۴۵۶۷",
    dir: "ltr",
    required: true,
    mt: true,
  },
  {
    name: "nationalId",
    label: "کد ملی",
    type: "text",
    placeholder: "کد ملی باید ۱۰ رقم باشد",
    dir: "ltr",
    maxLength: 10,
    required: true,
    mt: true,
  },
  {
    name: "agreeToTerms",
    label: (
      <span>
        با <span className="text-green-500">قوانین</span> و <span className="text-green-500">حریم خصوصی</span> سایت
        موافقم.
      </span>
    ),
    type: "checkbox",
    required: true,
  },
];

export default function RegisterView({ onGoLogin, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, watch } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      nationalId: "",
      agreeToTerms: false,
    },
  });

  const agreeToTerms = watch("agreeToTerms");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await registerStep1({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phone,
        nationalCode: data.nationalId,
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
      console.error("Register error:", error);
      const errorMessage =
        error?.message || error?.data?.message || "خطا در ثبت نام. لطفاً دوباره تلاش کنید.";
      toast.error(errorMessage);
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

        <FormButton loading={loading} loadingText="در حال ارسال..." disabled={!agreeToTerms}>
          ارسال کد تایید
        </FormButton>
      </form>

      <FormLink text="حساب کاربری دارید؟" linkText="ورود به حساب کاربری" onClick={onGoLogin} />
    </div>
  );
}
