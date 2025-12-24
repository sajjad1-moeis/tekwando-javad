"use client";

import React from "react";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { fieldClassName } from "./fieldStyles";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export default function FormField({ field, control, showPassword, onTogglePassword }) {
  const { name, label, type, placeholder, required, mt, maxLength } = field;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: controllerField, fieldState: { error } }) => (
        <div className={cn("space-y-3", mt && "mt-4")} dir={"rtl"}>
          {label && type !== "checkbox" && <label className="block text-white text-sm font-medium">{label}</label>}

          {type === "checkbox" ? (
            <div className="flex items-center gap-2 mt-4">
              <Checkbox id={name} checked={controllerField.value} onCheckedChange={controllerField.onChange} />
              <label
                htmlFor={name}
                className="text-sm text-white cursor-pointer"
                onClick={() => controllerField.onChange(!controllerField.value)}
              >
                {label}
              </label>
            </div>
          ) : type === "password" ? (
            <div className="relative">
              <Input
                {...controllerField}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                maxLength={maxLength}
                className={cn(fieldClassName, error && "border-red-500", "pe-10")}
              />
              <button
                type="button"
                onClick={onTogglePassword}
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors",
                  "left-3"
                )}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          ) : (
            <Input
              {...controllerField}
              type={type}
              placeholder={placeholder}
              maxLength={maxLength}
              className={cn(fieldClassName, error && "border-red-500")}
            />
          )}

          {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
        </div>
      )}
    />
  );
}
