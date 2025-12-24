"use client";

import { useRouter } from "next/navigation";
import AuthLayout from "@/layout/AuthLayout";
import RegisterView from "@/template/Auth/register/RegisterView";

export default function RegisterPage() {
  const router = useRouter();

  const handleGoLogin = () => {
    router.push("/auth/login");
  };

  const handleSuccess = (phone) => {
    if (phone && typeof window !== "undefined") {
      localStorage.setItem("registerPhone", phone);
    }
    const maskedPhone = phone ? phone.slice(0, 4) + "****" + phone.slice(-4) : "0913****2023";
    router.push("/auth/verify?phone=" + encodeURIComponent(maskedPhone) + "&flow=register");
  };

  return (
    <AuthLayout
      title="ثبت نام در سامانه تکواندو"
      desc="لطفاً اطلاعات اولیه خود را وارد کنید تا کد تایید برای شما ارسال شود."
      variant="register"
    >
      <RegisterView onGoLogin={handleGoLogin} onSuccess={handleSuccess} />
    </AuthLayout>
  );
}

