"use client";

import { useRouter, useSearchParams } from "next/navigation";
import AuthLayout from "@/layout/AuthLayout";
import CreatePasswordView from "@/template/Auth/common/CreatePasswordView";

export default function CreatePasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const flow = searchParams.get("flow") || "register"; // register یا recovery

  const handleSuccess = () => {
    router.push("/dashboard");
  };

  // تعیین variant بر اساس flow
  const variant = flow === "register" ? "register" : "login";
  const txt = flow === "login" ? "جدید" : "";
  return (
    <AuthLayout
      title={"ساخت رمز عبور" + txt}
      desc="رمز عبور جدید را وارد کنید تا بتوانید وارد سامانه شوید"
      variant={variant}
    >
      <CreatePasswordView onSuccess={handleSuccess} />
    </AuthLayout>
  );
}
