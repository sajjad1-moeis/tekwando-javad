"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Home2,
  DocumentText,
  Calendar,
  User,
  People,
  Medal,
  Book1,
  Wallet3,
  Chart2,
  Setting2,
  Grid3,
  MessageQuestion,
  ArrowDown2,
} from "iconsax-reactjs";
import { cn } from "@/lib/utils";

const menuItems = [
  { id: "dashboard", label: "داشبورد", icon: Home2, hasSubmenu: false },
  { id: "announcements", label: "اطلاعیه ها و اخبار", icon: DocumentText, hasSubmenu: true },
  { id: "calendar", label: "تقویم رویدادها", icon: Calendar, hasSubmenu: true },
  { id: "membership", label: "عضویت", icon: User, hasSubmenu: true },
  { id: "instructors", label: "اساتید و باشگاه ها", icon: People, hasSubmenu: true },
  { id: "competitions", label: "مسابقات", icon: Medal, hasSubmenu: true },
  { id: "education", label: "آموزش", icon: Book1, hasSubmenu: true },
  { id: "financial", label: "مالی", icon: Wallet3, hasSubmenu: true },
  { id: "reports", label: "گزارش ها", icon: Chart2, hasSubmenu: true },
  { id: "system", label: "مدیریت سیستم", icon: Setting2, hasSubmenu: true },
  { id: "tools", label: "ابزارها", icon: Grid3, hasSubmenu: true },
  { id: "support", label: "تیکت پشتیبانی", icon: MessageQuestion, hasSubmenu: false },
  { id: "faq", label: "سوالات متدوال", icon: MessageQuestion, hasSubmenu: false },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (id) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <aside className="w-64 bg-sidebar rounded-2xl">
      {/* Header with Logo and Title */}
      <div className="p-3">
        <div className="pb-4 border-b-2 border-[#333333]">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
            {/* Title */}
            <div className="flex flex-col">
              <h1 className="text-lg font-bold">
                <span className="text-green-500">بانک </span>
                <span className="text-white">اطلاعات</span>
                <span className="text-[#B93335]"> تکواندو</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === "dashboard" && pathname === "/dashboard";
          const isOpen = openMenus[item.id];

          return (
            <div key={item.id}>
              <button
                onClick={() => item.hasSubmenu && toggleMenu(item.id)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors text-right",
                  isActive ? "bg-green-400 text-bg font-semibold" : "text-body hover:bg-[#2A2A2A]"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    variant={isActive ? "Bold" : "Outline"}
                    size={20}
                    className={`flex-shrink-0  ${isActive ? "text-bg" : "text-body"}`}
                  />
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.hasSubmenu && (
                  <ArrowDown2
                    size={16}
                    variant="Outline"
                    color="#FFFFFF"
                    className={cn("flex-shrink-0 transition-transform", isOpen && "transform rotate-180")}
                  />
                )}
              </button>
              {item.hasSubmenu && isOpen && (
                <div className="mt-1 mr-8 space-y-1">{/* Submenu items would go here */}</div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
