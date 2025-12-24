"use client";

import { useRouter } from "next/navigation";
import AuthLayout from "@/layout/AuthLayout";
import LoginView from "@/template/Auth/login/LoginView";

export default function LoginPage() {
  const router = useRouter();

  const handleGoSignup = () => {
    router.push("/auth/register");
  };

  const handleGoReset = () => {
    router.push("/auth/password-recovery");
  };

  const handleSuccess = () => {
    router.push("/dashboard");
  };

  return (
    <AuthLayout title={"ورود به سامانه تکواندو"} desc={"لطفاً با اطلاعات حساب خود وارد شوید"} variant="login">
      <LoginView onGoSignup={handleGoSignup} onGoReset={handleGoReset} onSuccess={handleSuccess} />
    </AuthLayout>
  );
}
