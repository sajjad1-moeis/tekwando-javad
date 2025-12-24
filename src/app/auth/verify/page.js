"use client";

import { useRouter, useSearchParams } from "next/navigation";
import AuthLayout from "@/layout/AuthLayout";
import MobileVerificationView from "@/template/Auth/common/MobileVerificationView";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "0913****2023";
  const flow = searchParams.get("flow") || "register";

  const handleConfirm = (otp) => {
    console.log("OTP Confirmed:", otp);
    if (flow === "login") {
      router.push("/dashboard");
    } else {
      router.push(`/auth/create-password?flow=${flow}&phone=${encodeURIComponent(phone)}`);
    }
  };

  const handleResend = () => {
    console.log("Resending OTP...");
  };

  const variant = flow === "register" ? "register" : "login";

  return (
    <AuthLayout
      title="تایید شماره موبایل"
      desc={
        <span>
          یک کد <span className="text-gray-400 font-bold">۴ رقمی</span> به شماره موبایل{" "}
          <span className="text-gray-400 font-bold" dir="ltr">
            {phone}
          </span>{" "}
          ارسال شد. لطفاً آن را وارد کنید
        </span>
      }
      variant={variant}
    >
      <MobileVerificationView phoneNumber={phone} onConfirm={handleConfirm} onResend={handleResend} />
    </AuthLayout>
  );
}
