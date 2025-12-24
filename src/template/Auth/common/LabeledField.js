import React from "react";
import { cn } from "@/lib/utils";

export default function LabeledField({ label, children, className }) {
  return (
    <div className={cn("", className)} dir="rtl">
      {label && <p className=" text-white text-right mb-10">{label}</p>}
      {children}
    </div>
  );
}
