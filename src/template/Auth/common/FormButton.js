"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function FormButton({ loading, loadingText, disabled, children, className, ...props }) {
  return (
    <Button
      type="submit"
      disabled={disabled || loading}
      className={cn(
        "w-full mt-10 liner-btn text-white h-12 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {loading ? loadingText : children}
    </Button>
  );
}
