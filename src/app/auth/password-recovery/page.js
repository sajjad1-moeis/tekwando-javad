"use client";

import { useRouter } from "next/navigation";
import AuthLayout from "@/layout/AuthLayout";
import PasswordRecoveryView from "@/template/Auth/common/PasswordRecoveryView";

export default function PasswordRecoveryPage() {
  const router = useRouter();

  const handleSuccess = (phone) => {
    if (phone && typeof window !== "undefined") {
      localStorage.setItem("registerPhone", phone);
    }
    const maskedPhone = phone ? phone.slice(0, 4) + "****" + phone.slice(-4) : "0913****2023";
    router.push("/auth/verify?phone=" + encodeURIComponent(maskedPhone) + "&flow=recovery");
  };

  return (
    <AuthLayout
      title="بازیابی رمز عبور"
      desc="لطفاً شماره موبایل را وارد کنید تا کد تایید برای شما ارسال شود."
      variant="login"
    >
      <PasswordRecoveryView onSuccess={handleSuccess} />
    </AuthLayout>
  );
}

