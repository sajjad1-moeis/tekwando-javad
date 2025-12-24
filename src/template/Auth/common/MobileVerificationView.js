"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import OtpInputComponent from "./OtpInput";
import { Button } from "@/components/ui/button";
import { verifyOtp, verifyPasswordRecoveryOtp } from "@/api/auth";
import { useSearchParams } from "next/navigation";

export default function MobileVerificationView({ phoneNumber, onConfirm, onResend }) {
  const searchParams = useSearchParams();
  const flow = searchParams.get("flow") || "register";
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 4) {
      toast.error("لطفاً کد ۴ رقمی را کامل وارد کنید");
      return;
    }
    setLoading(true);
    try {
      const phone = typeof window !== "undefined" ? localStorage.getItem("registerPhone") : null;
      const phoneNumberToUse = phone || phoneNumber?.replace(/\*/g, "");

      // استفاده از endpoint مناسب بر اساس flow
      const verifyFunction = flow === "recovery" ? verifyPasswordRecoveryOtp : verifyOtp;
      const response = await verifyFunction({
        phoneNumber: phoneNumberToUse,
        otpCode: otp,
      });

      if (response.success && response.data?.isVerified) {
        // ذخیره وضعیت تایید OTP
        if (typeof window !== "undefined") {
          localStorage.setItem("otpVerified", "true");
        }
        toast.success("کد تایید با موفقیت تایید شد");
        onConfirm?.(otp);
      }
    } catch (error) {
      console.error("Verify OTP error:", error);
      const errorMessage = error?.message || error?.data?.message || "کد تایید نامعتبر است. لطفاً دوباره تلاش کنید.";

      // استخراج تعداد تلاش‌های باقی‌مانده از پیام خطا
      const attemptsMatch = errorMessage.match(/(\d+)\s*تلاش/);
      if (attemptsMatch) {
        setRemainingAttempts(parseInt(attemptsMatch[1]));
      }

      // اگر 3 بار اشتباه زده، به صفحه مناسب برگرد
      if (errorMessage.includes("تعداد تلاش‌های مجاز به پایان رسید")) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("registerPhone");
          localStorage.removeItem("otpExpiresAt");
          localStorage.removeItem("otpVerified");
          const redirectUrl = flow === "recovery" ? "/auth/password-recovery" : "/auth/register";
          toast.error("تعداد تلاش‌های مجاز به پایان رسید. لطفاً مجدداً تلاش کنید.");
          setTimeout(() => {
            window.location.href = redirectUrl;
          }, 2000);
          return;
        }
      }

      // اگر OTP منقضی شده، به صفحه مناسب برگرد
      if (errorMessage.includes("منقضی شده")) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("registerPhone");
          localStorage.removeItem("otpExpiresAt");
          localStorage.removeItem("otpVerified");
          const redirectUrl = flow === "recovery" ? "/auth/password-recovery" : "/auth/register";
          toast.error("کد تایید منقضی شده است. لطفاً مجدداً تلاش کنید.");
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

  const handleResend = () => {
    // برای ارسال مجدد، باید به صفحه مناسب برگردیم
    if (typeof window !== "undefined") {
      localStorage.removeItem("registerPhone");
      localStorage.removeItem("otpExpiresAt");
      localStorage.removeItem("otpVerified");
      const redirectUrl = flow === "recovery" ? "/auth/password-recovery" : "/auth/register";
      window.location.href = redirectUrl;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* OTP Input */}
        <div className="py-4">
          <OtpInputComponent length={4} value={otp} onChange={setOtp} />
        </div>

        <Button
          type="submit"
          disabled={otp.length !== 4 || loading}
          className="w-full mt-10 liner-btn text-white h-12 rounded-lg disabled:opacity-50"
        >
          {loading ? "در حال تایید..." : "تایید"}
        </Button>
      </form>

      {remainingAttempts !== null && remainingAttempts > 0 && (
        <div className="text-center mt-4 text-sm text-yellow-400">
          {remainingAttempts} تلاش دیگر باقی مانده است
        </div>
      )}

      <div className="text-right mt-4 text-sm">
        <span className="text-gray-400 me-2">کد را دریافت نکرده اید؟</span>
        <button
          type="button"
          onClick={handleResend}
          className="text-green-500 hover:text-green-400 transition-colors"
        >
          ارسال مجدد کد
        </button>
      </div>
    </div>
  );
}
