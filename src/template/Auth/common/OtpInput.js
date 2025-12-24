"use client";

import React from "react";
import OtpInput from "react-otp-input";
import { cn } from "@/lib/utils";

export default function OtpInputComponent({ length = 4, value = "", onChange, className = "" }) {
  return (
    <div className={cn("flex justify-center", className)} dir="ltr">
      <OtpInput
        value={value}
        onChange={onChange}
        numInputs={length}
        renderSeparator={<span className=" w-2" />}
        renderInput={(props) => (
          <input
            {...props}
            className="!w-16 h-16 text-center text-xl font-semibold bg-dark-field/10 rounded-xl border border-white/15 text-white placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none transition-colors"
          />
        )}
        inputType="tel"
        shouldAutoFocus
      />
    </div>
  );
}
